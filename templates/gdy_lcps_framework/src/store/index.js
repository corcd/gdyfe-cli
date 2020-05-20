import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: 'zh',
    network: true,
    token: '',
    userInfo: {
      uin: '',
      appId: '',
      types: ''
    },
    lcpsInfo: {
      url: '',
      title: '',
      size: '720p',
      isPGM: 0,
      lcpsType: 1, // 1 普通   2 包年
      createTime: 0,
      expireTime: 0,
      lcpsExpireTime: 0,
      delayPublishTime: 10
    },
    coinInfo: {
      price: 60,
      leftCoin: 12000
    }
  },
  getters: {
    getUserInfo: state => {
      // 获取当前用户信息
      const data = {}
      return data
    },
    getLcpsInfo: state => {
      // 获取视频流、播放器信息
      const data = {}
      return data
    },
    getLcpsUrl: state => {
      // 获取视频流、播放器信息
      const data = state.lcpsInfo.url
      return data
    }
  },
  mutations: {
    setLocalLang(state, value) {
      state.language = value
    },
    changeNetwork(state, value) {
      state.network = value
    },
    setToken(state, value) {
      state.token = value
    },
    setUserInfo(state, obj) {
      Object.assign(state.userInfo, obj)
    },
    setLcpsInfo(state, obj) {
      Object.assign(state.lcpsInfo, obj)
    },
    setCoinInfo(state, obj) {
      state.coinInfo.price = Number(obj.price)
      state.coinInfo.leftCoin = Number(obj.leftCoin)
    }
  },
  actions: {
    setLocalLang(context, value) {
      VueCookies.set('GDY_LANGUAGE', value)
      return new Promise((resolve, reject) => {
        if (value) {
          context.commit('setLocalLang', value)
          resolve(value)
        } else {
          reject(value)
        }
      })
    },
    changeNetwork(context, value) {
      context.commit('changeNetwork', value)
    },
    setToken(context, value) {
      return new Promise((resolve, reject) => {
        if (value) {
          context.commit('setToken', value)
          resolve(value)
        } else {
          reject(value)
        }
      })
    },
    setUserInfo(context, obj) {
      return new Promise((resolve, reject) => {
        if (obj) {
          context.commit('setUserInfo', obj)
          resolve(obj)
        } else {
          reject(obj)
        }
      })
    },
    setLcpsInfo(context, obj) {
      return new Promise((resolve, reject) => {
        if (obj) {
          context.commit('setLcpsInfo', obj)
          resolve(obj)
        } else {
          reject(obj)
        }
      })
    },
    setCoinInfo(context, obj) {
      return new Promise((resolve, reject) => {
        if (obj) {
          context.commit('setCoinInfo', obj)
          resolve(obj)
        } else {
          reject(obj)
        }
      })
    }
  }
})
