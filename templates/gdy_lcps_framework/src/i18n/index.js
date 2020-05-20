import Vue from 'vue'
import store from '@/store'
import VueI18n from 'vue-i18n'
import VueCookies from 'vue-cookies'

// International
Vue.use(VueI18n)

let lang = VueCookies.get('GDY_LANGUAGE')
if (lang) {
  store.dispatch('setLocalLang', String(lang))
} else {
  lang = 'zh'
}

const i18n = new VueI18n({
  locale: String(lang), // this.$i18n.locale 切换语言
  messages: {
    zh: require('@/common/lang/zh'),
    hk: require('@/common/lang/hk'),
    en: require('@/common/lang/en')
  }
})

export default i18n
