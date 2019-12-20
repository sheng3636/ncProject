<template>
  <div class="pageBody">
    <div class="mainWrap">
      <div class="changQuMap">
        <div class="leftLabel leftLabel" @click="showWuShuiModal">
          <div class="labelContent">
            <img src="../../assets/images/overview/nc_53.png" />
            <span class="txt">污水设备</span>
          </div>
        </div>
        <div class="leftLabel leftLabelYellow leftLabe2" @click="showYanQiModal">
          <div class="labelContent">
            <img src="../../assets/images/overview/nc_54.png" />
            <span class="txt">烟气设备</span>
          </div>
        </div>
      </div>
      <div class="leftSider">
      <!-- 烟气监测数据 -->
        <div class="yanQi itemArea">
          <span class="title">烟气检测</span>
          <span class="icon leftTopIcon"></span>
          <span class="icon rightTopIcon"></span>
          <span class="icon leftBottomIcon"></span>
          <span class="icon rightBottomIcon"></span>
          <ul class="rotateWrap">
            <li>
              <div class="animateBorder roate"></div>
              <div class="innerContent LLImg"></div>
              <p class="count">0Nm³/h</p>
              <p class="unit">流量标准</p>
            </li>
            <li>
              <div class="animateBorder roate"></div>
              <div class="innerContent YCImg"></div>
              <p class="count">0mm³/h</p>
              <p class="unit">烟尘标准 100mg/m³</p>
            </li>
            <li>
              <div class="animateBorder roate"></div>
              <div class="innerContent">
                <span>HCL</span>
                <span>氯化氢</span>
              </div>
              <p class="count">0mm³/h</p>
              <p class="unit">氯化氢标准 100mg/m³</p>
            </li>
            <li>
              <div class="animateBorder roate"></div>
              <div class="innerContent">
                <span>CO</span>
                <span>一氧化碳</span>
              </div>
              <p class="count">0mm³/h</p>
              <p class="unit">一氧化碳氢标准 100mg/m³</p>
            </li>
            <li>
              <div class="animateBorder roate"></div>
              <div class="innerContent">
                <span>
                  SO
                  <sub>2</sub>
                </span>
                <span>二氧化硫</span>
              </div>
              <p class="count">0mm³/h</p>
              <p class="unit">二氧化硫标准 400mg/m³</p>
            </li>
            <li>
              <div class="animateBorder roate"></div>
              <div class="innerContent">
                <span>NO</span>
                <span>氮氧化物</span>
              </div>
              <p class="count">0mm³/h</p>
              <p class="unit">二氧化硫标准 700mg/m³</p>
            </li>
            <li>
              <div class="animateBorder roate"></div>
              <div class="innerContent HSLImg"></div>
              <p class="count">0Nm³/h</p>
              <p class="unit">含水率执行标准</p>
            </li>
            <li class="oChart" id="oChart"></li>
          </ul>
        </div>
        <!-- 污水监测数据 -->
        <div class="wuShui itemArea">
          <span class="title">污水检测</span>
          <span class="icon leftTopIcon"></span>
          <span class="icon rightTopIcon"></span>
          <span class="icon leftBottomIcon"></span>
          <span class="icon rightBottomIcon"></span>
          <div class="chartWrap gTWrap">
            <div id="gtChart"></div>
            <p class="txt">总溶解固体</p>
            <p class="txt">监测标准 1,000 mg/L</p>
          </div>
          <div class="chartWrap aDWrap">
            <div id="adChart"></div>
            <p class="txt">氨氮含量</p>
          </div>
          <div class="chartWrap OWrap">
            <div id="xyChart"></div>
            <p class="txt">化学需氧量</p>
            <p class="txt">监测标准 -500</p>
          </div>
          <div class="chartWrap LLWrap">
            <div id="llChart"></div>
            <p class="txt">流量</p>
          </div>
        </div>
      </div>
      <!-- 烟气监测设备弹窗 -->
      <div class="yanQiModal" v-if="isYanQi">
        <div class="inner">
          <span class="closeBtn" @click="showYanQiModal">x</span>
          <span class="icon leftTopIcon"></span>
          <span class="icon rightTopIcon"></span>
          <span class="icon leftBottomIcon"></span>
          <span class="icon rightBottomIcon"></span>
          <p class="title">烟气监测设备</p>
          <ul class="infoList">
            <li>
              <span>
                <img src="../../assets/images/environmental/nc_07.png" />流量
              </span>
              <span class="count">0Nm³/h</span>
              <span class="normal">正常</span>
            </li>
            <li>
              <span>
                <img src="../../assets/images/environmental/nc_08.png" />流量
              </span>
              <span class="count">0mg/m³</span>
              <span class="normal">正常</span>
            </li>
            <li>
              <span>CO流量</span>
              <span class="count">0mg/m³</span>
              <span class="normal">正常</span>
            </li>
            <li>
              <span>
                SO
                <sub>2</sub>流量
              </span>
              <span class="count">0mg/m³</span>
              <span class="normal">正常</span>
            </li>
            <li>
              <span>HCI流量</span>
              <span class="count">0mg/m³</span>
              <span class="normal">正常</span>
            </li>
            <li>
              <span>
                O
                <sub>2</sub>流量
              </span>
              <span class="count">0mg/m³</span>
              <span class="normal">正常</span>
            </li>
            <li>
              <span>
                <img src="../../assets/images/environmental/nc_73.png" />含水率
              </span>
              <span class="count">0mg/m³</span>
              <span class="normal">正常</span>
            </li>
            <li>
              <span>
                O
                <sub>2</sub>流量
              </span>
              <span class="count">0mg/m³</span>
              <span class="normal">正常</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 污水检测设备弹窗 -->
      <div class="wuShuiModal" v-if="isWuShui">
        <div class="inner">
          <span class="closeBtn" @click="showWuShuiModal">x</span>
          <span class="icon leftTopIcon"></span>
          <span class="icon rightTopIcon"></span>
          <span class="icon leftBottomIcon"></span>
          <span class="icon rightBottomIcon"></span>
          <p class="title">烟气监测设备</p>
          <ul class="infoList">
            <li>
              <span>总溶解固体</span>
              <span class="count">0mg/m³</span>
              <span class="normal">正常</span>
            </li>
            <li>
              <span>氨氮含量</span>
              <span class="count">0mg/m³</span>
              <span class="normal">正常</span>
            </li>
            <li>
              <span>化学需氧量</span>
              <span class="count">0mg/m³</span>
              <span class="normal">正常</span>
            </li>
            <li>
              <span>流量</span>
              <span class="count">0mg/m³</span>
              <span class="normal">正常</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts-gl'
export default {
  data() {
    return {
      isYanQi: false, // 控制烟气监测设备显隐
      isWuShui: false // 控制烟气监测设备显隐
    }
  },
  mounted() {
    this.oChart()
    this.liquidfillChart('gtChart')
    this.liquidfillChart('adChart')
    this.liquidfillChart('xyChart')
    this.liquidfillChart('llChart')
  },
  methods: {
    // 打开关闭污水设备监测弹窗
    showWuShuiModal() {
      this.isWuShui = !this.isWuShui
    },
    // 打开关闭烟气监测弹窗
    showYanQiModal() {
      this.isYanQi = !this.isYanQi
    },
    // 含氧量图表
    oChart() {
      let value = 80
      let charts = echarts.init(document.getElementById('oChart'))
      let option = {
        title: {
          text: `${value}%`,
          subtext: '含氧量',
          left: 'center',
          top: '30%', // top待调整
          textStyle: {
            color: '#52c6f3',
            fontSize: 25
          },
          subtextStyle: {
            color: '#ff',
            fontSize: 15
          },
          itemGap: 5 // 主副标题间距
        },
        series: [
          {
            name: 'pie1',
            type: 'pie',
            clockWise: true,
            radius: ['50px', '55px'],
            center: ['50%', '45%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: value,
                name: '完成',
                itemStyle: {
                  normal: {
                    borderWidth: 5,
                    borderColor: {
                      colorStops: [
                        {
                          offset: 0,
                          color: '#56ccf2' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#2f80ed' // 100% 处的颜色
                        }
                      ]
                    },
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: 'rgba(252, 74, 26, 1)' // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: 'rgba(247, 203, 51, 1)' // 100% 处的颜色
                        }
                      ]
                    },
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: '未完成',
                value: 100 - value,
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    },
                    color: 'rgba(234, 238, 244, 0.2)',
                    borderColor: 'rgba(234, 238, 244, 0.2)',
                    borderWidth: 0
                  }
                }
              }
            ]
          }
        ]
      }
      charts.setOption(option)
    },
    
    // 水球
    liquidfillChart(id) {
      // 基于准备好的dom，初始化echarts实例
      let chart = this.$echarts.init(document.getElementById(id))
      // 绘制图表
      chart.setOption({
        // 图表主标题
        title: {
          text: '0mg/m³',
          top: 'center',
          left: 'center',
          textStyle: {
            // 文本样式
            fontSize: 13,
            color: '#fff'
          }
        },
        series: [
          {
            type: 'liquidFill',
            name: '污水监测',
            radius: '81%', // 水球图的半径
            center: ['50%', '50%'],
            // 水填充图的形状 circle 默认圆形  rect 圆角矩形  triangle 三角形
            // diamond 菱形  pin 水滴状 arrow 箭头状  还可以是svg的path
            shape: 'circle',
            phase: 3, // 波的相位弧度 不设置  默认自动
            direction: 'right', // 波浪移动的速度  两个参数  left 从右往左 right 从左往右
            outline: {
              show: true,
              borderDistance: 0, // 边框线与图表的距离 数字
              itemStyle: {
                opacity: 1, // 边框的透明度   默认为 1
                borderWidth: 1, // 边框的宽度
                shadowBlur: 2, // 边框的阴影范围 一旦设置了内外都有阴影
                shadowColor: '#fff', // 边框的阴影颜色,
                borderColor: '#41dcd8' // 边框颜色
              }
            },
            // 图形样式
            itemStyle: {
              color: '#4077eb', // 水球显示的背景颜色
              opacity: 0.5, // 波浪的透明度
              shadowBlur: 10 // 波浪的阴影范围
            },
            backgroundStyle: {
              color: '#407bf3', // 水球未到的背景颜色
              opacity: 0.5
            },
            // 图形的高亮样式
            emphasis: {
              itemStyle: {
                opacity: 0.8 // 鼠标经过波浪颜色的透明度
              }
            },
            // 图形上的文本标签
            label: {
              show: false,
              fontSize: 55,
              fontWeight: 400,
              color: '#fff'
            },
            data: [0.62] // 系列中的数据内容数组
          }
        ]
      })
    }
  }
}
</script><style lang="scss" scoped>
@import '../../assets/style/environmental.scss';
</style>