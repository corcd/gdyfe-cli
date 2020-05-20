/**
 * @file common request method
 * @since 1.1.4
 * @author whzcorcd <whzcorcd@gmail.com>
 */
import store from '@/store'
import i18n from '@/i18n'
import axios from 'axios'
import { Message } from 'element-ui'

// 创建 axios 实例
const Request = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  timeout: 3000
})

/**
 * 用来判断值类型
 * @param {Object} obj
 */
const toType = obj => {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

/**
 * 对象 null 值过滤
 * @param {Object} obj 请求 data 对象
 */
const filterNull = obj => {
  for (const key in obj) {
    if (obj[key] === null) {
      delete obj[key]
    } else {
      if (toType(obj[key]) === 'string') {
        obj[key] = obj[key].trim()
      } else if (toType(obj[key]) === 'object') {
        obj[key] = filterNull(obj[key])
      } else if (toType(obj[key]) === 'array') {
        obj[key] = filterNull(obj[key])
      }
    }
  }
  return obj
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 * @param {String} info 请求失败的附带信息
 */
const errorHandle = (status, info) => {
  // 状态码判断
  switch (status) {
    // 400: 客户端请求错误
    case 400:
      Message.error(i18n.t('message.request.400'))
      break
    case 404:
      Message.error(i18n.t('message.request.404'))
      break
    case 450:
      Message.error(i18n.t('message.request.450'))
      break
    case 500:
      Message.error(i18n.t('message.request.500'))
      break
    case 503:
      Message.error(i18n.t('message.request.503'))
      break
    default:
      Message.error({
        message: info,
        center: true
      })
  }
}

// 请求拦截器
Request.interceptors.request.use(
  config => {
    if (!config.url.includes('lcps.aodianyun.com')) {
      const token = store.state.token
      config.headers.token = token
      config.headers['X-Ca-Stage'] = String(process.env.VUE_APP_X_CA_STAGE)
    }
    if (config.method === 'get') {
      const data = filterNull(config.data)
      config.params = data
    }
    return config
  },
  error => {
    Message.error({
      message: i18n.t('message.request.fail'),
      center: true
    })
    Sentry.setExtra('response', { error: error })
    Sentry.captureException(
      new Error(store.state.userInfo.appId + i18n.t('message.request.fail'))
    )
    return Promise.error(error)
  }
)

// 响应拦截器
Request.interceptors.response.use(
  response => {
    store.commit('changeNetwork', true)
    if (response.status === 200) {
      if (response.config.url.includes('lcps.aodianyun.com')) {
        if (Number(response.data.code) === 0) {
          return Promise.resolve(response)
        }
        else {
          return Promise.reject(response.data.message)
        }
      }
      else {
        if (Number(response.data.code) === 200 && Number(response.data.errorCode) === 0) {
          return Promise.resolve(response)
        }
        else {
          return Promise.reject(response.data.errorMessage)
        }
      }
    } else {
      // 请求已发出，在 2xx 的范围
      Message.error({
        message: i18n.t('message.request.error'),
        center: true
      })
      Sentry.setExtra('response', { res: response })
      Sentry.captureException(
        new Error(store.state.userInfo.appId + i18n.t('message.request.error'))
      )
      return Promise.reject(response)
    }
  },
  error => {
    const { err } = error
    if (err) {
      // 请求已发出，但是不在 2xx 的范围
      Message.error({
        message: i18n.t('message.request.unexpected'),
        center: true
      })
      Sentry.setExtra('response', { error: err })
      Sentry.captureException(
        new Error(
          store.state.userInfo.appId + i18n.t('message.request.unexpected')
        )
      )
      errorHandle(err.status, err.data.errorMessage)
      return Promise.reject(err)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新 state 的 network 状态
      // network 状态在 app.vue 中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        Message.error({
          message: i18n.t('message.request.natworkError'),
          center: true
        })
        store.commit('changeNetwork', false)
        Sentry.captureException(
          new Error(
            store.state.userInfo.appId + i18n.t('message.request.natworkError')
          )
        )
      } else {
        Message.error({
          message: i18n.t('message.request.unknown'),
          center: true
        })
        Sentry.captureException(
          new Error(
            store.state.userInfo.appId + i18n.t('message.request.unknown')
          )
        )
        return Promise.reject(error)
      }
    }
  }
)

/**
 * 创建统一封装过的 axios 实例
 * @return { AxiosInstance }
 */
export default Request
