/**
 * Runs the tests and writes a JUnit report that Jenkins can publish.
 * Works on both Linux and Windows agents.
 */
const { mkdirSync } = require('node:fs');
const { spawnSync } = require('node:child_process');

mkdirSync('reports', { recursive: true });

const result = spawnSync(
  process.execPath,
  [
    '--test',
    '--test-reporter=spec',
    '--test-reporter-destination=stdout',
    '--test-reporter=junit',
    '--test-reporter-destination=reports/junit.xml',
    'test/**/*.test.js',
  ],
  { stdio: 'inherit' }
);

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
