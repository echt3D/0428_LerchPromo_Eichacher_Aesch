// Login-Mail des Status-Dashboards (Absender echt3D), Vorlage wie bei
// Beethovenstrasse 32. E-Mail-Clients brauchen Inline-Styles und Tabellen.

const navy = "#17213a";
const greige = "#e7e2e0";
const font = "'Neue Kabel', Jost, Futura, 'Century Gothic', Arial, sans-serif";
const text = `margin:0;font-family:${font};color:${navy};font-size:13.33px;line-height:22.09px;letter-spacing:0.04em;`;
const caption = `margin:0;font-family:${font};color:${navy};font-size:12px;line-height:18px;letter-spacing:0.044em;`;

const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function renderMail({ url, logoUrl }) {
  const href = escape(url);
  const html = `<!doctype html>
<html lang="de">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:32px 16px;background-color:${greige};font-family:${font};">
<div style="display:none;max-height:0;overflow:hidden;">Mit einem Klick im Dashboard – der Link ist 15 Minuten gültig.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;border-radius:10px;overflow:hidden;background-color:#ffffff;">
  <tr><td style="background-color:${navy};padding:22px 40px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td><img src="${escape(logoUrl)}" alt="echt3D" width="84" height="20" style="display:block;"></td>
      <td align="right" style="${text}color:#ffffff;font-size:16px;font-weight:800;">Am Eichacher</td>
    </tr></table>
  </td></tr>
  <tr><td style="padding:40px;">
    <h1 style="${text}font-size:26.13px;line-height:32.12px;font-weight:800;margin-bottom:10px;">Dein Login-Link</h1>
    <p style="${text}margin-bottom:22px;">Mit diesem Button loggst du dich im Status-Dashboard von Am Eichacher ein. Der Link ist 15 Minuten gültig.</p>
    <a href="${href}" style="display:inline-block;background-color:${navy};color:#ffffff;border-radius:6px;padding:16px 24px;font-family:${font};font-size:13.33px;font-weight:700;letter-spacing:0.04em;text-decoration:none;">Jetzt einloggen</a>
    <p style="${caption}margin-top:22px;">Funktioniert der Button nicht? Kopiere diesen Link in deinen Browser:</p>
    <p style="${caption}word-break:break-all;"><a href="${href}" style="color:${navy};">${href}</a></p>
    <p style="${caption}margin-top:22px;">Du hast keinen Link angefordert? Dann kannst du diese E-Mail ignorieren.</p>
  </td></tr>
</table>
<p style="${caption}max-width:600px;margin:16px auto 0;">echt3D – Alles rund um die Vermarktung deines Immobilienprojekts</p>
</body>
</html>`;

  const plain = `Dein Login-Link

Mit diesem Link loggst du dich im Status-Dashboard von Am Eichacher ein. Der Link ist 15 Minuten gültig.

${url}

Du hast keinen Link angefordert? Dann kannst du diese E-Mail ignorieren.

echt3D – Alles rund um die Vermarktung deines Immobilienprojekts`;

  return { html, text: plain };
}

module.exports = { renderMail };
