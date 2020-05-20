import Request from '@/request/aodian'

const basement = {
  /*
   * 底层相关
   */
  getConfig(url, data) {
    return Request.get(`https://${url}/getConfig`, { data })
  },
  getStatus(url, data) {
    return Request.get(`https://${url}/getStatus`, { data })
  },
  getOSInfo(url, data) {
    return Request.get(`https://${url}/getOSInfo`, { data })
  },
  switch(url, data) {
    return Request.post(`https://${url}/switch`, data)
  },
  changeInput(url, data) {
    return Request.post(`https://${url}/changeInput`, data)
  },
  setConfig(url, data) {
    return Request.post(`https://${url}/setConfig`, data)
  }
}

export default basement
