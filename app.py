from flask import Flask, render_template, request
import joblib
import pandas as pd

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    job_title = request.form["job_title"]
    experience_years = request.form["experience_years"]
    education_level = request.form["education_level"]
    skills_count = request.form["skills_count"]
    industry = request.form["industry"]
    company_size = request.form["company_size"]
    location = request.form["location"]
    remote_work = request.form["remote_work"]
    certifications = request.form["certifications"]
    print(job_title)
    print(experience_years)
    print(education_level)
    print(skills_count)
    print(industry)
    print(company_size)
    print(location)
    print(remote_work)
    print(certifications)
    return "Data Received Successfully!"

if __name__ == "__main__":
    app.run(debug=True)