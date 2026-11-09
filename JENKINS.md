# Jenkins test project

This repository contains a tiny Node.js project used to test a Jenkins pipeline.

## What is here

| File | Purpose |
| --- | --- |
| `src/calculator.js` | The sample application |
| `test/calculator.test.js` | Tests using Node's built-in test runner |
| `scripts/test-ci.js` | Runs tests and writes `reports/junit.xml` |
| `Jenkinsfile` | Declarative pipeline definition |

No dependencies are required: the tests use Node's built-in `node:test` module.

## Run locally

```bash
npm install
npm test
```

Or run exactly what Jenkins runs:

```bash
npm run test:ci
```

The JUnit report is written to `reports/junit.xml`.

## Set up the Jenkins job

1. Push this repository to GitHub (or another Git server Jenkins can reach).
2. In Jenkins, click **New Item** → **Pipeline** → give it a name.
3. Under **Pipeline**, choose **Pipeline script from SCM**.
4. Select **Git**, enter the repository URL, and set the branch.
5. Set **Script Path** to `Jenkinsfile`.
6. Save and click **Build Now**.

The pipeline will:

1. Install dependencies (`npm install`).
2. Run the tests (`npm run test:ci`).
3. Publish the JUnit results to the build page.

> The pipeline uses `sh` on Linux/macOS agents and `bat` on Windows agents,
> so it works on either.

## Try a failing build

Change an expected value in `test/calculator.test.js` (for example `5` to `6`),
push, and run the job again. The Test stage will fail and the build will be
marked as failed — useful for seeing how Jenkins reports failures.
