"""Train a text classifier on the public Fake Job Postings dataset (EMSCAD, Kaggle).

Usage:
  1. Download fake_job_postings.csv from Kaggle ("Real / Fake Job Posting Prediction").
  2. pip install scikit-learn pandas joblib
  3. python train.py fake_job_postings.csv

Prints real precision/recall on a held-out test set and the words the model links to fraud.
Report only the numbers this script prints on your machine.
"""
import sys
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
import joblib

df = pd.read_csv(sys.argv[1])
cols = ["title", "company_profile", "description", "requirements", "benefits"]
df["text"] = df[cols].fillna("").agg(" ".join, axis=1)
X_tr, X_te, y_tr, y_te = train_test_split(
    df["text"], df["fraudulent"], test_size=0.2, stratify=df["fraudulent"], random_state=42
)
vec = TfidfVectorizer(stop_words="english", ngram_range=(1, 2), min_df=3, max_features=50000)
clf = LogisticRegression(max_iter=1000, class_weight="balanced")
clf.fit(vec.fit_transform(X_tr), y_tr)
print(classification_report(y_te, clf.predict(vec.transform(X_te)), digits=3))

names = vec.get_feature_names_out()
top = clf.coef_[0].argsort()[-15:][::-1]
print("Top terms linked to fraud:", [names[i] for i in top])
joblib.dump((vec, clf), "model.joblib")
