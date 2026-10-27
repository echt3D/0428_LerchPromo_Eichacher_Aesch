// Oberfläche des Status-Dashboards im Stil des echt3D Design Systems
// (Tokens wie im Dashboard von Beethovenstrasse 32).

const LOGO = `<svg class="logo" xmlns="http://www.w3.org/2000/svg" viewBox="23 -722 3086 737" role="img" aria-label="echt3D"><path fill="currentColor" d="M286 -110C246 -110 216 -124 195 -147L514 -249C502 -395 400 -478 275 -478C130 -478 23 -369 23 -231C23 -92 135 15 284 15C364 15 442 -16 497 -58L451 -178C388 -128 332 -110 286 -110ZM277 -354C311 -354 340 -338 357 -312L168 -250C176 -311 218 -354 277 -354ZM820 15C866 15 906 4 945 -12L925 -155C892 -138 861 -130 833 -130C766 -130 724 -176 724 -232C724 -289 767 -334 831 -334C858 -334 886 -326 918 -311L941 -454C904 -469 863 -478 819 -478C673 -478 560 -372 560 -231C560 -91 671 15 820 15ZM1320 -476C1265 -476 1219 -456 1187 -420V-722L1015 -703V0H1187V-261C1187 -303 1214 -331 1253 -331C1291 -331 1317 -305 1317 -264V0H1489V-286C1489 -400 1432 -476 1320 -476ZM1881 -328V-463H1770V-624L1598 -542V-463H1544V-328H1598V-175C1598 -64 1656 7 1781 7C1820 7 1855 0 1881 -10V-150C1865 -144 1845 -140 1827 -140C1788 -140 1770 -161 1770 -199V-328ZM2261 -442 2413 -700H1969L1946 -545H2151L2037 -318C2070 -324 2101 -329 2129 -329C2210 -329 2252 -289 2252 -235C2252 -181 2208 -141 2142 -141C2086 -141 2031 -169 1991 -203L1929 -64C1992 -17 2065 14 2149 14C2308 14 2429 -84 2429 -230C2429 -340 2361 -422 2261 -442ZM2521 0H2745C2953 0 3109 -150 3109 -350C3109 -550 2953 -700 2745 -700H2521ZM2698 -165V-535H2738C2851 -535 2928 -460 2928 -350C2928 -240 2851 -165 2738 -165Z"/></svg>`;

const CHECK = `<svg class="check" viewBox="0 0 16.838 16.838" aria-hidden="true"><path fill="#d14600" d="M12.023 4.555C11.95 4.486 11.836 4.49 11.767 4.563 10.168 6.26 8.573 7.951 6.972 9.651c-.07.073-.181.075-.252.003L5.018 7.953a.18.18 0 0 0-.255 0l-1.03 1.03a.18.18 0 0 0 0 .256l3.042 3.042c.072.071.185.069.252-.004 2.023-2.145 4.051-4.295 6.083-6.45a.18.18 0 0 0-.007-.256c-.362-.341-.72-.677-1.08-1.016M8.419 0C3.77 0 0 3.77 0 8.419s3.77 8.419 8.419 8.419 8.419-3.77 8.419-8.419S13.068 0 8.419 0m0 15.512c-3.916 0-7.093-3.177-7.093-7.093s3.177-7.093 7.093-7.093 7.093 3.177 7.093 7.093-3.177 7.093-7.093 7.093"/></svg>`;

const ARROW = `<svg class="arrow" viewBox="0 0 10 10" aria-hidden="true"><path d="M3 1.5h5.5V7M8.5 1.5l-7 7" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const WEBSITE = "https://ameichacher.ch";

const STYLE = `
:root {
  --navy:#17213a; --navy-60:#747a89; --navy-25:#c5c8ce; --navy-15:#dcdee1; --navy-8:#eceeef;
  --orange:#d14600; --greige:#e7e2e0; --overlay-navy:#262d46;
  --baseline:22.09px; --subhead:10.11px; --card:27.87px; --card-top:23.83px; --page:48px;
  --radius-card:10.08px; --radius-small:6.15px; --shadow-card:0 0 8px rgba(35,31,32,.17);
  --font:'Neue Kabel', Jost, Futura, 'Century Gothic', sans-serif;
}
* { box-sizing:border-box; }
html, body { margin:0; background:#fff; color:var(--navy); font-family:var(--font); -webkit-font-smoothing:antialiased; }
h1, h2, p { margin:0; }
button { font:inherit; color:inherit; }
[hidden] { display:none !important; }

.t-display { font-size:26.67px; line-height:37.12px; font-weight:800; }
.t-title { font-size:26.13px; line-height:32.12px; letter-spacing:.04em; font-weight:800; }
.t-heading { font-size:16px; line-height:22.09px; letter-spacing:.04em; font-weight:800; }
.t-body { font-size:13.33px; line-height:22.09px; letter-spacing:.04em; }
.t-caption { font-size:12px; line-height:18px; letter-spacing:.044em; }
.t-th { font-size:12px; line-height:16px; letter-spacing:.045em; font-weight:700; }
b, .bold { font-weight:700; }

.logo { display:block; height:20px; width:auto; color:#fff; }
.logo-link { display:inline-flex; border-radius:2px; outline:none; }
.logo-link:focus-visible { outline:2px solid #fff; outline-offset:4px; }
.check { display:block; width:22.45px; height:22.45px; }
.arrow { display:inline-block; width:9px; height:9px; margin-left:5px; }

.stack { display:flex; flex-direction:column; gap:var(--baseline); }
.stack > .t-title + * { margin-top:calc(var(--subhead) - var(--baseline)); }

.btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; height:40px; padding:0 20px;
  border:0; border-radius:var(--radius-small); background:var(--navy); color:#fff; font-size:13.33px;
  letter-spacing:.04em; font-weight:700; line-height:1; white-space:nowrap; cursor:pointer; text-decoration:none;
  transition:background-color .15s; outline:none; }
.btn:hover { background:var(--overlay-navy); }
.btn:focus-visible { outline:2px solid var(--navy); outline-offset:2px; }
.btn:disabled { background:var(--navy-15); color:var(--navy-60); cursor:default; }
.btn.lg { height:48px; padding:0 24px; }
.btn.block { width:100%; }
.btn.ghost { background:transparent; color:var(--navy); padding:0 10px; text-decoration:underline; text-decoration-thickness:1px; text-underline-offset:4px; }
.btn.ghost:hover { background:var(--navy-8); }
.btn.ghost:disabled { color:var(--navy-60); background:transparent; }
.btn.on-navy { background:transparent; color:#fff; padding:0 10px; }
.btn.on-navy:hover { background:var(--overlay-navy); }
.btn.on-navy:focus-visible { outline-color:#fff; }

.link { color:inherit; font-weight:700; white-space:nowrap; text-decoration:underline; text-decoration-thickness:1px; text-underline-offset:3px; }
.link:hover { text-decoration-thickness:2px; }

.notice { border-radius:var(--radius-small); background:var(--greige); padding:12px 16px; }

/* Login */
.login { display:flex; flex-wrap:wrap; min-height:100vh; }
.login-brand { flex:1 1 420px; min-height:240px; display:flex; flex-direction:column; justify-content:space-between; gap:48px;
  background:var(--navy); color:#fff; padding:var(--page); }
.login-brand .logo { height:24px; }
.login-brand .project { text-align:right; }
.login-main { flex:1 1 420px; display:flex; flex-direction:column; justify-content:flex-end; padding:var(--page); }
.login-main > div { width:100%; max-width:400px; }
.field { display:flex; flex-direction:column; gap:6px; }
.field input { display:block; height:48px; width:100%; appearance:none; border:0; border-radius:0; background:var(--navy-8);
  padding:0 12px; font:inherit; font-size:16px; color:var(--navy); box-shadow:inset 0 -1px 0 var(--navy); outline:none; }
.field input:focus { box-shadow:inset 0 -2px 0 var(--navy); }
.field input[aria-invalid=true] { box-shadow:inset 0 -2px 0 var(--orange); }
.field-error { font-size:12px; line-height:16px; letter-spacing:.044em; font-weight:700; }
.actions { display:flex; flex-wrap:wrap; align-items:center; gap:8px 16px; margin-left:-10px; }

/* Dashboard */
.wrap { width:100%; max-width:calc(1040px + 2 * var(--page)); margin:0 auto; padding:0 var(--page); }
.topbar { background:var(--navy); color:#fff; }
.topbar .wrap { display:flex; height:64px; align-items:center; justify-content:space-between; gap:24px; }
.topbar nav { display:flex; align-items:center; gap:8px 24px; min-width:0; }
.topbar .who { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.pagehead { display:flex; flex-direction:column; gap:var(--subhead); padding-top:40px; padding-bottom:32px; }
.pagehead p { max-width:600px; }
main.wrap { padding-bottom:64px; }

.card { position:relative; border-radius:var(--radius-card); background:#fff; box-shadow:var(--shadow-card);
  padding:calc(var(--card-top) - 5.5px) var(--card) var(--card-top); display:flex; flex-direction:column; gap:var(--baseline); }
.card-head { display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px 24px; }
.card-head > div:first-child { display:flex; flex-direction:column; gap:2px; min-width:0; }
.card-actions { display:flex; flex-wrap:wrap; align-items:center; justify-content:flex-end; gap:12px; }

.table { margin:0 calc(-1 * var(--card)); }
table { width:100%; border-collapse:collapse; }
th { text-align:left; padding:0 var(--card) 8px; color:var(--navy); }
td { padding:12px var(--card); border-top:1px solid var(--navy-15); vertical-align:middle; }
th:last-child, td:last-child { text-align:right; }
tr.floor td { padding-top:20px; padding-bottom:6px; border-top:0; text-align:left; }
tr.changed td { background:var(--navy-8); }
.unit-name { font-size:13.33px; line-height:20px; letter-spacing:.04em; font-weight:700; }
.changed-tag { color:var(--orange); font-weight:700; margin-left:8px; }

.seg { display:inline-flex; border-radius:var(--radius-small); box-shadow:inset 0 0 0 1px var(--navy-25); }
.seg button { height:36px; min-width:96px; padding:0 14px; border:0; background:transparent; color:var(--navy);
  font-size:13.33px; letter-spacing:.04em; cursor:pointer; border-radius:var(--radius-small); outline:none; transition:background-color .12s; }
.seg button:hover { background:var(--navy-8); }
.seg button:focus-visible { outline:2px solid var(--navy); outline-offset:2px; position:relative; z-index:1; }
.seg button[aria-pressed=true] { font-weight:700; }
.seg button[data-s=free][aria-pressed=true] { background:var(--navy); color:#fff; }
.seg button[data-s=reserved][aria-pressed=true] { background:var(--orange); color:#fff; }
.seg button[data-s=sold][aria-pressed=true] { background:var(--navy-15); color:var(--navy); }

.saved { display:flex; align-items:center; gap:10px; }
.mobile-bar { display:none; }

@media (max-width: 640px) {
  .login { align-content:flex-start; }
  .login-brand { min-height:0; gap:40px; padding:20px 16px 24px; }
  .login-main { justify-content:flex-start; padding:32px 16px 48px; }
  .wrap { padding:0 16px; }
  .topbar .wrap { height:56px; }
  .topbar .who, .topbar .site { display:none; }
  .pagehead { padding-top:24px; padding-bottom:24px; }
  main.wrap { padding-bottom:32px; }
  .card { padding:calc(var(--card-top) - 5.5px) 16px var(--card-top); }
  .card-actions { display:none; }
  .table { margin:0 -16px; }
  thead { display:none; }
  td { display:block; padding:0 16px; border:0; text-align:left !important; }
  tr { display:block; }
  tr.unit { border-top:1px solid var(--navy-15); padding:12px 0; }
  tr.unit td + td { margin-top:8px; }
  tr.floor td { padding:16px 16px 6px; }
  .seg { display:flex; width:100%; }
  .seg button { flex:1; min-width:0; height:44px; padding:0 6px; }
  .mobile-bar { position:sticky; bottom:0; z-index:5; display:flex; align-items:center; justify-content:space-between; gap:8px;
    margin:0 -16px calc(-1 * var(--card-top)); padding:10px 16px; background:#fff; border-radius:0 0 var(--radius-card) var(--radius-card);
    box-shadow:0 -1px 0 var(--navy-15); }
  .mobile-bar .btn { height:44px; }
}
`;

const SCRIPT = `
const LABELS = { free: "frei", reserved: "reserviert", sold: "verkauft" };
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

async function call(payload) {
  const res = await fetch(location.pathname, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || "Fehler"), { status: res.status });
  return data;
}

function show(view) {
  for (const el of document.querySelectorAll("[data-view]")) el.hidden = el.dataset.view !== view;
}

// --- Login ---
const isEmail = (v) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(v.trim());

function initLogin() {
  const form = $("loginForm"), input = $("email"), err = $("emailError"), btn = $("sendBtn");
  const notice = (id) => { $("denied").hidden = id !== "denied"; $("error").hidden = id !== "error"; };

  async function send() {
    const { status } = await call({ action: "request", email: input.value.trim() });
    return status;
  }

  input.addEventListener("input", () => { input.setAttribute("aria-invalid", "false"); err.hidden = true; notice(null); });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    notice(null);
    if (!isEmail(input.value)) {
      input.setAttribute("aria-invalid", "true");
      err.textContent = input.value.trim() ? "Das ist keine gültige E-Mail-Adresse. Prüf die Schreibweise." : "Bitte gib deine E-Mail-Adresse ein.";
      err.hidden = false;
      return;
    }
    btn.disabled = true; btn.textContent = "Wird gesendet …";
    try {
      const status = await send();
      if (status === "sent") { $("sentEmail").textContent = input.value.trim(); $("resendNote").hidden = true; show("sent"); }
      else if (status === "invalid") { input.setAttribute("aria-invalid", "true"); err.textContent = "Das ist keine gültige E-Mail-Adresse. Prüf die Schreibweise."; err.hidden = false; }
      else notice(status === "denied" ? "denied" : "error");
    } catch { notice("error"); }
    btn.disabled = false; btn.textContent = "Login-Link senden";
  });

  $("resendBtn").addEventListener("click", async () => {
    const b = $("resendBtn"), note = $("resendNote");
    b.disabled = true;
    try { note.textContent = (await send()) === "sent" ? "Ein neuer Link ist unterwegs." : "Das hat nicht geklappt. Versuch es später nochmals."; }
    catch { note.textContent = "Das hat nicht geklappt. Versuch es später nochmals."; }
    note.hidden = false; b.disabled = false;
  });
  $("otherBtn").addEventListener("click", () => { show("login"); input.focus(); });
  $("newLinkBtn").addEventListener("click", () => { history.replaceState(null, "", location.pathname); show("login"); input.focus(); });
}

async function confirmLogin() {
  const token = new URLSearchParams(location.search).get("token");
  const btn = $("confirmBtn");
  btn.disabled = true; btn.textContent = "Wird geprüft …";
  try {
    await call({ action: "confirm", token });
    location.replace(location.pathname);
  } catch (e) {
    if (e.status === 401) { history.replaceState(null, "", location.pathname); show("expired"); }
    else { btn.disabled = false; btn.textContent = "Jetzt einloggen"; }
  }
}

// --- Dashboard ---
let original = {}, current = {}, units = [];

function changes() {
  return Object.fromEntries(Object.entries(current).filter(([id, s]) => original[id] !== s));
}

function setUnits(list) {
  units = list;
  original = Object.fromEntries(list.map((u) => [u.id, u.state]));
  current = { ...original };
  render();
}

function render() {
  const sorted = [...units].sort((a, b) => a.floor_num - b.floor_num || a.id.localeCompare(b.id, "de", { numeric: true }));
  const counts = { free: 0, reserved: 0, sold: 0 };
  for (const u of units) counts[original[u.id]] = (counts[original[u.id]] || 0) + 1;
  $("summary").textContent = units.length + " Wohnungen · " + counts.free + " frei · " + counts.reserved + " reserviert · " + counts.sold + " verkauft";

  let html = "", floor = null;
  for (const u of sorted) {
    if (u.floor !== floor) {
      floor = u.floor;
      html += '<tr class="floor"><td colspan="2" class="t-th">' + esc(floor || "–") + "</td></tr>";
    }
    const changed = current[u.id] !== original[u.id];
    const meta = [u.rooms && u.rooms + " Zimmer", u.area && u.area + " m²"].filter(Boolean).join(" · ");
    html += '<tr class="unit' + (changed ? " changed" : "") + '">' +
      '<td><p class="unit-name">' + esc(u.title) + (changed ? '<span class="changed-tag t-caption">geändert</span>' : "") + '</p>' +
      '<p class="t-caption">' + esc(meta) + "</p></td>" +
      '<td><div class="seg" role="group" aria-label="Status ' + esc(u.title) + '">' +
      Object.keys(LABELS).map((s) => '<button type="button" data-id="' + esc(u.id) + '" data-s="' + s + '" aria-pressed="' + (current[u.id] === s) + '">' + LABELS[s] + "</button>").join("") +
      "</div></td></tr>";
  }
  $("rows").innerHTML = html;

  const n = Object.keys(changes()).length;
  const text = n === 0 ? "" : n === 1 ? "1 Änderung" : n + " Änderungen";
  for (const id of ["saveBtn", "saveBtnM"]) $(id).disabled = n === 0;
  for (const id of ["discardBtn", "discardBtnM"]) $(id).hidden = n === 0;
  $("changeCount").textContent = text;
  if (n) $("saved").hidden = true;
  $("changeCountM").textContent = text || ($("saved").hidden ? "Keine Änderungen" : "Gespeichert – in ca. 2 Min. sichtbar");
}

function showError(message) {
  $("dashError").hidden = !message;
  $("dashErrorText").textContent = message || "";
}

async function saveChanges() {
  const btns = [$("saveBtn"), $("saveBtnM")];
  btns.forEach((b) => { b.disabled = true; b.textContent = "Wird gespeichert …"; });
  showError(null);
  try {
    const data = await call({ action: "save", changes: changes() });
    setUnits(data.units);
    $("saved").hidden = false;
  } catch (e) {
    if (e.status === 401) return sessionExpired();
    showError(e.message);
  }
  btns.forEach((b) => { b.textContent = "Speichern"; });
  render();
}

function sessionExpired() {
  location.replace(location.pathname);
}

async function initDashboard() {
  $("rows").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-s]");
    if (!b) return;
    current[b.dataset.id] = b.dataset.s;
    render();
    const again = document.querySelector('button[data-id="' + CSS.escape(b.dataset.id) + '"][data-s="' + b.dataset.s + '"]');
    if (again) again.focus();
  });
  for (const id of ["saveBtn", "saveBtnM"]) $(id).addEventListener("click", saveChanges);
  for (const id of ["discardBtn", "discardBtnM"]) $(id).addEventListener("click", () => { current = { ...original }; render(); });
  $("logoutBtn").addEventListener("click", async () => {
    if (Object.keys(changes()).length && !confirm("Es gibt ungespeicherte Änderungen. Trotzdem abmelden?")) return;
    original = current;
    await call({ action: "logout" }).catch(() => {});
    location.replace(location.pathname);
  });
  window.addEventListener("beforeunload", (e) => { if (Object.keys(changes()).length) e.preventDefault(); });

  try {
    setUnits((await call({ action: "list" })).units);
    $("card").hidden = false;
  } catch (e) {
    if (e.status === 401) return sessionExpired();
    $("loading").hidden = true;
    showError(e.message);
    return;
  }
  $("loading").hidden = true;
}

if (STATE.view === "dashboard") initDashboard();
else { initLogin(); if (STATE.view === "confirm") confirmLogin(); }
`;

const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

function loginBody(view) {
  const hide = (v) => (view === v ? "" : " hidden");
  return `
<div class="login">
  <section class="login-brand" aria-label="Projekt">
    <a class="logo-link" href="https://www.echt3d.ch" target="_blank" rel="noopener" aria-label="echt3D Website (öffnet in neuem Tab)">${LOGO}</a>
    <div class="project">
      <p class="t-display">Am Eichacher</p>
      <p class="t-body">Status-Dashboard Wohnungen</p>
    </div>
  </section>
  <main class="login-main">
    <div>
      <form id="loginForm" class="stack" novalidate data-view="login"${hide("login")}>
        <h1 class="t-title">Einloggen</h1>
        <p class="t-body">Gib deine E-Mail-Adresse ein. Wir schicken dir einen Link, mit dem du dich ohne Passwort einloggst.</p>
        <div class="field">
          <label for="email" class="t-body bold">E-Mail-Adresse</label>
          <input id="email" name="email" type="email" autocomplete="email" aria-invalid="false" aria-describedby="emailError">
          <p id="emailError" class="field-error" hidden></p>
        </div>
        <div id="denied" class="notice" role="alert" hidden><p class="t-body"><b>Diese Adresse hat keinen Zugang.</b> Prüf die Schreibweise oder melde dich bei echt3D.</p></div>
        <div id="error" class="notice" role="alert" hidden><p class="t-body"><b>Der Link konnte nicht verschickt werden.</b> Versuch es in ein paar Minuten nochmals oder melde dich bei echt3D.</p></div>
        <button id="sendBtn" class="btn lg block" type="submit">Login-Link senden</button>
      </form>

      <div class="stack" role="status" data-view="sent" hidden>
        ${CHECK}
        <h1 class="t-title">Wir haben dir einen Link geschickt</h1>
        <p class="t-body">Öffne die E-Mail an <b id="sentEmail"></b> und klicke auf «Jetzt einloggen». Der Link ist 15 Minuten gültig.</p>
        <div class="actions">
          <button id="resendBtn" class="btn ghost" type="button">Link erneut senden</button>
          <button id="otherBtn" class="btn ghost" type="button">Andere E-Mail-Adresse</button>
        </div>
        <p id="resendNote" class="t-caption" hidden></p>
      </div>

      <form class="stack" data-view="confirm"${hide("confirm")} onsubmit="event.preventDefault(); confirmLogin();">
        <h1 class="t-title">Du wirst eingeloggt …</h1>
        <p class="t-body">Einen Moment, wir prüfen deinen Login-Link.</p>
        <button id="confirmBtn" class="btn lg block" type="submit">Jetzt einloggen</button>
      </form>

      <div class="stack" data-view="expired" hidden>
        <h1 class="t-title">Dieser Link funktioniert nicht mehr</h1>
        <p class="t-body">Login-Links sind 15 Minuten gültig. Fordere einfach einen neuen an.</p>
        <button id="newLinkBtn" class="btn lg block" type="button">Neuen Link anfordern</button>
      </div>
    </div>
  </main>
</div>`;
}

function dashboardBody(email) {
  return `
<header>
  <div class="topbar">
    <div class="wrap">
      <a class="logo-link" href="https://www.echt3d.ch" target="_blank" rel="noopener" aria-label="echt3D Website (öffnet in neuem Tab)">${LOGO}</a>
      <nav aria-label="Konto" class="t-body">
        <span class="who t-caption">${escapeHtml(email)}</span>
        <a class="link site" href="${WEBSITE}" target="_blank" rel="noopener">Website${ARROW}</a>
        <button id="logoutBtn" class="btn on-navy" type="button">Abmelden</button>
      </nav>
    </div>
  </div>
  <div class="wrap pagehead">
    <h1 class="t-title">Am Eichacher</h1>
    <p class="t-body">Hier passt du den Status der Wohnungen an. Nach dem Speichern ist die Änderung in ca. 2 Minuten im Wohnungsfinder sichtbar.</p>
  </div>
</header>
<main class="wrap">
  <p id="loading" class="t-body">Wohnungen werden geladen …</p>
  <div id="dashError" class="notice" role="alert" hidden style="margin-bottom:16px"><p class="t-body"><b>Das hat nicht geklappt.</b> <span id="dashErrorText"></span></p></div>
  <section id="card" class="card" aria-labelledby="cardTitle" hidden>
    <div class="card-head">
      <div>
        <h2 id="cardTitle" class="t-heading">Wohnungen</h2>
        <p id="summary" class="t-caption"></p>
      </div>
      <div class="card-actions">
        <div id="saved" class="saved" role="status" hidden>${CHECK}<span class="t-body bold">Gespeichert – in ca. 2 Minuten sichtbar</span></div>
        <span id="changeCount" class="t-body bold" aria-live="polite"></span>
        <button id="discardBtn" class="btn ghost" type="button" hidden>Verwerfen</button>
        <button id="saveBtn" class="btn" type="button" disabled>Speichern</button>
      </div>
    </div>
    <div class="table">
      <table>
        <thead><tr><th class="t-th">Wohnung</th><th class="t-th">Status</th></tr></thead>
        <tbody id="rows"></tbody>
      </table>
    </div>
    <div class="mobile-bar">
      <span id="changeCountM" class="t-body bold">Keine Änderungen</span>
      <div>
        <button id="discardBtnM" class="btn ghost" type="button" hidden>Verwerfen</button>
        <button id="saveBtnM" class="btn" type="button" disabled>Speichern</button>
      </div>
    </div>
  </section>
</main>`;
}

function renderPage({ view, email }) {
  const state = JSON.stringify({ view }).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Status-Dashboard – Am Eichacher</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;700;800&display=swap" rel="stylesheet">
<style>${STYLE}</style>
</head>
<body>
${view === "dashboard" ? dashboardBody(email) : loginBody(view)}
<script>const STATE = ${state};${SCRIPT}</script>
</body>
</html>`;
}

module.exports = { renderPage };
