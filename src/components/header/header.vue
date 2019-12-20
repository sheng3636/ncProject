<template>
  <div class="header">
    <nav class="navLeft">
      <router-link to="/home">首页</router-link>
      <router-link to="/overview">厂区一览</router-link>
      <router-link to="/business">业务管理</router-link>
      <router-link to="/logistics">物流管理</router-link>
      <router-link to="/#">仓储物料</router-link>
    </nav>
    <nav class="navRight">
      <router-link to="/technology">处置工艺</router-link>
      <router-link to="/EHS">EHS</router-link>
      <router-link to="/environmental">环保数据</router-link>
      <router-link to="/people">人员管理</router-link>
      <router-link to="/end">尾页</router-link>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/style/head.scss';
</style>
