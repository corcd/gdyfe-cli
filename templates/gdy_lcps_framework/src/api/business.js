import qs from 'qs'
import base from '@/api/base'
import Request from '@/request'

const business = {
  /*
   * 业务层相关
   */
  getLogin() {
    return Request.get(`${base.gateWay}/v1/Passport/Index/getLogin`)
  },
  getAppInfoLoading(data) {
    return Request.get(`${base.gateWay}/v1/bcc/lcpsMake/getAppInfoLoading`, {
      data
    })
  },
  getLcpsInfo(data) {
    return Request.post(
      `${base.gateWay}/v1/bcc/lcpsMake/getLcpsInfo`,
      qs.stringify(data)
    )
  },
  getLcpsExpireList(data) {
    return Request.get(`${base.gateWay}/v1/bcc/lcpsMake/getLcpsExpireList`, {
      data
    })
  },
  getMssList(data) {
    return Request.get(`${base.gateWay}/v1/mss/Index/getMssList`, { data })
  },
  uploadImg(data) {
    return Request.post(
      `${base.gateWay}/v1/bcc/lcpsMake/uploadImg`,
      qs.stringify(data)
    )
  },
  getCoinofUseLcps(data) {
    return Request.get(`${base.gateWay}/v1/bcc/lcpsMake/getCoinofUseLcps`, {
      data
    })
  }
}

export default business
