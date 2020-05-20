#!/usr/bin/env node

const program = require('commander')

const info = require('../package.json')

program
  .version(`@gdyfe/cli ${info.version}`, '-v, --version')
  .usage('<command> <file ...>')
  .command('info', 'Print debugging information about your environment')
  .command('init [name] ', 'Init your gdy frontend project').alias('i')
  .command('serve', 'Run your gdy frontend project').alias('s')
  .command('build', 'Build your gdy frontend project').alias('b')
  .parse(process.argv)