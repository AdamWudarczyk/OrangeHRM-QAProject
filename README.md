# Portfolio Project – Cypress + MochaAwesome + POM for OrangeHRM

End-to-end (E2E) automated test suite for [OrangeHRM Demo Application](https://opensource-demo.orangehrmlive.com/)  
Built using **Cypress**, **Page Object Model**, and **MochaAwesome reporting**.  
This project simulates a real-world QA Automation setup, not just static component testing.

##  Tech Stack

- Cypress v14+
- JavaScript (ES6+)
- Mocha + MochaAwesome HTML reports
- Page Object Model (POM) pattern
- Faker (random data generation)
- JSON fixtures for test data
- Git + GitHub

---
##  Project Structure

Portfolio-CypressOrangeHRM/\
│\
├── cypress/\
│ ├── e2e/ → Test cases grouped by modules (login, pim, admin, etc.)\
│ ├── pages/ → Page Object classes\
│ ├── fixtures/ → Static test data (JSON)\
│ ├── support/ → Custom commands, hooks\
│ ├── reports/ → MochaAwesome HTML/JSON reports\
│\
├── screenshots/ → Cypress screenshots on failure\
├── videos/ → Cypress test video recordings\
├── cypress.config.js → Cypress configuration\
├── package.json → Project metadata and scripts\
└── README.md → This file

##  How to Run the Tests

### 1. Install dependencies
```bash
npm install
```
### 2. Run Cypress in interactive mode
```bash
npm run open
```
### 3. Run all tests in headless mode + generate report
```bash
npm run test:full
```
This runs Cypress with mochawesome, merges JSON reports, and generates final HTML.

## Test Report (MochaAwesome)
After running npm run test:full, the final report will be available here:
> cypress/reports/mochawesome/html/report.html

Just open it in your browser.

### Covered Test Areas

Project includes real-world functional UI test coverage:

- Login + error handling
- My Info form: dropdowns, radioboxes
- Employee list (PIM module): checkboxes, search, add, edit, delete employees
- Admin User Management: search, filter by role, edit status, delete users
- (in progress) Leave Management: assign leave requests with various leave types and date ranges
- Recruitment module: upload, filter, reset functionality
- Profile photo upload
- Negative & boundary tests for form validations and UI feedback

### Learning Goals

This project is intended to demonstrate:

- POM-based Cypress architecture
- Advanced UI test interactions
- Smart data usage with fixtures and faker
- Full HTML report generation for stakeholders
- Professional test suite structure
- Generating comprehensive MochaAwesome HTML reports for stakeholders
- Realistic QA workflows covering CRUD operations in HRM system

___
Created by Adam Wudarczyk