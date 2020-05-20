<template>
  <div
    ref="player"
    id="player"
    class="player"
    :style="{ height: playerHeight + 'px' }"
    v-loading="loading"
    :element-loading-text="$t('message.pages.home.Player.loading')"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="autoplay-mask" v-show="playerMaskShow">
      <h3>
        {{ $t('message.pages.home.Player.playerMask.1') }}
        <span>{{ $t('message.pages.home.Player.playerMask.2') }}</span
        >{{ $t('message.pages.home.Player.playerMask.3') }}
        <span>{{ $t('message.pages.home.Player.playerMask.4') }}</span
        >{{ $t('message.pages.home.Player.playerMask.5') }}
      </h3>
      <el-link
        type="info"
        href="https://developers.google.com/web/updates/2017/09/autoplay-policy-changes"
        >{{ $t('message.pages.home.Player.policy') }}
      </el-link>
      <el-button type="primary" size="medium">{{
        $t('message.pages.home.Player.start')
      }}</el-button>
    </div>
    <video
      ref="delayVideo"
      id="delayVideo"
      preload="auto"
      autoplay
      playsinline
      style="
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-bottom-right-radius: 8px;"
    ></video>
    <div ref="flashVideoID" id="flashVideoID" style="display: none;">
      <p class="noFlashMsg" style="color: #FF0000; background-color:#FFFFFF">
        {{ $t('message.pages.home.Player.playerMask.flash') }}
        <a target="_blank" href="http://www.adobe.com/go/getflashplayer"
          >{{ $t('message.pages.home.Player.playerMask.obtain') }}
        </a>
      </p>
    </div>
    <div class="mss-dialog">
      <el-dialog
        :title="$t('message.pages.home.Player.setting')"
        :visible.sync="dialogVisible"
        width="576px"
        top="20vh"
        append-to-body
        @close="closeDialog"
      >
        <el-tabs v-model="activeTab" type="card">
          <el-tab-pane
            :label="$t('message.pages.home.Player.mssSource')"
            name="mss"
          >
            <el-form ref="form" label-width="80px">
              <el-form-item :label="$t('message.pages.home.Player.search')">
                <el-col :span="22">
                  <el-input
                    v-model="searchKeyWords"
                    size="mini"
                    style="width:100%"
                  ></el-input>
                </el-col>
              </el-form-item>
              <el-form-item class="dialog-form-item">
                <div class="dialog-listTypeRadio">
                  <el-radio-group
                    v-model="mssType"
                    size="mini"
                    @change="changeMssType"
                  >
                    <el-radio-button :label="4">{{
                      $t('message.pages.home.Player.userUploads')
                    }}</el-radio-button>
                    <el-radio-button :label="2">{{
                      $t('message.pages.home.Player.cloudMadeStorage')
                    }}</el-radio-button>
                  </el-radio-group>
                </div>
              </el-form-item>
              <el-form-item class="dialog-listLayout" v-if="reloadMssList">
                <mssList
                  v-if="dialogVisible && mssType == 4"
                  :mssType="4"
                  :keyWords="searchKeyWords"
                  @setMssObj=""
                ></mssList>
                <mssList
                  v-if="dialogVisible && mssType == 2"
                  :mssType="2"
                  :keyWords="searchKeyWords"
                  @setMssObj=""
                ></mssList>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane
            :label="$t('message.pages.home.Player.imageSource')"
            name="img"
          >
            <el-form ref="form" label-width="80px">
              <el-form-item :label="$t('message.pages.home.Player.images')">
                <el-col :span="6">
                  <div class="dialog-imgUpload">
                    <el-upload
                      class="upload-demo"
                      action
                      :http-request="uploadImg"
                      :show-file-list="false"
                      :before-upload="handleBeforeUpload"
                    >
                      <a
                        class="upload-img"
                        :title="$t('message.pages.home.Player.upload')"
                      >
                        <img v-show="!imgUrl" src="@/assets/icons/plus.svg" />
                        <img v-show="imgUrl" class="bg-img" :src="imgUrl" />
                      </a>
                    </el-upload>
                  </div>
                </el-col>
                <el-col :span="14">
                  <span class="upload-tips"
                    >{{ $t('message.pages.home.Player.uploadTips') }}
                  </span>
                </el-col>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button
            class="dialog-footer-btn-cancel"
            size="mini"
            @click="closeDialog"
            >{{ $t('message.model.cancel') }}
          </el-button>
          <el-button
            class="dialog-footer-btn-confirm"
            type="primary"
            size="mini"
            @click="setGasketConfig(activeTab)"
            >{{ $t('message.model.confirm') }}
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import paraArray from './paraArray'
// import { Base64 } from 'js-base64'

import playerItem from '@/components/playerItem'
import controlItem from '@/components/controlItem'
import mssList from './mssList'

export default {
  name: 'Player',
  components: {
    playerItem,
    controlItem,
    mssList
  },
  data() {
    return {
      stream: '',
      domain: '',
      rtcVideoID: '',
      flashVideoID: '',
      playerObject: null,
      width: '',
      height: '',
      type: '',
      loading: true,
      playerHeight: 720,
      playerWidth: 1280,
      playerMaskShow: false,
      progress: 0,
      progressRefresh: true,
      dialogVisible: false,
      activeTab: 'mss',
      reloadMssList: true,
      searchKeyWords: '',
      videoUrl: '',
      imgUrl: '',
      mssType: 4
    }
  },
  computed: {
    ...mapState(['userInfo', 'lcpsInfo']),
    env() {
      return String(process.env.VUE_APP_X_CA_STAGE)
    }
  },
  created() {
    this.stream = 'allpreview'
    this.rtcVideoID = 'delayVideo'
    this.flashVideoID = 'flashVideoID'
    this.width = '100%'
    this.height = '100%'
    this.type = 'auto'
  },
  mounted() {
    this.$nextTick(() => {
      this.playerWidth = document.getElementById('player').clientWidth
      this.playerHeight = this.playerWidth * 0.5625 // 播放器宽高比系数

      if (this.lcpsInfo.url) {
        this.loadLcpsPlayer().catch(() => {
          this.$message.error(this.$t('message.model.tips.loadFailed'))
        })
      }
    })

    const sizeTimer = setInterval(() => {
      this.$nextTick(() => {
        if (document.getElementById('player')) {
          this.playerWidth = document.getElementById('player').clientWidth
        }
      })
    }, 250)
    this.$once('hook:beforeDestroy', () => {
      clearInterval(sizeTimer)
    })
  },
  beforeDestroy() {
    try {
      this.playerObject.Stop()
    } catch {
      console.log('H5 Player is not supported')
    }
  },
  watch: {
    playerWidth: {
      handler(nv, ov) {
        if (nv && nv !== ov) {
          console.warn('player resize')
          this.setPlayerSize()
        }
      },
      immediate: true
    }
  },
  methods: {
    changeInput(type, url) {
      switch (type) {
        case 'video': {
          const data = {
            channel: 2,
            playURL: [],
            inputType: '拉流'
          }
          this.$set(data, 'playURL', [url])
          return this.$api.basement.changeInput(this.lcpsInfo.url, data)
        }
        case 'image': {
          const data = {
            channel: 2,
            playURL: [''],
            inputType: '页面',
            webPageUrlArray: [
              `http://consoles.guangdianyun.tv/test?image=${url}`
            ]
          }
          return this.$api.basement.changeInput(this.lcpsInfo.url, data)
        }
        default:
          break
      }
    },
    switch(type) {
      const data = paraArray(type, this.lcpsInfo.size)
      return this.$api.basement.switch(this.lcpsInfo.url, data)
    },
    getConfig() {
      return this.$api.basement.getConfig(this.lcpsInfo.url, {})
    },
    uploadImg(file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        console.log(reader.result) // 获取到 base64 格式图片
        const data = {
          file: String(reader.result)
        }
        return this.$api.business.uploadImg(data).then(res => {
          this.imgUrl = res.data.data
        })
      }
    },
    /**
     * 动态加载JS
     * @param {string} url 脚本地址
     * @param {function} callback  回调函数
     */
    dynamicLoadJs(url, callback) {
      const self = this
      const head = document.getElementsByTagName('head')[0]
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = url
      if (typeof callback === 'function') {
        /* eslint-disable no-multi-assign */
        script.onload = script.onreadystatechange = function() {
          if (
            !this.readyState ||
            this.readyState === 'loaded' ||
            this.readyState === 'complete'
          ) {
            callback()
            script.onload = script.onreadystatechange = null
          }
        }
        script.onerror = function() {
          head.removeChild(script)
          setTimeout(function() {
            self.dynamicLoadJs(url, callback)
          }, 500)
        }
        /* eslint-disable no-multi-assign */
      }
      head.appendChild(script)
    },
    loadLcpsPlayer() {
      return new Promise((resolve, reject) => {
        this.dynamicLoadJs(`//${this.lcpsInfo.url}/lcpsplayer.js`, () => {
          /* eslint-disable no-undef */
          LcpsPlayerInit(this.lcpsInfo.url, () => {
            console.log('OnLcpsPlayerReady')
            this.playerObject = new LcpsPlayer(
              this.lcpsInfo.url, // 延迟导播台地址不带 //
              this.stream,
              this.rtcVideoID,
              this.flashVideoID,
              this.width,
              this.height,
              this.type,
              this.OnError,
              this.OnWebrtcUserGestureRequire
            )

            if (
              document.getElementById('flashVideoID').style.display !== 'none'
            ) {
              this.loading = false
              this.playerMaskShow = false
              resolve('HasObj')
            } else {
              const player = document.getElementById('delayVideo')
              if (player) {
                this.loading = false
                resolve('HasObj')
              } else {
                reject(new Error('NotHaveObj'))
              }
            }
            reject(new Error('NotHaveObj'))
          })
          /* eslint-disable no-undef */
        })
      })
    },
    /**
     * 错误处理
     * @param {string} data 页面数量状态代码
     */
    OnError(data) {
      if (data.code === '-2') {
        this.$message.warning(this.$t('message.model.tips.tooManyPages'))
      } else {
        this.$message.warning(data.message)
      }
    },
    // chrome 新版本 video 自动播放受限制，必需用户交互才行
    OnWebrtcUserGestureRequire() {
      console.log('Gesture')
      const player = document.getElementById('delayVideo')
      if (player) {
        if (player.paused) {
          if (!this.playerMaskShow) {
            this.playerMaskShow = true
          }
          if (this.playTimer) clearInterval(this.playTimer)
          this.playTimer = setInterval(() => {
            try {
              player.play()
              if (!player.paused) {
                this.playerMaskShow = false
                clearInterval(this.playTimer)
              }
            } catch (err) {
              console.log(err)
            }
          }, 500)
        } else {
          if (this.playTimer) clearInterval(this.playTimer)
          this.playerMaskShow = false
        }
      }
    },
    setPlayerSize() {
      this.$nextTick(() => {
        this.playerWidth = document.getElementById('player').clientWidth
        this.playerHeight = this.playerWidth * 0.5625 // 播放器宽高比系数
      })
    },
    handleBeforeUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error(this.$t('message.model.tips.imgType'))
        return false
      }
      if (!isLt2M) {
        this.$message.error(this.$t('message.model.tips.imgVolume'))
        return false
      }
      this.uploadImg(file)
      return false
    },
    changeMssType() {
      this.reloadMssList = false
      this.$nextTick(() => {
        this.reloadMssList = true
      })
    },
    closeDialog() {
      this.activeTab = 'mss'
      this.reloadMssList = true
      this.mssType = 4
      this.searchKeyWords = ''
      this.videoUrl = ''
      this.imgUrl = ''
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>

<style lang="scss">
.el-slider {
  .el-slider__bar {
    background-color: $panel-color;
  }

  .el-slider__button-wrapper {
    .el-slider__button {
      border: 2px solid $panel-color;
    }
  }
}

.el-dialog {
  .dialog-searchBtn {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dialog-listTypeRadio {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dialog-imgUpload {
    .upload-demo {
      display: flex;
      justify-content: center;
      align-items: center;

      a {
        width: 112px;
        height: 63px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px dashed $theme-color-white;

        img {
          width: 50px;
          height: 50px;
        }

        .bg-img {
          max-width: 106px;
          height: 60px;
        }
      }
    }
  }

  .upload-tips {
    margin-left: 10px;
    color: $theme-color-white;
  }
}
</style>
