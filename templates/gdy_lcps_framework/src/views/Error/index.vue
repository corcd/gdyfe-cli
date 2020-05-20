<template>
  <div class="error">
    <div class="error-info">
      <h1>{{ errorType }}</h1>
      <h5>
        AppId:
        {{
          this.userInfo.appId ? this.userInfo.appId : this.$route.query.appId
        }}
      </h5>
      <h4>{{ errorTips }}</h4>
      <div class="error-btngroup">
        <el-button type="primary" @click="reloadLcpsDelay"
          >{{ $t('message.pages.error.reload') }}
        </el-button>
        <el-button type="default" @click="closeLcpsDelay">{{
          $t('message.pages.error.closePage')
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Error',
  data() {
    return {
      appId: '',
      errorType: this.$t('message.pages.error.error'),
      errorTips: '请尝试关闭页面后重新进入，如继续遇到问题请联系相应的商务经理',
      errorSet: {
        login: {
          errorType: '导播台登陆验证失败',
          errorTips:
            '当前用户登陆验证失败，请检查登录状态后重新进入，如继续遇到问题请联系相应的商务经理'
        },
        closed: {
          errorType: '导播台已关闭',
          errorTips:
            '当前导播台已经过期或者被关闭，如需使用请重新开启，如继续遇到问题请联系相应的商务经理'
        },
        destroyed: {
          errorType: '导播台已销毁',
          errorTips:
            '当前导播台已被销毁，如需使用请重新创建，如继续遇到问题请联系相应的商务经理'
        },
        inexistent: {
          errorType: '导播台不存在',
          errorTips:
            '当前导播台不存在，请确认 appId 是否正确，如继续遇到问题请联系相应的商务经理'
        },
        arguments: {
          errorType: '导播台参数错误',
          errorTips:
            '当前导播台参数错误，请确认地址正确后重新进入，如继续遇到问题请联系相应的商务经理'
        },
        runtime: {
          errorType: '导播台服务超时',
          errorTips:
            '当前导播台访问后台服务超时，请稍后重新进入，如继续遇到问题请联系相应的商务经理'
        }
      }
    }
  },
  created() {
    // console.log(this.$route.query.type);
    this.appId = this.$route.query.appId
    this.errorType = this.errorSet[this.$route.query.cause].errorType
    this.errorTips = this.errorSet[this.$route.query.cause].errorTips
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    reloadLcpsDelay() {
      this.$router.push({
        name: 'home',
        query: {
          appId: this.userInfo.appId
            ? this.userInfo.appId
            : this.$route.query.appId,
          types: this.userInfo.types
            ? this.userInfo.types
            : this.$route.query.types
        }
      })
    },
    closeLcpsDelay() {
      window.open('', '_self').close()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
