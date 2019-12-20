<template>
  <div class="pageBody">
    <ul class="EHSTab">
      <li
        :class="{'active':checked == index}"
        v-for="(item,index) in EHSTabData"
        :key="index"
        @click="EHSTab(index)"
      >{{item}}</li>
    </ul>
    <div class="mainWrap">
      <div class="itemArea fenShao" v-show="checked == 0">
        <span class="title">焚烧</span>
        <span class="icon leftTopIcon"></span>
        <span class="icon rightTopIcon"></span>
        <span class="icon leftBottomIcon"></span>
        <span class="icon rightBottomIcon"></span>
        <img class="technologyBg" src="../../assets/images/technology/fenshaoBanner.png" />
      </div>
      <div class="itemArea guHua" v-show="checked == 1">
        <span class="title">稳定固化</span>
        <span class="icon leftTopIcon"></span>
        <span class="icon rightTopIcon"></span>
        <span class="icon leftBottomIcon"></span>
        <span class="icon rightBottomIcon"></span>
        <img class="technologyBg" src="../../assets/images/technology/guHua.png" />
      </div>
      <div class="tianMai" v-show="checked == 2">
        <div class="tianMaiArea itemArea" @click="showTianMaiModai">
          <span class="title">仓库实时动态信息</span>
          <span class="icon leftTopIcon"></span>
          <span class="icon rightTopIcon"></span>
          <span class="icon leftBottomIcon"></span>
          <span class="icon rightBottomIcon"></span>
          <div class="imgWrap">
            <h3 class="kuTitle">
              <img src="../../assets/images/overview/buildingIcon1.png" /> 1号填埋库
            </h3>
            <ul class="tianMaiClass">
              <li>飞灰</li>
              <li>冶炼残渣</li>
              <li>盐类及其他</li>
            </ul>
          </div>
          <div class="countWrap">
            <div class="tianMaiCount">
              <p>已填埋</p>
              <p>
                <b>0</b>m
                <sup>3</sup>
              </p>
            </div>
            <div class="tianMaiCount">
              <p>剩余库容</p>
              <p>
                <b>37342</b>m
                <sup>3</sup>
              </p>
            </div>
            <div class="specification">
              <p>规格</p>
              <div class="specificationCount">
                <span class="fl">长</span>
                <span class="fr">
                  <b>49.5</b>m
                </span>
              </div>
              <div class="specificationCount">
                <span class="fl">宽</span>
                <span class="fr">
                  <b>39.5</b>m
                </span>
              </div>
              <div class="specificationCount">
                <span class="fl">高</span>
                <span class="fr">
                  <b>14.5</b>m
                </span>
              </div>
            </div>
            <div class="tianMaiCount">
              <p>有效库容</p>
              <p>
                <b>27342</b>m
                <sup>3</sup>
              </p>
            </div>
          </div>
          <div class="tianMaiModal itemArea" v-show="isTianMaiModai">
            <span class="icon leftTopIcon"></span>
            <span class="icon rightTopIcon"></span>
            <span class="icon leftBottomIcon"></span>
            <span class="icon rightBottomIcon"></span>
            <span class="closeTianMai" @click.stop="hideTianMaiModai">x</span>
            <div class="modalLeft">
              <h3 class="kuTitle">
                <img src="../../assets/images/overview/buildingIcon1.png" /> 1号填埋库
              </h3>
              <div id="tianMaiChart"></div>
              <div class="tianMaiRow">加载模拟数据</div>
              <div class="tianMaiRow tianMaiRow1">
                已填埋0m
                <sup>3</sup>，占比0%
              </div>
              <div class="tianMaiRow tianMaiRow2">
                剩余可填埋27342m
                <sup>3</sup>，占比100%
              </div>
            </div>
            <div class="modalRight">
              <div class="tianMaiItem tianMaiDetail">
                <h3>填埋库信息</h3>
                <p class="gradientRow"></p>
                <ul class="tianMaiUl">
                  <li>
                    <span>长</span>
                    <span>49.5m</span>
                  </li>
                  <li>
                    <span>宽</span>
                    <span>39.5m</span>
                  </li>
                  <li>
                    <span>已填埋</span>
                    <span>
                      0m
                      <sup>3</sup>
                    </span>
                  </li>
                  <li>
                    <span>剩余库容</span>
                    <span>
                      27342m
                      <sup>3</sup>
                    </span>
                  </li>
                </ul>
              </div>
              <div class="tianMaiItem tianMaiImpermeable">
                <h3>填埋库防渗结构</h3>
                <p class="gradientRow"></p>
                <ul class="imperrmeableUl">
                  <li>
                    <span class="progress"></span>
                    <span class="txt">200mg/㎡ 有纺土工布</span>
                  </li>
                  <li>
                    <span class="progress"></span>
                    <span class="txt txt1">双层HDPE 排水板</span>
                  </li>
                  <li>
                    <span class="progress"></span>
                    <span class="txt txt2">600mg/㎡ 无纺土工布</span>
                  </li>
                  <li>
                    <span class="progress"></span>
                    <span class="txt txt3">2mm光面 HDPE土工膜</span>
                  </li>
                  <li>
                    <span class="progress"></span>
                    <span class="txt txt4">4800g/㎡ GCL</span>
                  </li>
                  <li>
                    <span class="progress"></span>
                    <span class="txt txt5">200mg/㎡ 有纺土工布</span>
                  </li>
                  <li>
                    <span class="progress"></span>
                    <span class="txt txt6">600mg/㎡ 无纺土工布</span>
                  </li>
                  <li>
                    <span class="progress"></span>
                    <span class="txt txt7">混凝土池底</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="statisticArea itemArea">
          <span class="title">填埋总量统计</span>
          <span class="icon leftTopIcon"></span>
          <span class="icon rightTopIcon"></span>
          <span class="icon leftBottomIcon"></span>
          <span class="icon rightBottomIcon"></span>
          <div class="countLine">
            <span>填埋库数量</span>
            <span>
              <b>4</b>个
            </span>
          </div>
          <div class="countLine">
            <span>总面积</span>
            <span>
              <b>7812</b>m
              <sup>2</sup>
            </span>
          </div>
          <div class="countLine">
            <span>总有效库容</span>
            <span>
              <b>109368</b>m
              <sup>2</sup>
            </span>
          </div>
          <div class="gradientRow"></div>
          <ul class="carDetail">
            <li>
              <p>
                <b>0</b>m
                <sup>3</sup>
              </p>
              <p>月均填埋量</p>
            </li>
            <li></li>
            <li>
              <p>
                <b>0</b>m
                <sup>3</sup>
              </p>
              <p>年均填埋量</p>
            </li>
          </ul>
          <p class="videoTxt">视频监控</p>
          <div class="videoWrap" id="playercontainer"></div>
        </div>
      </div>
      <div class="itemArea wuHua" v-show="checked == 3">
        <span class="title">物化</span>
        <span class="icon leftTopIcon"></span>
        <span class="icon rightTopIcon"></span>
        <span class="icon leftBottomIcon"></span>
        <span class="icon rightBottomIcon"></span>
        <img class="technologyBg" src="../../assets/images/technology/wuHua.png" />
      </div>
      <div class="itemArea feiYou" v-show="checked == 4">
        <span class="title">废油</span>
        <span class="icon leftTopIcon"></span>
        <span class="icon rightTopIcon"></span>
        <span class="icon leftBottomIcon"></span>
        <span class="icon rightBottomIcon"></span>
        <!-- Swiper -->
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="../../assets/images/technology/feiYou1.png" />
            </div>
            <div class="swiper-slide">
              <img src="../../assets/images/technology/feiYou2.png" />
            </div>
            <div class="swiper-slide">
              <img src="../../assets/images/technology/feiYou3.png" />
            </div>
          </div>
          <!-- Add Arrows -->
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'echarts-gl'
export default {
  data() {
    return {
      isTianMaiModai: false, // 是否显示填埋库弹窗
      checked: 0,
      EHSTabData: ['焚烧', '稳定固化', '填埋', '物化', '废油']
    }
  },
  mounted() {
    let swiper = new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      observer: true,
      observeParents: true
    })
    let player = cyberplayer('playercontainer').setup({
      width: 375,
      height: 215,
      flashplayer:'../../../static/js/cyberplayer.flash.swf',
      file: 'rtmp://cyberplayerplay.kaywang.cn/cyberplayer/demo201711-L1', // <—rtmp直播地址
      autostart: true,
      stretching: 'uniform',
      volume: 1,
      controls: true,
      rtmp: {
        reconnecttime: 5, // rtmp直播的重连次数
        bufferlength: 1 // 缓冲多少秒之后开始播放 默认1秒
      },
      ak: '1f5d89a9d972415291bbf9fab314a05c'
    })
    this.tianMaiChart()
  },
  methods: {
    // 填埋库容
    tianMaiChart() {
      let myChart = this.$echarts.init(document.getElementById('tianMaiChart'))
      let hours = ['10', '10', '10', '10']
      let days = ['10', '10', '10', '10']
      let dataBar = [
        [0, 0, 0],
        [0, 1, 0],
        [0, 2, 0],
        [0, 3, 0],
        [1, 0, 0],
        [1, 1, 0],
        [1, 2, 0],
        [1, 3, 0],
        [2, 0, 0],
        [2, 1, 0],
        [2, 2, 0],
        [2, 3, 0],
        [3, 0, 0],
        [3, 1, 0],
        [3, 2, 0],
        [3, 3, 0]
      ]
      let option = {
        visualMap: {
          show: false,
          max: 100,
          inRange: {
            color: [
              '#313695',
              '#4575b4',
              '#74add1',
              '#abd9e9',
              '#e0f3f8',
              '#ffffbf',
              '#fee090',
              '#fdae61',
              '#f46d43',
              '#d73027',
              '#a50026'
            ]
          }
        },
        xAxis3D: {
          type: 'category',
          data: hours,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        yAxis3D: {
          type: 'category',
          data: days,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        zAxis3D: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          }
        },
        grid3D: {
          boxWidth: 100,
          boxDepth: 100,
          viewControl: {
            autoRotate: true
          },
          light: {
            main: {
              intensity: 1.2,
              shadow: true
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        series: [
          {
            type: 'bar3D',
            name: '填埋',
            data: dataBar.map(function(item) {
              return {
                value: [item[1], item[0], item[2]]
              }
            }),
            shading: 'lambert',

            label: {
              textStyle: {
                fontSize: 16,
                borderWidth: 1
              }
            },

            emphasis: {
              label: {
                textStyle: {
                  fontSize: 20,
                  color: '#900'
                }
              },
              itemStyle: {
                color: '#900'
              }
            }
          }
        ]
      }
      myChart.setOption(option)
    },
    // 切换tab
    EHSTab(index) {
      this.checked = index
    },
    showTianMaiModai() {
      this.isTianMaiModai = true
      console.log(this.isTianMaiModai)
    },
    hideTianMaiModai() {
      this.isTianMaiModai = false
      console.log(this.isTianMaiModai)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/technology.scss';
</style>