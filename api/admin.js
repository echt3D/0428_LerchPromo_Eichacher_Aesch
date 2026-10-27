// Status-Dashboard für die Kundin unter /admin.
//
// Login ohne Passwort: Mail-Adresse eingeben, Login-Link per Mail (15 Minuten
// gültig), danach ein signiertes Session-Cookie (8 Stunden).
//
// GET  /admin                      -> Login oder Dashboard
// GET  /admin?token=…              -> Seite, die den Login-Link per POST einlöst
// POST /admin {action: "request", email}   -> Login-Link senden
// POST /admin {action: "confirm", token}   -> Session starten
// POST /admin {action: "logout"}
// POST /admin {action: "list"}             -> Wohnungen + Status (Session nötig)
// POST /admin {action: "save", changes}    -> Commit von src/data/units.json (Session nötig)
//
// Environment-Variablen (Vercel):
//   ADMIN_SESSION_SECRET  Zufälliger String, mindestens 32 Zeichen
//   GITHUB_TOKEN          Fine-grained Token mit "Contents: Read and write" auf dieses Repo
//   RESEND_API_KEY        API-Key von Resend
//   ADMIN_MAIL_FROM       Absender, z. B. "echt3D <no-reply@echt3d.ch>" (Domain in Resend verifiziert)
// Optional: ADMIN_EMAILS (kommagetrennt), ADMIN_MAIL_REPLY_TO, GITHUB_REPO, GITHUB_BRANCH

const crypto = require("crypto");
const { renderPage } = require("./_admin-page");
const { renderMail } = require("./_admin-mail");

const REPO = process.env.GITHUB_REPO || "echt3D/0428_LerchPromo_Eichacher_Aesch";
const BRANCH = process.env.GITHUB_BRANCH || "main";
const FILE_PATH = "src/data/units.json";
const STATES = ["free", "reserved", "sold"];

const DEFAULT_EMAILS = ["ramona.schiesser@lerchpromotionen.ch", "it@echt3d.ch"];
const COOKIE = "e3_status_admin";
const SESSION_SECONDS = 8 * 60 * 60;
const LOGIN_LINK_SECONDS = 15 * 60;

const httpError = (status, message) => Object.assign(new Error(message), { status });

// --- Login ------------------------------------------------------------------

function allowedEmails() {
  const list = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(",") : DEFAULT_EMAILS;
  return list.map((e) => e.trim().toLowerCase()).filter(Boolean);
}

function isConfigured() {
  return (process.env.ADMIN_SESSION_SECRET || "").length >= 32;
}

function sign(payload) {
  return crypto.createHmac("sha256", process.env.ADMIN_SESSION_SECRET).update(payload).digest("base64url");
}

// Token = base64url(JSON) + "." + HMAC. `kind` trennt Login-Links von Sessions,
// damit sich ein Link nicht direkt als Cookie verwenden lässt.
function createToken(kind, email, seconds) {
  const payload = Buffer.from(JSON.stringify({ k: kind, e: email, x: Date.now() + seconds * 1000 })).toString(
    "base64url"
  );
  return `${payload}.${sign(payload)}`;
}

function readToken(kind, token) {
  if (!isConfigured() || typeof token !== "string") return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return null;
  try {
    const { k, e, x } = JSON.parse(Buffer.from(payload, "base64url").toString());
    if (k !== kind || typeof x !== "number" || x < Date.now()) return null;
    // Wer aus der Liste entfernt wird, ist sofort draussen.
    return allowedEmails().includes(e) ? e : null;
  } catch {
    return null;
  }
}

function parseCookies(req) {
  return Object.fromEntries(
    (req.headers.cookie || "")
      .split(";")
      .map((c) => c.trim().split("="))
      .filter(([k, v]) => k && v)
      .map(([k, ...v]) => [k, decodeURIComponent(v.join("="))])
  );
}

const sessionUser = (req) => readToken("session", parseCookies(req)[COOKIE]);

function setSessionCookie(res, value, maxAge) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE}=${value}; Path=/admin; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`
  );
}

function siteOrigin(req) {
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || (/^localhost(:|$)/.test(host) ? "http" : "https");
  return `${proto}://${host}`;
}

async function sendLoginMail(req, email) {
  const origin = siteOrigin(req);
  const url = `${origin}/admin?token=${createToken("login", email, LOGIN_LINK_SECONDS)}`;

  // Lokal ohne Mailversand: Link im Log, damit man sich einloggen kann.
  if (!process.env.RESEND_API_KEY && !process.env.VERCEL) {
    console.info(`[admin] Login-Link für ${email}: ${url}`);
    return;
  }

  const { html, text } = renderMail({ url, logoUrl: `${origin}/admin-assets/echt3d-logo-white.png` });
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ADMIN_MAIL_FROM,
      to: email,
      reply_to: process.env.ADMIN_MAIL_REPLY_TO || "it@echt3d.ch",
      subject: "Dein Login-Link für Am Eichacher",
      html,
      text,
    }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(`Resend ${res.status}: ${data.message || "Versand fehlgeschlagen"}`);
  }
}

async function requestLink(req, rawEmail) {
  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { status: "invalid" };
  if (!isConfigured() || (process.env.VERCEL && (!process.env.RESEND_API_KEY || !process.env.ADMIN_MAIL_FROM))) {
    console.error("Login requested, but ADMIN_SESSION_SECRET, RESEND_API_KEY or ADMIN_MAIL_FROM is missing");
    return { status: "error" };
  }
  if (!allowedEmails().includes(email)) return { status: "denied" };
  try {
    await sendLoginMail(req, email);
    return { status: "sent" };
  } catch (err) {
    console.error("Sending the login link failed:", err);
    return { status: "error" };
  }
}

// --- GitHub / units.json ----------------------------------------------------

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
  if (!res.ok) throw httpError(res.status, data.message || `GitHub ${res.status}`);
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

async function save(changes, user) {
  if (!changes || typeof changes !== "object" || Array.isArray(changes)) throw httpError(400, "Ungültige Anfrage");
  const { sha, text, units } = await loadFile();
  const byId = new Map(units.map((u) => [u.id, u]));
  const summary = [];
  let next = text;

  for (const [id, state] of Object.entries(changes)) {
    if (!STATES.includes(state)) throw httpError(400, `Ungültiger Status: ${state}`);
    const unit = byId.get(id);
    if (!unit) throw httpError(400, `Wohnung ${id} nicht gefunden`);
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
      message: `${message}\n\nvia Status-Dashboard (${user})`,
      content: Buffer.from(next, "utf8").toString("base64"),
      sha,
      branch: BRANCH,
    }),
  });

  return { committed: true, units: listView(parsed) };
}

// --- Handler ----------------------------------------------------------------

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex");

  if (req.method === "GET") {
    const user = sessionUser(req);
    const hasToken = /[?&]token=/.test(req.url || "");
    const view = hasToken ? "confirm" : user ? "dashboard" : "login";
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(renderPage({ view, email: user }));
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch {
    return res.status(400).json({ error: "Ungültige Anfrage" });
  }

  try {
    switch (body.action) {
      case "request":
        return res.status(200).json(await requestLink(req, body.email));

      // Bewusst ein POST aus der Seite und kein GET: Mail-Scanner (z. B. Outlook
      // Safe Links) rufen Links vorab auf und sollen keine Session erzeugen.
      case "confirm": {
        const email = readToken("login", body.token);
        if (!email) return res.status(401).json({ error: "expired" });
        setSessionCookie(res, createToken("session", email, SESSION_SECONDS), SESSION_SECONDS);
        return res.status(200).json({ ok: true });
      }

      case "logout":
        setSessionCookie(res, "", 0);
        return res.status(200).json({ ok: true });

      case "list":
      case "save": {
        const user = sessionUser(req);
        if (!user) return res.status(401).json({ error: "session" });
        if (!process.env.GITHUB_TOKEN) throw new Error("Server nicht konfiguriert (GITHUB_TOKEN fehlt)");
        if (body.action === "list") {
          const { units } = await loadFile();
          return res.status(200).json({ units: listView(units) });
        }
        return res.status(200).json(await save(body.changes, user));
      }

      default:
        return res.status(400).json({ error: "Unbekannte Aktion" });
    }
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
