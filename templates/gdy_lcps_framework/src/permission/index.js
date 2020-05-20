import router from '@/router'
import store from '@/store'
import VueCookies from 'vue-cookies'
import api from '@/api'
import utils from '@/utils'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式

NProgress.configure({
  showSpinner: false
}) // 禁用进度条进度环

router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log('From:', from.path)
  console.log('To:', to.path)

  // 必要参数
  const appId = String(utils.parseUrl('appId')) // 导播台唯一标识 appId
  const types = String(utils.parseUrl('types')) // 区分频道和主账号
  const token =
    types === 'channel'
      ? VueCookies.get('CONSOLE_TOKEN_GDY_CHANNEL')
      : VueCookies.get('CONSOLE_TOKEN_GDY')

  if (appId && types && token) {
    // nothing to do
  } else {
    next({
      name: 'error',
      query: {
        appId: appId,
        types: types,
        cause: 'arguments'
      }
    })
  }

  // 权限树
  switch (to.path) {
    case '/':
      // 进入主页
      if (from.path === '/loading') {
        return next()
      }
      break
    case '/loading':
      // 进入 loading 页
      if (from.path === '/' || from.path === '/error') {
        return next()
      }
      break
    case '/error':
      // 进入错误页
      return next()
    default:
      break
  }

  store
    .dispatch('setToken', token)
    .then(() => {
      return api.business.getLogin()
    })
    .then(res => {
      const userInfo = {
        appId: appId,
        uin: res.data.data.uin,
        types: types
      }
      Sentry.setUser({
        AppId: appId,
        Uin: res.data.data.uin,
        Env: process.env.VUE_APP_X_CA_STAGE
      })
      return store.dispatch('setUserInfo', userInfo)
    })
    .then(() => {
      next({
        name: 'loading',
        query: {
          appId: appId,
          types: types
        }
      })
    })
    .catch(() => {
      next({
        name: 'error',
        query: {
          appId: appId,
          types: types,
          cause: 'login'
        }
      })
    })
})

router.afterEach(() => {
  window.scroll(0, 0)
  NProgress.done()
})
