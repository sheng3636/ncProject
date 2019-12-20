<template>
  <div class="pageBody">
    <div class="mainWrap">
      <!-- 侧边侧栏 -->
      <div class="mainLeft">
        <div class="itemArea environmental">
          <span class="title">环保检测</span>
          <span class="icon leftTopIcon"></span>
          <span class="icon rightTopIcon"></span>
          <span class="icon leftBottomIcon"></span>
          <span class="icon rightBottomIcon"></span>
          <span class="warningIcon" @click="showJianceModal"></span>
          <div class="yanQiJC">
            <div class="yanQiBg">
              <div class="animateBorder roate"></div>
              <img src="../../assets/images/hone/nc_62.png" />
              <span>烟气监测</span>
            </div>
            <p
              class="txt"
              :class="{'warning':environmentDetectionData.smokeDetection < 60}"
            >{{environmentDetectionData.smokeDetection >= 60 ? '正常' : '异常'}}</p>
          </div>
          <div class="wsJCWrap">
            <div id="wuShuiJC"></div>
            <p
              class="txt"
              :class="{'warning':environmentDetectionData.waterDetection < 60}"
            >{{environmentDetectionData.waterDetection >= 60 ? '正常' : '异常'}}</p>
          </div>
        </div>
        <div class="itemArea storage">
          <span class="title">仓储物料</span>
          <span class="icon leftTopIcon"></span>
          <span class="icon rightTopIcon"></span>
          <span class="icon leftBottomIcon"></span>
          <span class="icon rightBottomIcon"></span>
          <div class="top">
            <div id="storageChart"></div>
            <div class="storageNumWrap">
              <p>1号暂存仓库</p>
              <p class="storeged">
                <span>已存储量</span>0吨
              </p>
              <p class="storeging">
                <span>已存储占比</span>0%
              </p>
            </div>
          </div>
          <div class="bottomBorder"></div>
          <ul class="storageInfo">
            <li>总仓储能力</li>
            <li>
              <span class="color">1000</span>吨
            </li>
            <li>
              <span class="color">1481.2</span>m³
            </li>
          </ul>
        </div>
        <div class="itemArea storage">
          <span class="title">填埋库容</span>
          <span class="icon leftTopIcon"></span>
          <span class="icon rightTopIcon"></span>
          <span class="icon leftBottomIcon"></span>
          <span class="icon rightBottomIcon"></span>
          <div class="top">
            <div id="landfill"></div>
            <div class="storageNumWrap">
              <p class="storeged">
                <span>已填埋</span>0吨，占比0%
              </p>
              <p class="storeging">
                <span>剩余填埋</span>27342m
                <sup>3</sup>，占比100%
              </p>
            </div>
          </div>
          <div class="bottomBorder"></div>
          <ul class="storageInfo">
            <li>填埋库参数</li>
            <li>
              <span class="color">1953</span>m
              <sup>3</sup>
            </li>
            <li>
              <span class="color">27342</span>m
              <sup>3</sup>
            </li>
          </ul>
        </div>
      </div>
      <!-- 中间地图 -->
      <div class="mapMemo">
        <ul class="leftMemo">
          <li>
            <img src="../../assets/images/common/wujiaoxing.png" />南充人名政府
          </li>
          <li>
            <img src="../../assets/images/common/nc_67.png" />南充嘉源环保科技有限责任公司
          </li>
        </ul>
        <ul class="rightTab">
          <li @click="showMap(0)" :class="{'active':mapType}">四川</li>
          <li @click="showMap(1)" :class="{'active':!mapType}">南充</li>
        </ul>
      </div>
      <div class="map" id="map">
        <!-- <img class="mapBlue" src="../../assets/images/common/mapBlue.png">
        <img class="mapRed" src="../../assets/images/common/mapRed.png">
        <img class="mapYellow" src="../../assets/images/common/mapYellow.png">
        <img class="mapGreen" src="../../assets/images/common/mapGreen.png">
        <div class="labelDiv labelDivYellow" @click="showCompanyInfo">
          <div class="txt">四川省中明环境治理有限公司</div>
        </div>
        <div class="labelDiv labelDivBlue" @click="showCompanyInfo">
          <div class="txt">成都兴蓉环保科技有限公司</div>
        </div>
        <div class="labelDiv labelDivRed" @click="showCompanyInfo">
          <div class="txt">南充嘉源环保科技有限责任公司</div>
        </div>
        <div class="labelDiv labelDivGreen" @click="showCompanyInfo">
          <div class="txt">中节能(攀枝花)清洁技术发展有限公司</div>
        </div>-->
      </div>
      <!-- <div class="ncMap" v-if="!mapType">
        <div class="inner">
          <img src="../../assets/images/common/wujiaoxing.png" class="gevo" />
          <img src="../../assets/images/common/mapBlue.png" class="location" />
          <img src="../../assets/images/common/nc_68.gif" class="gif" />
        </div>
      </div>-->
      <!-- 右边侧栏 -->
      <div class="mainRight">
        <div class="itemArea environmental">
          <span class="title">EHS评估</span>
          <span class="icon leftTopIcon"></span>
          <span class="icon rightTopIcon"></span>
          <span class="icon leftBottomIcon"></span>
          <span class="icon rightBottomIcon"></span>
          <ul class="EHSWrap">
            <li>
              <div class="liLeft">
                <p class="en">Environment</p>
                <p class="zh">环境</p>
              </div>
              <div class="liRight">
                <img src="../../assets/images/hone/ehsAnimate.png" class="animateBorder" />
                <span>优</span>
                <p>工厂保障全体员工的身体健康，保障无任何安全事故，并致力完善环境保护。</p>
              </div>
            </li>
            <li>
              <div class="liLeft">
                <p class="en health">Health</p>
                <p class="zh">健康</p>
              </div>
              <div class="liRight">
                <img src="../../assets/images/hone/ehsAnimate.png" class="animateBorder" />
                <span>优</span>
                <p>安全第一，预防为主；全员参与，综合治理，改善环境</p>
              </div>
            </li>
            <li>
              <div class="liLeft">
                <p class="en saftey">Safety</p>
                <p class="zh">安全</p>
              </div>
              <div class="liRight">
                <img src="../../assets/images/hone/ehsAnimate.png" class="animateBorder" />
                <span>优</span>
                <p>无事故、无人身伤害、无环境破坏</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="itemArea safety">
          <span class="title">安全生产</span>
          <span class="icon leftTopIcon"></span>
          <span class="icon rightTopIcon"></span>
          <span class="icon leftBottomIcon"></span>
          <span class="icon rightBottomIcon"></span>
          <p class="safetyTitle">安全生产天数</p>
          <p class="safetyDays">
            0
            <span>天</span>
          </p>
          <p class="safetyMemo">
            <span>
              安全第一
              <span>预防为主</span>
            </span>
          </p>
        </div>
        <div class="itemArea report">
          <span class="title">运营日报</span>
          <span class="icon leftTopIcon"></span>
          <span class="icon rightTopIcon"></span>
          <span class="icon leftBottomIcon"></span>
          <span class="icon rightBottomIcon"></span>
          <div id="operate"></div>
        </div>
      </div>
    </div>
    <!-- 环保监测预警记录 -->
    <div class="jianceModal" v-if="iisJianceModal">
      <div class="inner">
        <span class="icon leftTopIcon"></span>
        <span class="icon rightTopIcon"></span>
        <span class="icon leftBottomIcon"></span>
        <span class="icon rightBottomIcon"></span>
        <span class="colse" @click="showJianceModal">x</span>
        <p class="yuJingTitle">环保监测预警记录</p>
        <p class="noData">无预警数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import { report, environmentDetection, technologyDetail } from '../../api/api'
import echarts from 'echarts'
import 'echarts-gl'
import mapFn from '@/config/map.js'
// let map = null
// let pathSimplifierIns = null
export default {
  data() {
    return {
      environmentDetectionData: {}, // 环保检测数据
      iisJianceModal: false, // 控制环保监测预警记录弹窗
      isCompanyModal: false, // 控制公司详情弹窗
      mapType: true // 控制地图类型
    }
  },
  mounted() {
    mapFn.creatMap(7,[102.978717, 29.847036])
    mapFn.creatLevel('province', '四川')
    this.storageChart()
    this.landfill()
    this.getReportFun()
    this.getEnvironmentDetectionFun()
    this.getCompanyTechnologyFun()
  },
  methods: {
    // 污水监测水球
    drawChart(data) {
      let waveColor = data.waterDetection >= 60 ? '#00a9f0' : '#ffc600'
      let chart = this.$echarts.init(document.getElementById('wuShuiJC'))
      chart.setOption({
        title: {
          text: '污水监测',
          top: 'center',
          left: 'center',
          textStyle: {
            fontSize: 18,
            color: '#fff'
          }
        },
        tooltip: {
          show: false,
          trigger: 'item',
          textStyle: {
            color: '#fff'
          },
          // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
          // 水球图: {a}（系列名称），{b}（无），{c}（数值）
          // 使用函数模板   传入的数据值 -> value: number|Array,
          formatter: function(value) {
            return value.seriesName + ': ' + value.data * 100 + '%'
          }
        },
        series: [
          {
            type: 'liquidFill',
            name: '污水监测',
            radius: '83%', // 水球图的半径
            center: ['50%', '50%'],
            // 水填充图的形状 circle 默认圆形  rect 圆角矩形  triangle 三角形
            // diamond 菱形  pin 水滴状 arrow 箭头状  还可以是svg的path
            shape: 'circle',
            phase: 3, // 波的相位弧度 不设置  默认自动
            direction: 'right', // 波浪移动的速度  两个参数  left 从右往左 right 从左往右
            // 边框线
            outline: {
              show: true,
              borderDistance: 0,
              itemStyle: {
                opacity: 1,
                borderWidth: 1,
                shadowBlur: 2,
                shadowColor: '#fff',
                borderColor: '#41dcd8'
              }
            },
            // 图形样式
            itemStyle: {
              color: waveColor,
              opacity: 0.5,
              shadowBlur: 10
            },
            // 水球未到的背景颜色
            backgroundStyle: {
              color: '#0e4058'
            },
            // 图形的高亮样式
            emphasis: {
              itemStyle: {
                opacity: 0.8
              }
            },
            // 图形上的文本标签
            label: {
              show: false,
              fontSize: 55,
              fontWeight: 400,
              color: '#fff'
            },
            // 系列中的数据内容数组
            data: [data.waterDetection / 100]
          }
        ]
      })
    },
    // 仓储物料饼图
    storageChart() {
      let chart = this.$echarts.init(document.getElementById('storageChart'))
      let option = {
        title: {
          text: '0%',
          x: '45%',
          y: '60%',
          textStyle: {
            color: '#e7f245',
            fontSize: 24,
            lineHeight: 0
          }
        },
        series: [
          {
            name: '总储存量',
            type: 'pie',
            hoverAnimation: false, // 鼠标移入变大
            center: ['55%', '60%'],
            radius: ['60%', '70%'],
            avoidLabelOverlap: false,
            color: ['#e7f245', '#5ec1e5'],
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '12'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 0, name: '存储占比' },
              { value: 1000, name: '依存储量' }
            ]
          },
          {
            name: '外边框',
            type: 'pie',
            clockWise: false, // 顺时加载
            hoverAnimation: false, // 鼠标移入变大
            center: ['55%', '60%'],
            radius: ['78%', '78%'],
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 9,
                name: '',
                itemStyle: {
                  normal: {
                    borderWidth: 1,
                    borderType: 'dashed',
                    borderColor: '#3a5673'
                  }
                }
              }
            ]
          }
        ]
      }
      chart.setOption(option)
    },
    // 填埋库容
    landfill() {
      let myChart = this.$echarts.init(document.getElementById('landfill'))
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
    // 运营日报图表
    operateChart(data) {
      let myChart = this.$echarts.init(document.getElementById('operate'))
      let option = {
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          icon: 'rect',
          itemWidth: 40,
          itemHeight: 2,
          itemGap: 13,
          data: ['接收', '处置'],
          right: '4%',
          top: '3%',
          textStyle: {
            fontSize: 12,
            color: '#fff'
          }
        },
        grid: {
          left: '5%',
          right: '10%',
          bottom: '8%',
          top: '15%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            name: '日期',
            boundaryGap: true,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#4f7399'
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                fontSize: 12,
                color: '#fff'
              }
            },
            data: data.revise.xAxis
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '吨',
            axisTick: {
              show: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#4f7399'
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                fontSize: 12,
                color: '#fff'
              }
            },
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: '#4f7399'
              }
            }
          }
        ],
        series: [
          {
            name: '接收',
            type: 'line',
            smooth: false,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              normal: {
                width: 3
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: '#d7df5b'
                  },
                  {
                    offset: 1,
                    color: '#d7df5b'
                  }
                ])
              }
            },
            data: data.revise.yAxis
          },
          {
            name: '处置',
            type: 'line',
            smooth: false,
            symbol: 'circle',
            symbolSize: 5,
            lineStyle: {
              normal: {
                width: 3
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: '#00ccff'
                  },
                  {
                    offset: 1,
                    color: '#00ccff'
                  }
                ])
              }
            },
            data: data.dispose.yAxis
          }
        ]
      }
      myChart.setOption(option)
    },
    // 获取运营报表数据
    getReportFun() {
      report().then(res => {
        this.operateChart(res.data)
      })
    },
    // 获取环保检测数据
    getEnvironmentDetectionFun() {
      environmentDetection().then(res => {
        this.environmentDetectionData = res.data
        this.drawChart(res.data)
      })
    },
    // 环保监测预警记录弹窗
    showJianceModal() {
      this.iisJianceModal = !this.iisJianceModal
    },
    // 打开公司详情弹窗
    showCompanyInfo() {
      this.isCompanyModal = true
    },
    // 开关地图类型
    showMap(type) {
      if (type === 0) {
        this.mapType = true
        mapFn.creatLevel('province', '四川')
      } else {
        this.mapType = false
        mapFn.creatLevel('city', '南充')
        mapFn.creatDivergency()
        mapFn.createdGovernmentLocation({lng:'106.110222', lat:'30.836719'})
      }
    },

    // 获取地图公司工艺详情
    getCompanyTechnologyFun() {
      technologyDetail().then(res => {
        console.log(res.data)
        mapFn.createdVillage(res.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/home.scss';
</style>
