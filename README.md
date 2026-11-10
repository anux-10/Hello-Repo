# Learn-Jenkins

Learn Jenkins during TP DCC class.

## Contents

- `index.html` — simple calculator web app.
- `src/calculator.js` — calculator logic shared by the page and the tests.
- `src/calculator-ui.js` — browser UI wiring for the calculator.
- `test/calculator.test.js` — unit tests using Node's built-in test runner.
- `scripts/test-ci.js` — runs the tests and writes `reports/junit.xml`.
- `Jenkinsfile` — declarative Jenkins pipeline.
- `JENKINS.md` — steps for setting up the Jenkins job.

## Run the tests

```bash
npm install
npm test
```

Or run exactly what Jenkins runs:

```bash
npm run test:ci
```

## Jenkins

The pipeline installs dependencies, runs the tests, and publishes the JUnit
report. See `JENKINS.md` for the job setup steps.
