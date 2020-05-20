<template>
  <div class="refresh">
    <transition name="slide-fade">
      <div v-if="!network" class="statusBox">
        <span>{{ $t('message.pages.home.Refresh.networkError') }}</span>
        <el-button type="default" size="mini" @click="onRefresh"
          >{{ $t('message.pages.home.Refresh.refresh') }}
        </el-button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Refresh',
  computed: {
    ...mapState(['network', 'userInfo'])
  },
  methods: {
    onRefresh() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'index.scss';
</style>
