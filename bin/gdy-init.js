#!/usr/bin/env node

const vfs = require('vinyl-fs')
const through = require('through2')
const fs = require('fs-extra')
const path = require('path')

const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')

program
  .action(option => {
    inquirer
      .prompt([
        {
          type: 'rawlist',
          message: '请选择项目类型：',
          name: 'type',
          choices: [
            {
              name: 'B 端控制台基础子项目',
              value: 'base'
            },
            {
              name: 'B 端导播台项目',
              value: 'lcps'
            }
          ]
        }
      ])
      .then(answers => {
        const name = option.args[0]
        // 获取将要构建的项目根目录
        const projectPath = path.resolve()
        // 获取将要构建的的项目名称
        const projectName = name || `${answers.type}_project`

        const projectAllPath = `${projectPath}/${name}`

        console.log(`Start to init a project in ${chalk.green(projectPath)}`)

        // 根据将要构建的项目名称创建文件夹
        fs.ensureDirSync(projectName)

        // 获取本地模块下的 gdy_base_framework 目录
        const cwd = path.join(__dirname, `../templates/gdy_${answers.type}_framework`)

        // 从 gdy_base_framework 目录中读取除 node_modules 目录下的所有文件并筛选处理
        vfs
          .src(['**/*', '!node_modules/**/*'], { cwd: cwd, dot: true })
          .pipe(
            through.obj(function(file, enc, callback) {
              if (!file.stat.isFile()) {
                return callback()
              }

              this.push(file)
              return callback()
            })
          )
          // 将从 gdy_base_framework 目录下读取的文件流写入到之前创建的文件夹中
          .pipe(vfs.dest(projectAllPath))
          .on('end', () => {
            console.log('Installing packages...')

            // 将 node 工作目录更改成构建的项目根目录下
            process.chdir(projectAllPath)

            // 修改项目名
            fs.readFile(`${projectAllPath}/package.json`, (err, data) => {
              if (err) {
                console.log(err)
                return err
              }
              let str = data.toString()
              str = str.replace(/project_gdy/g, name)
              fs.writeFile(`${projectAllPath}/package.json`, str, err => {
                if (err) {
                  console.log(err)
                  return err
                }
                // 执行安装命令
                require('../lib/install')
              })
            })

            // 执行安装命令
            // require('../lib/install')
          })
          .resume()
      })
  })
  .parse(process.argv)
