const { analyze } = require("./rules.js");
const cases = [
 ["Congratulations, you are selected! Data entry work from home, earn ₹3000 daily. Pay registration fee Rs 500. Contact HR on WhatsApp only: hr.jobs2026@gmail.com. Join today, limited seats.", "high"],
 ["Hello Shah, thank you for applying for Data Analyst Intern at Acme Pvt Ltd. Your interview is scheduled on Google Meet, 25 Oct 11:00. Apply details at careers.acme.com.", "low"],
 ["Typing work, no experience, earn 500 per day. Send Aadhaar and bank details on Telegram.", "high"],
];
let ok = true;
for (const [t, exp] of cases) { const r = analyze(t); console.log(r.score, r.level, exp, r.hits.map(h=>h.id).join(",")); if (r.level !== exp) ok = false; }
console.log(ok ? "ALL OK" : "MISMATCH");
