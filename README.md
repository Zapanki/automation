# Calmplete QA Assignment – <Vladimir Kudriavchenko>

## 1. Scope

This repository contains my solution for the Calmplete middle/senior QA assignment:

- Manual UI testing of Email & Password Login (Web UI)
- Manual API testing of Internal Login endpoint
- UI & API & Automation bug reports
- UI automation suite (Playwright)
- SQL Server tasks

## 2. Repository structure

- `tests/` – Playwright UI automation (positive & negative login scenarios)
- `tests/pages/` – Page Object for Login Page
- `tests/testData.ts` – test user data (with env variables)
- `docs/` – test plans, checklists, bug reports, SQL task

## 3. How to run UI automation

Prerequisites:
- Node.js installed
- npm installed
- Tested with: **Windows 11**, **Playwright 1.56**, `webkit` project

Steps:

```bash
npm install
npx playwright install
npx playwright test --project=webkit
