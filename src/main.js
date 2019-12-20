// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import echarts from 'echarts'
import 'echarts-liquidfill'
// import VueAMap from 'vue-amap'
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
