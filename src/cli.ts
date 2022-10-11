#!/usr/bin/env node
/* eslint-disable no-console */
import fs from 'fs';
import minimist from 'minimist';
import assert from 'assert';
import runPgSql from './index';

const argv = minimist(process.argv.slice(2), {
  boolean: ['quiet'],
  alias: {
    q: 'quiet',
  },
});

const { PGHOST, PGUSER, PGPASSWORD } = process.env;

assert(argv.host || PGHOST, 'Must have PGHOST environment variable');
assert(argv.user || PGUSER, 'Must have PGUSER environment variable');
assert(argv.password || PGPASSWORD, 'Must have PGPASSWORD environment variable');

const database = argv._[0];
const sql = fs.readFileSync(argv._[1], 'utf8');

if (!argv.quiet) {
  console.log(sql);
}

runPgSql(sql, {
  host: argv.host || PGHOST,
  user: argv.user || PGUSER,
  password: argv.password || PGPASSWORD,
  database,
})
  .then(() => {
    if (!argv.quiet) {
      console.log('Query completed.');
    }
    process.exitCode = 0;
  })
  .catch((e) => {
    console.error(e);
    process.exitCode = -1;
  });
