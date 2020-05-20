import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils'
import api from './api'
import './permission'
import i18n from './i18n'
import ElementUI from 'element-ui'
import arms from '@/utils/arms'
import Report from 'gdy-report'
import pConfig from '../config'

import '@/assets/fonts/font.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/element-variables.scss'
import 'font-awesome/scss/font-awesome.scss'
import '@/assets/styles/global.scss'
import '@/assets/styles/common.scss'

Vue.config.productionTip = false
Vue.prototype.$utils = utils
Vue.prototype.$api = api

// UIkit
Vue.use(ElementUI)

arms('xxxx')

Report({
  dsn: 'xxxx',
  version: pConfig.version,
  env: process.env.VUE_APP_X_CA_STAGE
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
