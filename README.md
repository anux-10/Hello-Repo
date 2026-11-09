# Learn-Jenkins

Learn Jenkins during TP DCC class.

## Contents

- `index.html` — static "Hello" site.
- `src/calculator.js` — sample application used by the CI pipeline.
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
