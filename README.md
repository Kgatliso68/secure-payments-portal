# Secure Payments Portal

A secure full-stack web application that allows customers to register, log in, and submit international payments, while employees can manage and monitor payment activity.

This project implements secure development practices including authentication, input validation, CI/CD integration, and static code analysis.

## 🚀 Features
### 🔐 Authentication & Security

Secure user registration and login

Password hashing and salting

Role-based access (Customer / Employee)

Regex-based input validation

HTTPS enforcement

Protection against common web vulnerabilities

### 💳 Payment Management

Submit international payments

View payment history (Customer)

Employee dashboard for payment oversight

### 🛡 Code Quality & DevOps

Continuous Integration using CircleCI

Static code analysis using SonarCloud

Automated pipeline triggered on every push

Secure dependency management via npm

## 🏗️ Tech Stack
### Frontend

React

React Router

Axios

### Backend

Node.js

Express.js

REST API architecture

## ⚙️ Installation & Setup
1️⃣ **Clone the Repository**
git clone https://github.com/<Kgatliso68>/secure-payments-portal.git
cd secure-payments-portal

2️⃣ **Install Dependencies**
npm install


cd client
npm install

cd ../server
npm install

3️⃣ **Run the Application**

Backend:

npm start


Frontend:

npm start


Application will typically run on:

http://localhost:3000

## 🔁 Continuous Integration (CI)

This project uses CircleCI.

Every push to the main branch automatically:

Installs dependencies

Runs tests (if available)

Performs static code analysis via SonarCloud

Pipeline configuration is located in:

.circleci/config.yml

## 📊 Code Quality Analysis

SonarCloud is used for:

Security vulnerability detection

Code smells identification

Maintainability metrics

Reliability analysis

Configuration file:

sonar-project.properties

## 🧪 Testing

Currently:

No automated tests implemented yet.

## 🔐 Security Considerations

This application implements:

Password hashing

Input validation using Regex

Secure authentication flows

Static code security scanning

Dependency vulnerability monitoring via npm audit

To check dependency vulnerabilities:

npm audit

## 📈 Future Improvements

Implement automated test coverage reporting

Add API rate limiting

Improve error handling and logging

Implement Docker containerization

Deploy to a cloud platform (e.g., Azure, AWS)

## 👤 Author

Developed by:
Kgatliso68

## 📄 License

This project is for educational and academic purposes
