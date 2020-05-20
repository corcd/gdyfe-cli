#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const which = require('which')
const chalk = require('chalk')

const childProcess = require('child_process')

// 开启子进程来执行 node 命令
function run(cmd, args, fn) {
  args = args || []
  const runner = childProcess.spawn(cmd, args, {
    stdio: 'inherit'
  })

  runner.on('close', function(code) {
    if (fn) {
      fn(code)
    }
  })
}

// 查找系统中用于安装依赖包的命令
function find() {
  const npms = ['yarn', 'npm', 'tnpm', 'cnpm']
  for (var i = 0; i < npms.length; i++) {
    try {
      // 查找环境变量下指定的可执行文件的第一个实例
      which.sync(npms[i])
      console.log('use npm: ' + npms[i])
      return npms[i]
    } catch (e) {}
  }
  throw new Error(chalk.red('Please install Npm/Yarn'))
}

program
  .action(() => {
    inquirer
      .prompt([
        {
          type: 'rawlist',
          message: '请选择部署环境：',
          name: 'env',
          choices: [
            {
              name: 'TEST',
              value: 'test'
            },
            {
              name: 'PRE',
              value: 'pre'
            },
            {
              name: 'PROD',
              value: ''
            }
          ]
        }
      ])
      .then(answers => {
        const npm = find()
        if (npm === 'yarn') {
          run(which.sync(npm), [`build${answers.env ? ':' + answers.env : ''}`], () => {
            console.log('Build complete')
          })
        } else {
          run(which.sync(npm), ['run', `build${answers.env ? ':' + answers.env : ''}`], () => {
            console.log('Build complete')
          })
        }
      })
  })
  .parse(process.argv)
