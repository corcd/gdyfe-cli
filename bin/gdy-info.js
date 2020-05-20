#!/usr/bin/env node

const envinfo = require('envinfo')
const chalk = require('chalk')

const program = require('commander')

program
  .action(() => {
    console.log(chalk.bold('\nEnvironment Info:'))
    envinfo
      .run(
        {
          System: ['OS', 'CPU'],
          Binaries: ['Node', 'Yarn', 'npm'],
          Browsers: ['Chrome', 'Edge', 'Firefox', 'Safari'],
          npmGlobalPackages: ['gdyfe-cli']
        },
        {
          showNotFound: true,
          duplicates: true,
          fullTree: true
        }
      )
      .then(console.log)
  })
  .parse(process.argv)
