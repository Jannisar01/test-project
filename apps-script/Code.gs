/**
 * Café Global — contact form → Google Sheet
 * --------------------------------------------------------------------------
 * Receives POST submissions from the website's "Request a Free Consultation"
 * form, appends each one as a row in the bound Google Sheet, emails Holly a
 * notification, and sends the nonprofit an auto-acknowledgment.
 *
 * No third-party service required — Holly owns the Sheet and the script.
 *
 * ── ONE-TIME SETUP ────────────────────────────────────────────────────────
 * 1. Create a new Google Sheet (in Holly's Google account).
 *      → Share it with holly@cafeglobal.org if someone else owns it.
 * 2. In the Sheet: Extensions → Apps Script. Delete the sample code and
 *    paste THIS entire file. Save.
 * 3. Check the settings in CONFIG below (the email is already set).
 * 4. Deploy → New deployment → gear icon → "Web app".
 *      - Description: Café Global form
 *      - Execute as:  Me (holly@cafeglobal.org)
 *      - Who has access: Anyone
 *    Click Deploy, authorize when prompted, and copy the "Web app URL"
 *    (it ends in /exec).
 * 5. Paste that URL into index.html as the <form> tag's action="...".
 *
 * ── IMPORTANT: redeploying after edits ────────────────────────────────────
 * If you later change this script, you must publish the change:
 *   Deploy → Manage deployments → (edit, pencil) → Version: "New version" →
 *   Deploy.  The /exec URL stays the same, so you do NOT need to touch the
 *   website again. Saving alone does not update the live web app.
 * --------------------------------------------------------------------------
 */

var CONFIG = {
  notifyEmail: "holly@cafeglobal.org", // where new-lead notifications go
  sheetName: "Consultations",          // tab the rows are written to
  sendAutoReply: true,                  // email the submitter a "thanks" note
  businessName: "Café Global"
};

// Column order: [form field name, human-readable header]
var FIELDS = [
  ["timestamp", "Timestamp"],
  ["contact_name", "Contact name"],
  ["email", "Email"],
  ["organization_name", "Organization"],
  ["organization_type", "Type"],
  ["nonprofit_status", "501(c)(3)"],
  ["website", "Website"],
  ["message", "Message"]
];

function doPost(e) {
  try {
    var p = (e && e.parameter) || {};

    // Honeypot: bots fill this hidden field. Accept silently, store nothing.
    if (p._gotcha) return jsonOutput({ ok: true });

    var now = Utilities.formatDate(
      new Date(),
      Session.getScriptTimeZone(),
      "yyyy-MM-dd HH:mm:ss"
    );

    var sheet = getSheet();
    sheet.appendRow(
      FIELDS.map(function (f) {
        return f[0] === "timestamp" ? now : (p[f[0]] || "");
      })
    );

    notifyOwner(p, now);
    if (CONFIG.sendAutoReply) sendAutoReply(p);

    return jsonOutput({ ok: true });
  } catch (err) {
    return jsonOutput({ ok: false, error: String(err) });
  }
}

// Visiting the /exec URL in a browser returns this — handy to confirm it's live.
function doGet() {
  return jsonOutput({ ok: true, service: CONFIG.businessName + " form endpoint" });
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.sheetName) || ss.insertSheet(CONFIG.sheetName);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(
      FIELDS.map(function (f) {
        return f[1];
      })
    );
    sheet.getRange(1, 1, 1, FIELDS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function notifyOwner(p, now) {
  if (!CONFIG.notifyEmail) return;
  var subject =
    "New consultation request — " +
    (p.organization_name || p.contact_name || CONFIG.businessName);
  var lines = FIELDS.filter(function (f) {
    return f[0] !== "timestamp";
  }).map(function (f) {
    return f[1] + ": " + (p[f[0]] || "—");
  });
  lines.push("", "Received: " + now);
  MailApp.sendEmail({
    to: CONFIG.notifyEmail,
    subject: subject,
    replyTo: p.email || CONFIG.notifyEmail,
    body: lines.join("\n")
  });
}

function sendAutoReply(p) {
  if (!p.email) return;
  var body =
    "Hi " + (p.contact_name || "there") + ",\n\n" +
    "Thank you for requesting a free consultation with " + CONFIG.businessName + ". " +
    "I've received your note and will be in touch within two business days.\n\n" +
    "In the meantime, feel free to reply to this email with anything else you'd " +
    "like me to know.\n\n" +
    "Warmly,\n" +
    "Holly Selwitschka\n" +
    CONFIG.businessName + " — Grant Writing for Nonprofits\n" +
    CONFIG.notifyEmail;
  MailApp.sendEmail({
    to: p.email,
    subject: "Thanks for reaching out to " + CONFIG.businessName,
    replyTo: CONFIG.notifyEmail,
    name: "Holly Selwitschka — " + CONFIG.businessName,
    body: body
  });
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
