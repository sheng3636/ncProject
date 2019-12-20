<template>
  <div class="pageBody">
    <div class="mainWrap">
    <div class="leftSider">
      <h3 class="weatherTitle">企业安全生产环境监测</h3>
      <ul class="weatherWrap">
        <li>
          <img :src="weatherImg">
        </li>
        <li>
          <p class="temperature">{{weatherInfoData.weather_data[0].temperature}}</p>
          <p>{{weatherInfoData.weather_data[0].weather}}</p>
        </li>
        <li>
          <p class="temperature">{{weatherInfoData.pm25}}</p>
          <p>PM2.5</p>
        </li>
      </ul>
      <div class="itemArea EHS">
        <span class="title">ESH评估</span>
        <span class="icon leftTopIcon"></span>
        <span class="icon rightTopIcon"></span>
        <span class="icon leftBottomIcon"></span>
        <span class="icon rightBottomIcon"></span>
        <ul class="pingGuWrap">
          <li>职业病危害评估</li>
          <li>饮用水质量评估</li>
          <li>空气质量评估</li>
          <li>噪声检测评估</li>
        </ul>
      </div>
      <div class="itemArea zhengShuWrap">
        <span class="title">企业安全标准化证书</span>
        <span class="icon leftTopIcon"></span>
        <span class="icon rightTopIcon"></span>
        <span class="icon leftBottomIcon"></span>
        <span class="icon rightBottomIcon"></span>
        <ul class="imgWrap">
          <li>
            <img src="../../assets/images/EHS/zhengShu.png">
            <p>企业安全标准化证书  </p>
          </li>
          <li>
            <img src="../../assets/images/EHS/zhengShu.png">
            <p>xxxxxx证书  </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="centerWrap">
      <h3 class="bzhTitle">“4321”企业安全标准化</h3>
      <ul class="bzhWrap">
        <li><span>4全</span> 全天候、全过程、全方位、全员参与</li>
        <li><span>3S</span>Safety安全、Security安保、Sability安定</li>
        <li><span>2E</span>Emergency应急、Environment环境</li>
        <li><span>1H</span>Health职业健康</li>
      </ul>
      <div class="itemArea goInWrap">
        <span class="title">入场须知</span>
        <span class="icon leftTopIcon"></span>
        <span class="icon rightTopIcon"></span>
        <span class="icon leftBottomIcon"></span>
        <span class="icon rightBottomIcon"></span>
        <ul class="xuZhilist">
          <li>1、公司厂区内严禁烟火，严禁私自携带易燃易爆物品进入厂区。</li>
          <li>2、不准穿拖鞋、打赤膊、进入作业场所。</li>
          <li>3、严禁随意开启和动用各种机械设备。</li>
          <li>3、严禁随意开启和动用各种机械设备。</li>
          <li>5、严禁酒后进入作业场所。</li>
          <li>6、严禁酒后进入作业场所。</li>
          <li>7、进入生产区请戴上劳动防护防用品</li>
          <li>8、进入生产区请戴上劳动防护防用品</li>
        </ul>
      </div>
    </div>
    <div class="rightSider">
      <h3 class="WorkDay">安全施工天数</h3>
      <p class="daysCount">第<span>0</span>天</p>
      <div class="itemArea sign">
        <span class="title">安全生产目标</span>
        <span class="icon leftTopIcon"></span>
        <span class="icon rightTopIcon"></span>
        <span class="icon leftBottomIcon"></span>
        <span class="icon rightBottomIcon"></span>
        <ul class="signItem">
          <li>
            <span>重伤以上及死亡事故</span>
            <span>0</span>
          </li>
          <li>
            <span>突发事故 </span>
            <span>0</span>
          </li>
          <li>
            <span>半责以上道路交通事故</span>
            <span>0</span>
          </li>
          <li>
            <span>环保期限整改、处罚单</span>
            <span>0</span>
          </li>
          <li>
            <span>急性职业健康事故</span>
            <span>0</span>
          </li>
        </ul>
      </div>
      <div class="itemArea warning">
        <span class="title">安全警示</span>
        <span class="icon leftTopIcon"></span>
        <span class="icon rightTopIcon"></span>
        <span class="icon leftBottomIcon"></span>
        <span class="icon rightBottomIcon"></span>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import { weatherInfo } from '../../api/api';
export default {
  data() {
    return {
      weatherInfoData:{},
      weatherImg:''
    }
  },
  mounted(){
    this.getWeatherInfoFun()
  },
  methods:{
    // 获取环保检测数据
    getWeatherInfoFun(){
      weatherInfo().then(res => {
        this.weatherInfoData = res.results[0]
        let img = res.results[0].weather_data[0].weather
        if (img.indexOf('雨') !== -1){
          this.weatherImg = '../../../static/images/weather/rain.png'
        } else if (img.indexOf('云') !== -1){
          this.weatherImg = '../../../static/images/weather/cloudy.png'
        } else if (img.indexOf('雪') !== -1){
          this.weatherImg = '../../../static/images/weather/snow.png'
        } else if (img.indexOf('阴') !== -1){
          this.weatherImg = '../../../static/images/weather/overcast.png'
        } else {
          this.weatherImg = '../../../static/images/weather/fine_day.png'
        }
      })
    }
  }
}
</script><style lang="scss" scoped>
@import '../../assets/style/EHS.scss';
</style>