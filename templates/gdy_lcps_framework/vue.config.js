/*
 * @Author: Whzcorcd
 * @Date: 2019-11-21 16:13:50
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-05-19 10:45:23
 * @Description: file content
 */

// vue.config.js
const RUN_SERVER = process.env.run_server || 'development'
const DefaultENVConfig = require('./env_config/default.json')
const serverEnvConfig = Object.assign({}, DefaultENVConfig, require('./env_config/' + RUN_SERVER + '.json'))

const WebpackAliOSSPlugin = require('webpack-oss')
const time = WebpackAliOSSPlugin.getFormat('YYMMDD')
const WebpackRedirectPlugin = require('resource-redirect')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/project/' : '/project/',
  productionSourceMap: false,
  configureWebpack: {
    plugins:
      process.env.NODE_ENV === 'production' && process.env.files_path === 'oss'
        ? [
            new WebpackRedirectPlugin({
              cdn: true,
              url: `//static-${process.env.run_server}.guangdianyun.tv/project/${time}`,
              prefix: 'project',
              env: process.env.run_server
            }),
            // accessKey 联系相应负责人获取
            new WebpackAliOSSPlugin({
              accessKeyId: 'xxx',
              accessKeySecret: 'xxx',
              region: 'oss-cn-hangzhou',
              bucket: `guangdianyun-static-${process.env.run_server}`,
              prefix: 'project',
              limit: 5, // 备份最近 5 个版本的 oss 文件
              format: time,
              exclude: [/.*\.html$/], // 或者 /.*\.html$/,排除.html文件的上传
              deleteAll: false, // 优先匹配 format 配置项
              local: true // 上传打包输出目录里的文件
            })
          ]
        : []
  },
  chainWebpack: config => {
    config.optimization.minimizer('terser').tap(args => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 30000,
      maxAsyncRequests: Infinity,
      maxInitialRequests: 3,
      automaticNameDelimiter: '-',
      cacheGroups: {
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: 'chunk-libs',
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        elementUI: {
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          name: 'chunk-elementUI', // 单独将 elementUI 拆包
          priority: 20 // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
        },
        commons: {
          name: 'chunk-commons',
          minChunks: 2, // 最小共用次数
          priority: 10
        }
      }
    })
    config.plugin('define').tap(args => {
      for (const i in serverEnvConfig) {
        if (serverEnvConfig.hasOwnProperty(i)) {
          args[0]['process.env'][i] = `"${serverEnvConfig[i]}"`
        }
      }
      return args
    })
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `@import "~@/assets/styles/_variables.scss";`
      }
    }
  }
}
