// Shared rule set: each rule = [id, weight, regex, plain-language reason]
const RULES = [
  ["fee", 35, /(registration|security|refundable|processing|training|kit|joining|verification|id card|laptop)\s*(fee|fees|charge|charges|deposit|amount)|pay\s*(₹|rs\.?|inr)?\s*\d+|deposit\s*(₹|rs\.?)?\s*\d+|paisa\s*(bhejo|jama)|fees?\s*(bhejna|dena|pay)/i, "Asks you to pay money (fee/deposit/kit). Real employers do not charge candidates."],
  ["sensitive", 25, /(aadhaar|aadhar|pan card|bank (account|details)|\botp\b|cvv|atm pin|passport copy|selfie with id|upi pin)/i, "Asks for Aadhaar/PAN/bank details or an OTP before any real hiring step."],
  ["nointerview", 20, /(no interview|without interview|direct (selection|joining|offer)|selected without|instant (joining|offer)|interview nahi)/i, "Promises a job with no interview or screening."],
  ["pay", 20, /(earn|income|salary|kamao|kamaye)[^.\n]{0,40}(₹|rs\.?|inr)?\s*\d{3,6}\s*(-|to|se)?\s*\d{0,6}\s*(per day|daily|a day|\/day|roz|per hour|per task)|(₹|rs\.?)\s*\d{3,6}\s*(per day|daily|\/day)|(lakh|lac)s?\s*(per month|monthly)\s*(from home|easy)/i, "Unrealistic or daily-cash pay for simple work."],
  ["noexp", 10, /(no (experience|skills?|qualification)|any(one)? can (apply|join|earn)|12th pass|just (a )?(phone|mobile)|bina experience)/i, "Says anyone can do it with no skills, which is common in scam offers."],
  ["chat", 15, /(whatsapp|telegram|signal)[^.\n]{0,40}(only|contact|message|msg|join|group|number|interview)|(interview|chat|contact|hr)[^.\n]{0,30}(on|via|through)\s*(whatsapp|telegram)|wa\.me|t\.me/i, "Moves the conversation to WhatsApp/Telegram instead of an official channel."],
  ["freemail", 15, /\b[\w.+-]+@(gmail|yahoo|outlook|hotmail|rediffmail|protonmail)\.(com|in)\b/i, "HR contact uses a free email address, not a company domain."],
  ["urgency", 10, /(urgent(ly)?|limited (seats|slots|vacancies)|join (today|now|immediately)|hurry|last date today|only \d+ (seats|slots)|aaj hi)/i, "Creates pressure to act right now."],
  ["task", 10, /(like (and|&) subscribe|rate (products|hotels|apps)|typing work|form filling|copy[- ]paste|captcha|data entry|watch (videos|ads)|review tasks?|click(ing)? (links|ads))/i, "Describes a simple click/type/like task, a very common job-scam pattern."],
  ["link", 10, /(bit\.ly|tinyurl|cutt\.ly|rb\.gy|shorturl|is\.gd|goo\.gl)/i, "Contains a shortened link that hides where it goes."],
  ["offer", 10, /(congratulations[^.\n]{0,40}(selected|shortlisted)|you (are|have been) (selected|shortlisted)|offer letter (attached|enclosed|is ready))/i, "Says you are already selected before any real process."],
];
const GOOD = [
  ["official", -10, /(careers?\.[a-z0-9-]+\.(com|in|org)|apply (on|at|via) (the )?(official|company) (website|careers? page))/i, "Points to an official careers page."],
];
function analyze(text) {
  const t = (text || "").trim();
  const hits = [];
  let score = 0;
  for (const [id, w, re, why] of [...RULES, ...GOOD]) {
    if (re.test(t)) { hits.push({ id, w, why }); score += w; }
  }
  score = Math.max(0, Math.min(100, score));
  const level = score >= 55 ? "high" : score >= 25 ? "medium" : "low";
  return { score, level, hits };
}
if (typeof module !== "undefined") module.exports = { analyze, RULES };
