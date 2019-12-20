<template>
  <div class="pageHtml">
    <head-top></head-top>
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
import headTop from '@/components/header/header'
export default {
  components: {
    headTop
  }
}
</script>

<style lang="scss">
@import "./assets/style/common.scss";
</style>
