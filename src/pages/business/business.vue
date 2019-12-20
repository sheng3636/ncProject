<template>
  <div class="pageBody">
    <div class="mainWrap businessWrap">
      <p class="title">
        共计接收危废企业
        <span>50</span>家
      </p>
      <div id="siChuanMap"></div>
      <div class="echartsWrap">
        <div id="businessArea"></div>
        <div id="businessArea1"></div>
        <div id="businessArea2"></div>
      </div>
    </div>
  </div>
</template>
<script>
import geoJson from '../../../static/js/datas.json'
import echarts from 'echarts'
import 'echarts-gl'
export default {
  data() {
    return {
      geoJson: geoJson,
      businessAreaData: {
        first: {
          title: '城市TOP10',
          yAxis: [
            '攀枝花',
            '南充',
            '甘孜',
            '巴中',
            '达州',
            '广元',
            '广安',
            '遂宁',
            '成都',
            '阿坝'
          ],
          xAxis: [523, 520, 485, 470, 439, 430, 426, 400, 319, 318]
        },
        second: {
          title: '城市TOP10',
          yAxis: [
            '南充',
            '攀枝花',
            '阿坝',
            '广安',
            '达州',
            '广元',
            '巴中',
            '遂宁',
            '成都',
            '甘孜'
          ],
          xAxis: [19, 17, 14, 13, 11, 10, 9, 7, 5, 3]
        },
        third: {
          title: '每类数量',
          yAxis: ['HYTT0', 'HYV17', 'HNL89', 'HDB45', 'HZW12', 'HZW11'],
          xAxis: [445, 897, 232, 47, 232, 988]
        }
      }
    }
  },
  mounted() {
    this.businessArea('businessArea', this.businessAreaData.first)
    this.businessArea('businessArea1', this.businessAreaData.second)
    this.businessArea('businessArea2', this.businessAreaData.third)
    this.siChuanMap(geoJson)
    
  },
  methods: {
    // 四川省份地图
    siChuanMap(dataJson) {
      let myChart = this.$echarts.init(document.getElementById('siChuanMap'))
      myChart.showLoading()
      echarts.registerMap('sichuan', dataJson)
      myChart.hideLoading()
      let geoCoordMap = {
        甘孜: [101.015879, 30.039272],
        阿坝: [102.229691, 31.907474],
        广元: [105.856168, 32.442592],
        巴中: [106.758481, 31.87338],
        绵阳: [104.687285, 31.475141],
        南充: [106.119229, 30.845767],
        达州: [107.45217, 31.216778],
        广安: [106.647028, 30.48117],
        遂宁: [105.606323, 30.540092],
        德阳: [104.395218, 31.133116],
        成都: [104.082105, 30.656817],
        资阳: [104.636162, 30.136455],
        眉山: [103.857142, 30.085027],
        内江: [105.045619, 29.611512],
        雅安: [102.64494, 30.017793],
        宜宾: [104.658027, 28.759527],
        泸州: [105.446801, 28.878174],
        凉山: [102.2873, 27.888263],
        乐山: [103.780589, 29.555929],
        攀枝花: [101.71807, 26.588034]
      }
      let data = [
        {
          name: '甘孜',
          value: 199
        },
        {
          name: '阿坝',
          value: 39
        },
        {
          name: '广元',
          value: 152
        },
        {
          name: '巴中',
          value: 299
        },
        {
          name: '绵阳',
          value: 39
        },
        {
          name: '达州',
          value: 39
        },
        {
          name: '南充',
          value: 39
        },
        {
          name: '广安',
          value: 39
        },
        {
          name: '遂宁',
          value: 39
        },
        {
          name: '成都',
          value: 39
        },
        {
          name: '德阳',
          value: 39
        },
        {
          name: '眉山',
          value: 39
        },
        {
          name: '内江',
          value: 39
        },
        {
          name: '资阳',
          value: 39
        },
        {
          name: '雅安',
          value: 39
        },
        {
          name: '宜宾',
          value: 39
        },
        {
          name: '泸州',
          value: 39
        },
        {
          name: '凉山',
          value: 39
        },
        {
          name: '攀枝花',
          value: 39
        },
        {
          name: '乐山',
          value: 40
        }
      ]

      let convertData = function(sourse) {
        let res = []
        for (let i = 0; i < sourse.length; i++) {
          let geoCoord = geoCoordMap[sourse[i].name]
          if (geoCoord) {
            res.push({
              name: sourse[i].name,
              value: geoCoord.concat(sourse[i].value)
            })
          }
        }
        return res
      }

      let option = {
        tooltip: {
          show: false
        },
        geo: {
          show: true,
          map: 'sichuan',
          zoom: 1.2,
          roam: true,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#0d3145', // 地图背景颜色
              borderColor: '#0ff' // 地图边界颜色
            },
            emphasis: {
              show: false,
              areaColor: '#0d3145', // 鼠标经过地图背景颜色
              color: '#ddd'
            }
          }
        },
        series: [
          {
            name: 'credit_pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: 5,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#fff'
              }
            }
          },
          {
            type: 'map',
            map: 'sichuan',
            geoIndex: 0,
            aspectScale: 3, // 长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#031525',
                borderColor: '#3B5077'
              },
              emphasis: {
                areaColor: '#2B91B7'
              }
            },
            animation: false,
            data: data
          },
          {
            // 水滴
            name: '点',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbol: 'pin',
            symbolSize: [50, 50],
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 9
                },
                formatter(value) {
                  return value.data.value[2]
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#D8BC37' // 标志颜色
              }
            },
            zlevel: 6,
            data: convertData(data)
          }
        ]
      }
      myChart.setOption(option)
    },
    // 右侧柱形图
    businessArea(id, data) {
      let myChart = this.$echarts.init(document.getElementById(id))
      let option = {
        // title: {
        //     text:data.title,
        //     right: 'center',
        //     textStyle: {
        //         color: '#fff',
        //         fontSize: '14'
        //     }
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          right: '13%',
          bottom: '8%',
          top: '10%',
          left: '5%'
        },
        legend: {
          show: false,
          right: '30',
          data: ['检查次数', '违法违规数']
        },
        yAxis: [
          {
            axisLabel: {
              color: 'rgba(255,255,255,0.6)',
              fontSize: 12
            },
            inverse: true,
            position: 'right',
            data: data.yAxis,
            type: 'category'
          }
        ],

        xAxis: [
          {
            show: true,
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: 'rgba(255,255,255,0.6)',
                fontSize: '12'
              }
            },
            type: 'value',
            inverse: true,
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.3)'
              }
            }
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            itemStyle: {
              normal: {
                barBorderRadius: 20,
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: 'rgba(75,227,221,0)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(46,113,255,1)'
                  }
                ])
              }
            },
            barWidth: '5',
            label: {
              normal: {
                show: true,
                position: 'left',
                textStyle: {
                  color: '#ddd'
                }
              }
            },
            data: data.xAxis
          }
        ]
      }

      myChart.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/business.scss';
</style>