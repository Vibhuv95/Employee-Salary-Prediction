from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)
model = joblib.load("models/linear_regression_salary_model.pkl")
preprocessor = joblib.load("models/preprocessor.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    job_title = request.form["job_title"]
    experience_years = int(request.form["experience_years"])
    education_level = request.form["education_level"]
    skills_count = int(request.form["skills_count"])
    industry = request.form["industry"]
    company_size = request.form["company_size"]
    location = request.form["location"]
    remote_work = request.form["remote_work"]
    certifications = int(request.form["certifications"])

    input_data = pd.DataFrame({
        "job_title":[job_title],
        "experience_years":[experience_years],
        "education_level":[education_level],
        "skills_count":[skills_count],
        "industry":[industry],
        "company_size":[company_size],
        "location":[location],
        "remote_work":[remote_work],
        "certifications":[certifications]
        })

    try:
        prepared_data = preprocessor.transform(input_data)
        prediction = model.predict(prepared_data)
        predicted_salary = round(prediction[0], 2)
        return jsonify({
            "salary": f"₹ {predicted_salary:,.2f}"
        })
    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True)