<template>
  <div
    class="loading"
    v-loading.fullscreen.lock="loading"
    :element-loading-text="
      waitingText
        ? waitingText
        : `${$t(
            'message.pages.loading.normalWaitingText'
          )} ${makeLcpsProgressOnShow}%`
    "
    element-loading-background="rgba(0, 0, 0, 0.8)"
  ></div>
</template>

<script>
import { mapState } from 'vuex'
import TWEEN from '@tweenjs/tween.js'

export default {
  name: 'Loading',
  data() {
    return {
      loading: true,
      makeLcpsProgress: 0,
      makeLcpsProgressOnShow: 0,
      loadingText: '',
      waitingText: '',
      firstInitFlag: false,
      inputCount: 0,
      layoutList: [],
      errorEvent: 0
    }
  },
  mounted() {
    setTimeout(() => {
      if (this.waitingText === '') {
        this.waitingText = `${this.$t(
          'message.pages.loading.advancedWaitingText'
        )} ${this.makeLcpsProgressOnShow}%`
      }
    }, 6000)

    this.initLcpsDelay(this.userInfo.appId)
      .then(res => {
        this.makeLcpsProgress = res.data.data.makeLcpsProgress
        return this.getLcpsInfo()
      })
      .then(lcpsInfoData => {
        console.log('delayLcpsDomain', lcpsInfoData.data.data.delayLcpsDomain)
        const lcpsInfo = {
          url: lcpsInfoData.data.data.delayLcpsDomain,
          title: lcpsInfoData.data.data.name,
          size: lcpsInfoData.data.data.outputResolution,
          isPGM: lcpsInfoData.data.data.isPGM,
          lcpsType: lcpsInfoData.data.data.lcpsType,
          createTime: lcpsInfoData.data.data.createTime,
          expireTime: lcpsInfoData.data.data.delayLcpsExpireTime,
          lcpsExpireTime: lcpsInfoData.data.data.expireTime,
          delayPublishTime:
            lcpsInfoData.data.data.makeLcpsConfig.pgwArray[0].delayPublishTime
        }
        return this.$store.dispatch('setLcpsInfo', lcpsInfo)
      })
      .then(() => {
        // 重定向至主页面
        this.$router.replace({
          name: 'home',
          query: {
            appId: this.userInfo.appId,
            types: this.userInfo.types
          }
        })
      })
      .catch(() => {
        this.$router.replace({
          name: 'error',
          query: {
            appId: this.userInfo.appId,
            types: this.userInfo.types,
            cause: 'runtime'
          }
        })
      })
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    makeLcpsProgress(newValue, oldValue) {
      new TWEEN.Tween({
        number: oldValue
      })
        .to(
          {
            number: newValue
          },
          80
        )
        .onUpdate(tween => {
          this.makeLcpsProgressOnShow = tween.number.toFixed(0)
        })
        .start()
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }
      animate()
    }
  },
  methods: {
    initLcpsDelay(appId) {
      const data = {
        appId: appId
      }
      return this.$api.business.getAppInfoLoading(data)
    },
    getLcpsInfo() {
      const data = {
        appId: this.userInfo.appId,
        uin: this.userInfo.uin
      }
      return this.$api.business.getLcpsInfo(data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
