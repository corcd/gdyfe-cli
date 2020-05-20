/**
 * @file some common functions
 * @since 1.0.3
 * @author whzcorcd <whzcorcd@gmail.com>
 */
import i18n from '@/i18n'
import { Message, MessageBox } from 'element-ui'

export default {
  parseUrl: id => {
    return (
      decodeURIComponent(
        (new RegExp('[?|&]' + id + '=([^&;]+?)(&|#|;|$)').exec(
          location.href
          // eslint-disable-next-line no-sparse-arrays
        ) || [, ''])[1].replace(/\+/g, '%20')
      ) || null
    )
  },
  stringToBool: param => {
    if (typeof param === 'string') {
      if (param === 'true') return true
      else if (param === 'false') return false
    } else if (typeof param === 'boolean') {
      return param
    } else {
      Message({
        message: i18n.t('message.model.tips.dataType'),
        type: 'error',
        center: true
      })
      return false
    }
  },
  getCookie: cname => {
    const name = cname + '='
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  },
  getBrowserVersion: (lowestVersion = 60) => {
    const re = new RegExp('Chrome/(.+?)(.+?)')
    const version =
      re.exec(navigator.appVersion)[1] + re.exec(navigator.appVersion)[2]
    if (window.navigator && version) {
      if (Number(version) < lowestVersion) {
        MessageBox.alert({
          message: i18n.t('message.model.tips.version'),
          customClass: 'messageBox',
          type: 'warning',
          center: true
        })
      }
    } else {
      MessageBox.alert({
        message: i18n.t('message.model.tips.browser'),
        customClass: 'messageBox',
        type: 'info',
        center: true
      })
    }
  }
}
