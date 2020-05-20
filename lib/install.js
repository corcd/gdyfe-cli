#!/usr/bin/env node

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

const npm = find()
run(which.sync(npm), ['install'], function() {
  console.log('Install complete')
})
