// Status-Dashboard für die Kundin.
// GET  /admin            -> Dashboard-Seite
// POST /admin {password, action: "list"}            -> Wohnungen + Status
// POST /admin {password, action: "save", changes}   -> Commit von src/data/units.json
//
// Benötigte Environment-Variablen (Vercel):
//   ADMIN_PASSWORD  Passwort für die Kundin
//   GITHUB_TOKEN    Fine-grained Token mit "Contents: Read and write" auf dieses Repo
// Optional: GITHUB_REPO (owner/name), GITHUB_BRANCH

const crypto = require("crypto");

const REPO = process.env.GITHUB_REPO || "echt3D/0428_LerchPromo_Eichacher_Aesch";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const FILE_PATH = "src/data/units.json";
const STATES = ["free", "reserved", "sold"];

function checkPassword(input) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof input !== "string") return false;
  const a = crypto.createHash("sha256").update(input).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

async function github(path, options = {}) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "status-dashboard",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || `GitHub ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

async function loadFile() {
  const data = await github(`contents/${FILE_PATH}?ref=${BRANCH}`);
  const text = Buffer.from(data.content, "base64").toString("utf8");
  return { sha: data.sha, text, units: JSON.parse(text) };
}

// Ersetzt nur den Status-Wert im Objekt der jeweiligen Wohnung, damit die
// Formatierung der Datei erhalten bleibt und der Diff klein ist.
function applyChange(text, id, state) {
  const idRe = new RegExp(`"id"\\s*:\\s*"${id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`);
  const idMatch = idRe.exec(text);
  if (!idMatch) throw new Error(`Wohnung ${id} nicht gefunden`);
  const objEnd = text.indexOf("}", idMatch.index);
  const stateRe = /("state_simplyfied_en"\s*:\s*)"[^"]*"/g;
  stateRe.lastIndex = idMatch.index;
  const m = stateRe.exec(text);
  if (!m || m.index > objEnd) throw new Error(`Status für Wohnung ${id} nicht gefunden`);
  return text.slice(0, m.index) + `${m[1]}"${state}"` + text.slice(m.index + m[0].length);
}

const listView = (units) =>
  units.map((u) => ({
    id: u.id,
    title: u.title,
    floor: u.floor,
    floor_num: u.floor_num,
    rooms: u.rooms,
    area: u.area,
    state: u.state_simplyfied_en,
  }));

async function save(changes) {
  if (!changes || typeof changes !== "object" || Array.isArray(changes)) {
    throw Object.assign(new Error("Ungültige Anfrage"), { status: 400 });
  }
  const { sha, text, units } = await loadFile();
  const byId = new Map(units.map((u) => [u.id, u]));
  const summary = [];
  let next = text;

  for (const [id, state] of Object.entries(changes)) {
    if (!STATES.includes(state)) {
      throw Object.assign(new Error(`Ungültiger Status: ${state}`), { status: 400 });
    }
    const unit = byId.get(id);
    if (!unit) throw Object.assign(new Error(`Wohnung ${id} nicht gefunden`), { status: 400 });
    if (unit.state_simplyfied_en === state) continue;
    next = applyChange(next, id, state);
    summary.push(`${unit.title}: ${unit.state_simplyfied_en} -> ${state}`);
  }

  if (!summary.length) return { committed: false, units: listView(units) };

  // Sicherheitsnetz: Ergebnis muss gültiges JSON sein und genau die gewünschten Status haben.
  const parsed = JSON.parse(next);
  for (const u of parsed) {
    const expected = changes[u.id] ?? byId.get(u.id).state_simplyfied_en;
    if (u.state_simplyfied_en !== expected) throw new Error("Status-Update fehlgeschlagen");
  }

  const message =
    summary.length === 1
      ? `Status: ${summary[0]}`
      : `Status-Update (${summary.length} Wohnungen)\n\n${summary.join("\n")}`;

  await github(`contents/${FILE_PATH}`, {
    method: "PUT",
    body: JSON.stringify({
      message: `${message}\n\nvia Status-Dashboard`,
      content: Buffer.from(next, "utf8").toString("base64"),
      sha,
      branch: BRANCH,
    }),
  });

  return { committed: true, units: listView(parsed) };
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex");

  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(PAGE);
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  if (!checkPassword(body.password)) {
    return res.status(401).json({ error: "Falsches Passwort" });
  }
  if (!process.env.GITHUB_TOKEN) {
    return res.status(500).json({ error: "Server nicht konfiguriert (GITHUB_TOKEN fehlt)" });
  }

  try {
    if (body.action === "list") {
      const { units } = await loadFile();
      return res.status(200).json({ units: listView(units) });
    }
    if (body.action === "save") {
      return res.status(200).json(await save(body.changes));
    }
    return res.status(400).json({ error: "Unbekannte Aktion" });
  } catch (err) {
    if (err.status === 409 || err.status === 422) {
      return res.status(409).json({
        error: "Die Daten wurden zwischenzeitlich geändert. Bitte Seite neu laden und erneut speichern.",
      });
    }
    console.error(err);
    return res.status(err.status === 400 ? 400 : 500).json({ error: err.message || "Fehler" });
  }
};

const PAGE = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Status Wohnungen – Am Eichacher</title>
<style>
  :root { --bg:#f5f5f3; --card:#fff; --text:#1d1d1b; --muted:#6b6b66; --line:#e3e3df;
          --free:#2e8b57; --reserved:#d99a00; --sold:#c0392b; --accent:#1d1d1b; }
  * { box-sizing:border-box; }
  body { margin:0; font:15px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
         background:var(--bg); color:var(--text); }
  main { max-width:760px; margin:0 auto; padding:32px 16px 120px; }
  h1 { font-size:22px; margin:0 0 4px; }
  p.sub { color:var(--muted); margin:0 0 24px; }
  .card { background:var(--card); border:1px solid var(--line); border-radius:10px; }
  form.login { padding:24px; display:flex; gap:8px; flex-wrap:wrap; }
  input[type=password] { flex:1 1 220px; padding:10px 12px; font:inherit; border:1px solid var(--line); border-radius:8px; }
  button { font:inherit; cursor:pointer; border-radius:8px; }
  .primary { background:var(--accent); color:#fff; border:0; padding:10px 18px; }
  .primary:disabled { opacity:.35; cursor:default; }
  h2 { font-size:13px; text-transform:uppercase; letter-spacing:.05em; color:var(--muted); margin:24px 4px 8px; }
  .row { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px 16px; border-top:1px solid var(--line); flex-wrap:wrap; }
  .row:first-child { border-top:0; }
  .row.changed { background:#fffbea; }
  .name { font-weight:600; }
  .meta { color:var(--muted); font-size:13px; }
  .seg { display:inline-flex; border:1px solid var(--line); border-radius:8px; overflow:hidden; }
  .seg button { border:0; border-radius:0; background:#fff; padding:8px 12px; color:var(--muted); border-left:1px solid var(--line); }
  .seg button:first-child { border-left:0; }
  .seg button[aria-pressed=true] { color:#fff; font-weight:600; }
  .seg button[data-s=free][aria-pressed=true] { background:var(--free); }
  .seg button[data-s=reserved][aria-pressed=true] { background:var(--reserved); }
  .seg button[data-s=sold][aria-pressed=true] { background:var(--sold); }
  .bar { position:fixed; left:0; right:0; bottom:0; background:var(--card); border-top:1px solid var(--line); padding:12px 16px; }
  .bar .inner { max-width:760px; margin:0 auto; display:flex; align-items:center; justify-content:space-between; gap:12px; }
  .msg { font-size:14px; color:var(--muted); }
  .msg.err { color:var(--sold); }
  .msg.ok { color:var(--free); }
  [hidden] { display:none !important; }
</style>
</head>
<body>
<main>
  <h1>Status der Wohnungen</h1>
  <p class="sub">Am Eichacher, Aesch – Änderungen erscheinen nach dem Speichern innert ca. 2 Minuten im Wohnungsfinder.</p>

  <form class="card login" id="login">
    <input type="password" id="pw" placeholder="Passwort" autocomplete="current-password" required>
    <button class="primary" type="submit">Anmelden</button>
    <div class="msg err" id="loginMsg" style="flex-basis:100%"></div>
  </form>

  <div id="list" hidden></div>
</main>

<div class="bar" id="bar" hidden>
  <div class="inner">
    <span class="msg" id="msg">Keine Änderungen</span>
    <button class="primary" id="save" disabled>Speichern</button>
  </div>
</div>

<script>
const LABELS = { free: "frei", reserved: "reserviert", sold: "verkauft" };
let password = sessionStorage.getItem("pw") || "";
let original = {};
let current = {};
let units = [];

const $ = (id) => document.getElementById(id);

async function call(payload) {
  const res = await fetch(location.pathname, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, ...payload }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || "Fehler"), { status: res.status });
  return data;
}

function setUnits(list) {
  units = list;
  original = Object.fromEntries(list.map((u) => [u.id, u.state]));
  current = { ...original };
  render();
}

function changes() {
  return Object.fromEntries(Object.entries(current).filter(([id, s]) => original[id] !== s));
}

function render() {
  const groups = new Map();
  [...units].sort((a, b) => a.floor_num - b.floor_num || a.id.localeCompare(b.id, "de", { numeric: true }))
    .forEach((u) => { if (!groups.has(u.floor)) groups.set(u.floor, []); groups.get(u.floor).push(u); });

  const list = $("list");
  list.innerHTML = "";
  for (const [floor, items] of groups) {
    const h = document.createElement("h2");
    h.textContent = floor || "–";
    list.appendChild(h);
    const card = document.createElement("div");
    card.className = "card";
    for (const u of items) {
      const row = document.createElement("div");
      row.className = "row" + (current[u.id] !== original[u.id] ? " changed" : "");
      const info = document.createElement("div");
      info.innerHTML = '<div class="name"></div><div class="meta"></div>';
      info.firstChild.textContent = u.title;
      info.lastChild.textContent = [u.rooms && u.rooms + " Zimmer", u.area && u.area + " m²"].filter(Boolean).join(" · ");
      const seg = document.createElement("div");
      seg.className = "seg";
      for (const s of Object.keys(LABELS)) {
        const b = document.createElement("button");
        b.type = "button";
        b.dataset.s = s;
        b.textContent = LABELS[s];
        b.setAttribute("aria-pressed", current[u.id] === s);
        b.onclick = () => { current[u.id] = s; render(); };
        seg.appendChild(b);
      }
      row.append(info, seg);
      card.appendChild(row);
    }
    list.appendChild(card);
  }

  const n = Object.keys(changes()).length;
  $("save").disabled = n === 0;
  const msg = $("msg");
  if (n) { msg.className = "msg"; msg.textContent = n === 1 ? "1 Änderung nicht gespeichert" : n + " Änderungen nicht gespeichert"; }
  else if (!msg.classList.contains("ok") && !msg.classList.contains("err")) msg.textContent = "Keine Änderungen";
}

async function login() {
  $("loginMsg").textContent = "";
  try {
    const data = await call({ action: "list" });
    sessionStorage.setItem("pw", password);
    $("login").hidden = true;
    $("list").hidden = false;
    $("bar").hidden = false;
    setUnits(data.units);
  } catch (e) {
    sessionStorage.removeItem("pw");
    $("loginMsg").textContent = e.message;
  }
}

$("login").onsubmit = (e) => { e.preventDefault(); password = $("pw").value; login(); };

$("save").onclick = async () => {
  const btn = $("save"), msg = $("msg");
  btn.disabled = true;
  msg.className = "msg";
  msg.textContent = "Wird gespeichert …";
  try {
    const data = await call({ action: "save", changes: changes() });
    msg.className = "msg ok";
    msg.textContent = "Gespeichert – im Wohnungsfinder sichtbar in ca. 2 Minuten.";
    setUnits(data.units);
  } catch (e) {
    msg.className = "msg err";
    msg.textContent = e.message;
    btn.disabled = false;
  }
};

window.addEventListener("beforeunload", (e) => { if (Object.keys(changes()).length) e.preventDefault(); });

if (password) login();
</script>
</body>
</html>`;
