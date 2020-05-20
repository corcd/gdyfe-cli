<template>
  <div class="navbar">
    <div class="navbar-lcps-info">
      <el-tooltip
        class="item"
        effect="dark"
        :content="getLcpsTitle"
        placement="bottom-start"
      >
        <h3>{{ getLcpsTitle }}</h3>
      </el-tooltip>
      <el-tag class="navbar-lcps-info-tag">{{ lcpsInfo.size }}</el-tag>
      <el-tag v-if="env" class="navbar-lcps-info-tag">{{
        env === 'TEST' ? 'Alpha' : 'Beta'
      }}</el-tag>
      <div class="navbar-lcps-info-osinfo">
        <span
          class="navbar-lcps-info-osinfo-cpu"
          :class="{ 'info-warning': CPUUtilization >= 70 }"
          >{{ $t('message.pages.home.Navbar.cpu') }}{{ CPUUtilization }}%
        </span>
        <span class="navbar-lcps-info-osinfo-net"
          >{{ $t('message.pages.home.Navbar.net') }}{{ networkDelay }}ms
        </span>
      </div>
    </div>
    <div class="navbar-lcps-control">
      <span class="navbar-lcps-control-remainingtime"
        >{{ $t('message.pages.home.Navbar.remainingTime')
        }}<span class="time">{{ getRemainingTime }}</span>
      </span>
      <el-button
        v-if="lcpsInfo.lcpsType === 2"
        class="navbar-lcps-control-btn"
        type="primary"
        size="mini"
        @click="navDialogVisible = true"
        >{{ $t('message.pages.home.Navbar.postpone') }}
      </el-button>
      <el-dropdown>
        <el-button class="navbar-lcps-control-btn" type="primary" size="mini">
          {{ $t('message.pages.home.Navbar.language') }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="switchLang('zh')"
            >中文（简体）
          </el-dropdown-item>
          <el-dropdown-item @click.native="switchLang('hk')"
            >中文（繁體）
          </el-dropdown-item>
          <el-dropdown-item @click.native="switchLang('en')"
            >English
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <a
        class="navbar-lcps-control-fullscreen"
        :title="$t('message.pages.home.Navbar.fullScreen')"
        @click="toggleFullScreen"
      >
        <img
          draggable="false"
          v-show="!isFullScreen"
          src="@/assets/icons/fullscreen.svg"
        />
        <img
          draggable="false"
          v-show="isFullScreen"
          src="@/assets/icons/fullscreen-exit.svg"
        />
      </a>
    </div>
    <div class="nav-dialog">
      <el-dialog
        title="导播台延期"
        :visible.sync="navDialogVisible"
        width="500px"
        top="25vh"
        v-loading="dialogLoading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        @open="openDialog('postpone')"
        @close="closeDialog"
      >
        <el-form ref="form" label-width="100px">
          <el-form-item label="使用时长:">
            <el-select
              v-model="delayDarution"
              placeholder="请选择使用时长"
              style="width: 100%;"
              size="mini"
            >
              <el-option
                v-for="(item, index) in delayArr"
                :key="index"
                :label="
                  `${item} 小时 ( ${dateFormat(
                    lcpsInfo.expireTime,
                    item
                  )} 结束 )`
                "
                :value="String(item)"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="消耗云币:">
            <span class="fa fa-btc priceInfo fix"></span>
            <span class="priceInfo">{{ coinInfo.price * delayDarution }}</span>
          </el-form-item>
          <el-form-item label="剩余云币:">
            <span class="fa fa-btc priceInfo fix"></span>
            <span>
              {{ parseInt(coinInfo.leftCoin, 10) }} (
              <span class="priceInfo" style="font-size: 0.9em;"
                >使用后剩余:
              </span>
              <span class="fa fa-btc priceInfo fix"></span>
              {{
                parseInt(coinInfo.leftCoin, 10) -
                  coinInfo.price * Number(delayDarution)
              }}
              )
            </span>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            class="dialog-footer-btn-cancel"
            size="mini"
            @click="navDialogVisible = false"
            >取 消
          </el-button>
          <el-button
            class="dialog-footer-btn-confirm"
            type="primary"
            size="mini"
            @click="postpone"
            >确 定
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'

export default {
  name: 'Navbar',
  props: {
    CPUUtilization: { type: Number, default: 0 },
    networkDelay: { type: Number, default: 0 },
    currentTime: { type: String, default: '' }
  },
  data() {
    return {
      title: '获取中...',
      isFullScreen: false,
      navDialogVisible: false,
      dialogLoading: true,
      delayArr: [1, 2, 3, 5, 10, 24],
      delayDarution: '',
      price: 0,
      leftCoin: 0,
      h: 0,
      m: 0,
      s: 0
    }
  },
  computed: {
    ...mapState(['userInfo', 'lcpsInfo', 'coinInfo']),
    env() {
      return String(process.env.VUE_APP_X_CA_STAGE)
    },
    getLcpsTitle() {
      return this.lcpsInfo.title ? this.lcpsInfo.title : this.title
    },
    getRemainingTime() {
      if (this.currentTime) {
        const currentTimeObj = dayjs(this.currentTime)
        const expireTimeObj = dayjs(this.lcpsInfo.expireTime * 1000)
        const day = expireTimeObj.diff(currentTimeObj, 'day')
        const hour = expireTimeObj.diff(currentTimeObj, 'hour')
        const minute = expireTimeObj.diff(currentTimeObj, 'minute') - hour * 60
        const second =
          expireTimeObj.diff(currentTimeObj, 'second') -
          hour * 3600 -
          minute * 60

        return day
          ? `${day}天`
          : `${hour >= 10 ? hour : '0' + hour}:${
              minute >= 10 ? minute : '0' + minute
            }:${second >= 10 ? second : '0' + second}`
      } else {
        return '--:--:--'
      }
    },
    dateFormat() {
      return (unixDate, delayHours) => {
        const date = new Date((unixDate + delayHours * 3600) * 1000)
        return (
          date.getFullYear() +
          '年' +
          Number(date.getMonth() + 1) +
          '月' +
          date.getDate() +
          '日 ' +
          (Array(2).join(0) + date.getHours()).slice(-2) +
          ':' +
          (Array(2).join(0) + date.getMinutes()).slice(-2) +
          ':' +
          (Array(2).join(0) + date.getSeconds()).slice(-2)
        )
      }
    }
  },
  methods: {
    getLcpsInfo() {
      const data = {
        appId: this.userInfo.appId,
        uin: this.userInfo.uin
      }
      return this.$api.business.getLcpsInfo(data)
    },
    openDelayLcps() {
      const temp = this.lcpsInfo.expireTime + Number(this.delayDarution) * 3600
      const data = {
        appId: this.userInfo.appId,
        type: '3', // -1销毁 2关闭 3延期
        expireTime: String(temp)
      }
      console.log(data)
      return this.$api.business.openDelayLcps(data)
    },
    openDialog(type) {
      switch (type) {
        case 'postpone':
          this.dialogLoading = false
          break
        default:
          break
      }
    },
    closeDialog() {
      this.dialogLoading = true
      this.delayDarution = ''
    },
    postpone() {
      if (this.delayDarution) {
        this.openDelayLcps()
          .then(() => {
            this.navDialogVisible = false
            this.$message.success('导播台延期成功')
            this.refreshLcpsInfo()
          })
          .catch(err => console.log(err))
      } else {
        this.$message.warning('请填写必要信息')
      }
    },
    refreshLcpsInfo() {
      this.getLcpsInfo()
        .then(lcpsInfoData => {
          const lcpsInfo = {
            url: lcpsInfoData.data.data.delayLcpsDomain,
            title: lcpsInfoData.data.data.name,
            size: lcpsInfoData.data.data.outputResolution,
            isPGM: lcpsInfoData.data.data.isPGM,
            createTime: lcpsInfoData.data.data.createTime,
            expireTime: lcpsInfoData.data.data.delayLcpsExpireTime,
            lcpsExpireTime: lcpsInfoData.data.data.expireTime,
            delayPublishTime:
              lcpsInfoData.data.data.makeLcpsConfig.pgwArray[0].delayPublishTime
          }
          return this.$store.dispatch('setLcpsInfo', lcpsInfo)
        })
        .catch(() => {
          this.$message.warning('更新导播台信息发生异常，建议刷新重载数据')
        })
    },
    switchLang(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLocalLang', String(lang))
    },
    toggleFullScreen() {
      if (this.isFullScreen) {
        // 退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msRequestFullscreen) {
          document.msRequestFullscreen()
        }
        this.isFullScreen = false
      } else {
        // 全屏
        const docElm = document.documentElement
        if (docElm.requestFullscreen) {
          // W3C
          docElm.requestFullscreen()
        } else if (docElm.mozRequestFullScreen) {
          // FireFox
          docElm.mozRequestFullScreen()
        } else if (docElm.webkitRequestFullScreen) {
          // Chrome
          docElm.webkitRequestFullScreen()
        } else if (docElm.msRequestFullscreen) {
          // IE11
          docElm.msRequestFullscreen()
        }
        this.isFullScreen = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
