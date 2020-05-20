import Request from '@/request'

const time = {
  getTime() {
    return Request.get('//quan.suning.com/getSysTime.do')
  }
}

export default time
