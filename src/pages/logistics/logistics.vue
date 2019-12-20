<template>
  <div class="pageBody">
    <div class="logisticsWrap">
      <div id="map"></div>
      <div class="leftSide">
        <span class="title">物流车辆信息</span>
        <span class="icon leftTopIcon"></span>
        <span class="icon rightTopIcon"></span>
        <span class="icon leftBottomIcon"></span>
        <span class="icon rightBottomIcon"></span>
        <div class="carCount">
          <div class="topRota">
            <div class="animateBorder roate"></div>
            <img src="../../assets/images/logistics/carImg.png" />
          </div>
          <div class="topCount">
            <span>物流车辆</span>
            <span>15辆</span>
          </div>
        </div>
        <ul class="carDetail">
          <li>
            <p>
              <span>4</span> 辆
            </p>
            <p>厂区内</p>
          </li>
          <li></li>
          <li>
            <p>
              <span>1</span> 辆
            </p>
            <p>运输中</p>
          </li>
        </ul>
        <ul class="carWrap scroll">
          <li class="carItem">
            <p class="carNum">川R U7251</p>
            <p class="carInfo">运输单位</p>
            <p class="carInfo">厂家名称</p>
            <p class="carInfo">危废种类</p>
            <p class="carInfo">省危废系统联单号</p>
            <span class="carLocation">定位车辆</span>
          </li>
          <li class="carItem">
            <p class="carNum">川R U7251</p>
            <p class="carInfo">运输单位</p>
            <p class="carInfo">厂家名称</p>
            <p class="carInfo">危废种类</p>
            <p class="carInfo">省危废系统联单号</p>
            <span class="carLocation">定位车辆</span>
          </li>
          <li class="carItem">
            <p class="carNum">川R U7251</p>
            <p class="carInfo">运输单位</p>
            <p class="carInfo">厂家名称</p>
            <p class="carInfo">危废种类</p>
            <p class="carInfo">省危废系统联单号</p>
            <span class="carLocation">定位车辆</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import mapFn from '@/config/map.js'
export default {
  data() {
    return {
      map: null
    }
  },
  mounted() {
    mapFn.creatMap(13,[106.044579, 30.738201])
    mapFn.creatCarPath()
  },
  methods: {
    //
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/logistics.scss';
</style>