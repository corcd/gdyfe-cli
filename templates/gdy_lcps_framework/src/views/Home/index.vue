<template>
  <div class="home">
    <Refresh></Refresh>
    <Navbar
      :CPUUtilization="runtimeData.CPUUtilization"
      :networkDelay="runtimeData.networkDelay"
      :currentTime="runtimeData.currentTime"
    ></Navbar>
    <div
      class="container"
      :style="{ 'min-height': lcpsInfo.size === '1080p' ? 1080 : 720 + 'px' }"
    >
      <div
        class="playerBox"
        :class="[
          lcpsInfo.size === '1080p' ? 'playerBox_1080' : 'playerBox_720'
        ]"
      >
        <Player></Player>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Refresh from './Refresh'
import Navbar from './Navbar'
import Player from './Player'

export default {
  name: 'Home',
  components: {
    Refresh,
    Navbar,
    Player
  },
  data() {
    return {
      runtimeData: () => {
        return {}
      },
      notifyPromise: Promise.resolve()
    }
  },
  created() {
    if (typeof Worker !== 'undefined') {
      const worker = this.createWorker(() => {
        let lcpsUrl = ''

        function request(url, wait = 1500) {
          return new Promise((resolve, reject) => {
            let status = 0 // 0 等待 1 完成 2 超时
            const timer = setTimeout(() => {
              if (status === 0) {
                status = 2
                clearTimeout(timer)
                reject(new Error('Fetch Timeout'))
              }
            }, wait)
            fetch(url, {
              method: 'GET'
            })
              .then(res => res.json())
              .then(res => {
                if (status !== 2) {
                  clearTimeout(timer)
                  status = 1
                  resolve(res)
                }
              })
          })
        }

        self.onmessage = e => {
          lcpsUrl = String(e.data.url)
          console.log('worker', lcpsUrl)
        }

        setInterval(() => {
          if (lcpsUrl) {
            const data = {
              CPUUtilization: 0,
              networkDelay: 0,
              currentTime: 0,
              sourceProgressStatus: {}
            }

            request(`https://${lcpsUrl}/getStatus`)
              .then(status => {
                data.networkDelay = status.pgmConsumeTime
                data.sourceProgressStatus = status.sourceProgressStatus[2]
                return request(`https://${lcpsUrl}/getOSInfo`)
              })
              .then(OSinfo => {
                data.CPUUtilization = OSinfo.cpu
                return request('https://quan.suning.com/getSysTime.do')
              })
              .then(time => {
                data.currentTime = time.sysTime2
                const postData = {
                  type: 'data',
                  data: data
                }
                self.postMessage(postData)
              })
              .catch(err => {
                const errorData = {
                  type: 'error',
                  data: err
                }
                self.postMessage(errorData)
              })
          }
        }, 1000)
      })

      worker.postMessage({
        url: this.lcpsInfo.url
      })

      worker.addEventListener('error', e => {
        console.error('Worker Error', e.data)
      })

      worker.onmessage = e => {
        // console.info(dayjs(e.data.time).valueOf())
        switch (e.data.type) {
          case 'data':
            this.$store.commit('changeNetwork', true)
            this.runtimeData = e.data.data
            this.$store.dispatch(
              'setGasketInfo',
              e.data.data.sourceProgressStatus
            )
            break
          case 'error':
            this.$store.commit('changeNetwork', false)
            break
          default:
            break
        }
      }

      this.$once('hook:beforeDestroy', () => {
        worker.terminate()
      })
    }
  },
  mounted() {
    this.getExpireItem()
    const expireTimer = setInterval(() => {
      this.getExpireItem()
    }, 60000)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(expireTimer)
    })
    this.getCoinInfo()
  },
  computed: {
    ...mapState(['lcpsInfo'])
  },
  methods: {
    ...mapActions(['setCoinInfo']),
    createWorker(func) {
      const blob = new Blob(['(' + func.toString() + ')()'])
      const url = window.URL.createObjectURL(blob)
      return new Worker(url)
    },
    getLcpsExpireList() {
      return this.$api.business.getLcpsExpireList()
    },
    getCoinofUseLcps() {
      const data = {
        sourceNum: 4,
        hour: 1,
        outputResolution: this.lcpsInfo.size
      }
      return this.$api.business.getCoinofUseLcps(data)
    },
    getExpireItem() {
      this.getLcpsExpireList().then(res => {
        if (res.data.data.length !== 0) {
          res.data.data.forEach(item => {
            this.notify(item)
          })
        }
      })
    },
    getCoinInfo() {
      this.getCoinofUseLcps()
        .then(res => {
          this.setCoinInfo(res.data.data)
        })
        .catch(() => {
          this.$message.error('获取导播台计费信息异常')
        })
    },
    notify(msg) {
      this.notifyPromise = this.notifyPromise.then(this.$nextTick).then(() => {
        if (
          Number(msg.balance) === 15 ||
          Number(msg.balance) === 10 ||
          Number(msg.balance) <= 5
        ) {
          const date = new Date()
          this.$notify({
            title: `${
              msg.appId.includes('_delay') ? '延迟导播台' : '导播台'
            } <${msg.name}> 到期警告`,
            message: `${
              msg.appId.includes('_delay') ? '延迟导播台' : '导播台'
            } <${msg.name}> 当前剩余 ${
              msg.balance
            } 分钟，为保障直播正常进行，请尽快延期(${(
              Array(2).join(0) + date.getHours()
            ).slice(-2)}:${(Array(2).join(0) + date.getMinutes()).slice(-2)}:${(
              Array(2).join(0) + date.getSeconds()
            ).slice(-2)})`,
            type: 'warning',
            duration: 0,
            offset: 30
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;

  .container {
    width: 100%;
    height: calc(100% - 55px);
    display: flex;
    justify-content: center;
    align-items: center;

    .playerBox {
      flex-shrink: 1;
      width: 1280px;
    }

    .playerBox_720 {
      max-width: 1280px;
      max-height: 720px;
    }

    .playerBox_1080 {
      max-width: 1920px;
      max-height: 1080px;
    }

    .playerBox_2k {
      max-width: 2560px;
      max-height: 1440px;
    }

    .playerBox_4k {
      max-width: 3840px;
      max-height: 2160px;
    }
  }
}
</style>
