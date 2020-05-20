<template>
  <div class="control-item">
    <div class="item-window"></div>
    <div class="item-container">
      <slot text="模块内容"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'controlItem'
}
</script>

<style lang="scss" scoped>
.control-item {
  position: relative;
  width: 100%;
  height: 100%;

  .item-window {
    position: absolute;
    top: 22.5%;
    left: 3%;
    width: 46.7%;
    height: 45.7%;
    background: transparent;
  }

  .item-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
  }
}
</style>
