# Fake Job Message Checker

Paste a job offer from WhatsApp, Telegram or email and get a 0-100 risk score with the exact reasons.

- `index.html` – live demo. Runs fully in the browser, nothing is uploaded.
- `rules.js` – weighted red-flag rules (fees, Aadhaar/OTP requests, WhatsApp-only HR, free-email HR, daily-cash pay, no interview, urgency, link shorteners).
- `test.js` – checks the rules on sample messages (`node test.js`).
- `train.py` – trains a TF-IDF + Logistic Regression model on the public Fake Job Postings dataset and prints precision/recall.

## How it works
Each rule adds points when its pattern appears; the total is capped at 100. 55+ is high risk, 25-54 medium, below 25 low. Every point is shown with a plain-language reason, so the score is explainable.

## Limits
Rule-based and not a verdict. The training script uses English job postings, so it is a learning project and not a fraud filter for Hinglish chats. Never pay a fee or share OTP/Aadhaar/bank details to get a job. Report fraud at cybercrime.gov.in or 1930.
