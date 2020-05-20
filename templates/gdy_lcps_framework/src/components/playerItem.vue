<!--
 * @Author: Whzcorcd
 * @Date: 2019-12-23 17:36:38
 * @LastEditors: Wzhcorcd
 * @LastEditTime: 2020-05-17 22:52:36
 * @Description: file content
-->
<template>
  <div class="player-item"></div>
</template>

<script>
export default {
  name: 'playerItem',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.player-item {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;

  .player-item-title {
    position: absolute;
    left: 20px;
    bottom: 10px;
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    background: $theme-color;
    border: none;
    border-radius: 30px;

    span {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
