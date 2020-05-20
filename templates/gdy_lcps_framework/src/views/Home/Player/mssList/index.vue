<template>
  <div
    class="msslist"
    v-loading="loading"
    element-loading-background="rgb(44, 45, 49)"
  >
    <section class="msslist-list">
      <ul class="mss-infinite-list" v-infinite-scroll="newGetMssUploadList">
        <li
          class="mss-infinite-list-item"
          v-for="item in resultOfSearch"
          :key="item.id"
          @mouseover="hover(item.id)"
          @mouseout="notHover(item.id)"
          @click="selectMssObj(item)"
        >
          <div
            class="mss-infinite-list-item-content"
            :class="{ selected: selectedMssObj.id === item.id }"
          >
            <img :src="item.thumbnail + '/150/80'" />
            <div class="mss-infinite-list-item-content-hover">
              <span v-show="item.width !== 0 && item.height !== 0"
                >{{ $t('message.pages.home.Player.mssList.resolution')
                }}{{ item.width }}*{{ item.height }}
              </span>
              <span v-show="item.width === 0 && item.height === 0"
                >{{ $t('message.pages.home.Player.mssList.resolution') }}
                {{ $t('message.pages.home.Player.mssList.originalResolution') }}
              </span>
              <span
                >{{ $t('message.pages.home.Player.mssList.volume')
                }}{{ sizeFormat(item.size) }} MB</span
              >
              <span
                >{{ $t('message.pages.home.Player.mssList.createdTime')
                }}{{ dateFormat(item.uptime) }}</span
              >
            </div>
            <div
              class="mss-infinite-list-item-content-hover"
              v-show="
                infoActivedId === item.id &&
                  Number(mssType) === 4 &&
                  Number(item.transcoding) === 0
              "
            >
              <span>{{
                $t('message.pages.home.Player.mssList.transcoding')
              }}</span>
            </div>
            <div
              class="mss-infinite-list-item-content-mark"
              v-show="selectedMssObj.id === item.id"
            >
              <img src="@/assets/icons/check-circle-fill.svg" />
            </div>
          </div>
          <div class="mss-infinite-list-item-title">
            <span>{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'mssList',
  props: {
    mssType: Number,
    keyWords: { type: String, default: '' }
  },
  data() {
    return {
      searchParam: '',
      pageIndex: 1,
      mssArray: [],
      selectedMssObj: () => {
        return {}
      },
      infoActivedId: '',
      loading: true
    }
  },
  computed: {
    resultOfSearch() {
      if (this.keyWords) {
        return this.mssArray.filter(
          item => item.title.indexOf(this.keyWords.replace(/\s/g, '')) !== -1
        )
      } else {
        return this.mssArray
      }
    }
  },
  methods: {
    getMssList() {
      const data = {
        mssType: this.mssType,
        page: this.pageIndex,
        num: 6
      }
      return this.$api.business.getMssList(data)
    },
    selectMssObj(obj) {
      if (obj !== null && obj.transcoding !== 0) {
        this.selectedMssObj = JSON.parse(JSON.stringify(obj))
        this.$emit('setMssObj', this.selectedMssObj)
      } else if (obj !== null && this.mssType === 2) {
        // 云制作不判断 transcoding
        this.selectedMssObj = JSON.parse(JSON.stringify(obj))
        this.$emit('setMssObj', this.selectedMssObj)
      } else if (obj !== null && this.mssType === 4 && obj.transcoding === 0) {
        this.$message({
          type: 'warning',
          message: this.$t('message.model.tips.transcoding')
        })
      } else {
        this.$message({
          type: 'error',
          message: this.$t('message.model.tips.notAllowedMss')
        })
      }
    },
    hover(id) {
      console.log(id)
      this.infoActivedId = id
    },
    notHover(id) {
      this.infoActivedId = ''
    },
    sizeFormat(size) {
      const obj = JSON.parse(size)
      return Math.round(Number(obj.size) / (1024 * 1024))
    },
    dateFormat(unixDate) {
      const date = new Date(unixDate * 1000)
      return (
        date.getFullYear() +
        '/' +
        Number(date.getMonth() + 1) +
        '/' +
        date.getDate() +
        ' ' +
        (Array(2).join(0) + date.getHours()).slice(-2) +
        ':' +
        (Array(2).join(0) + date.getMinutes()).slice(-2)
      )
    },
    newGetMssUploadList() {
      this.getMssList().then(res => {
        res.data.data.list.forEach(item => {
          this.mssArray.push(item)
        })
        this.loading = false
        this.pageIndex++
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
