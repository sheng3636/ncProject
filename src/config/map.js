let map = null
let pathSimplifierIns = null
// 创建地图
const creatMap = (zoom,center) => {
  map = new AMap.Map('map', {
    mapStyle: 'amap://styles/blue',
    zoom: zoom,
    center: center,
    pitch: 40,
    rotateEnable: true,
    rotation: 0
  })
  // 地图点击事件
  map.on('click', e => {
    map.clearInfoWindow()
    console.log(`[${e.lnglat.getLng()}, ${e.lnglat.getLat()}]`)
  })
}
// 创建政府点位
const createdGovernmentLocation = (val) => {
  let icon = new AMap.Icon({
    size: new AMap.Size(30, 30), // 图标尺寸
    imageSize: new AMap.Size(30, 30),
    image: require('../assets/images/common/wujiaoxing.png')
  })
  new AMap.Marker({
    position: [val.lng, val.lat],
    icon: icon,
    anchor: 'center',
    map: map
  })
}
// 创建公司点
let villageList = null
const createdVillage = (points) => {
  let markers = []
  points.forEach(val => {
    let locationIcon = ''
    switch (val.companyId) {
      case 1:
        locationIcon = 'mapBlue'
        break
      case 2:
        locationIcon = 'mapYellow'
        break
      case 3:
        locationIcon = 'mapGreen'
        break
      default:
        locationIcon = 'mapRed'
        break
    }
    let _marker = new AMap.Marker({
      position: [val.location[0], val.location[1]],
      content: (`
                <div class="mapCompany">
                    <p class="name">${val.companyName}</p>
                    <img src="${require(`../assets/images/common/${locationIcon}.png`)}"/>
                </div>
            `),
      anchor: 'center',
      aaaa: val
    })
    let infoWindow = new AMap.InfoWindow({
      offset: new AMap.Pixel(230, 30)
    })
    const tmpl = tmplVal => `
        ${tmplVal.map((item,index) => `
          <li><span>${index + 1}、</span>${item}</li>`
        ).join('')}
      `
    let info = (`
            <div class="companyModal">
              <span class="icon leftTopIcon"></span>
              <span class="icon rightTopIcon"></span>
              <span class="icon leftBottomIcon"></span>
              <span class="icon rightBottomIcon"></span>
              <p class="yuJingTitle">${val.companyName}</p>
              <div class="topArea">
                <div class="category">
                  <p class="txt">工艺类别</p>
                  <p class="content">${val.technologyCategory}</p>
                </div>
                <div class="countWrap">
                  <p class="txt">总处置规模</p>
                  <p class="count">
                    <span>${val.disposeScale}</span>吨/每年
                  </p>
                </div>
              </div>
              <p class="title">
                <span>处置类别</span>
                <span>共${val.disposeCategory.length}项</span>
              </p>
              <ul class="categoryWrap scroll">
                  ${tmpl(val.disposeCategory.list)}
              </ul>
            </div>
        `)
    _marker.content = info
    _marker.on('click', e => {
      infoWindow.setContent(e.target.content)
      infoWindow.open(map, e.target.getPosition())
    })
    markers.push(_marker)
  })
  villageList = new AMap.MarkerClusterer(map, markers, {
    gridSize: 80,
    maxZoom: 6,
    zoomOnClick: true,
    renderClusterMarker: context => context.marker.setContent(`<div class="map_yuan">${context.count}</div>`)
  })
}
// 切换行政区域
const creatLevel = (level, location) => {
  if (level === 'province') {
    map.setZoomAndCenter(7, [102.978717, 29.847036])
    // 绘制四川省地图是销毁发散图
    if (pathSimplifierIns != null) {
      pathSimplifierIns.clearPathNavigators()
      pathSimplifierIns.setData([])
    }
  } else {
    map.setZoomAndCenter(9, [106.23417, 31.142314])
  }
  AMap.plugin('AMap.DistrictSearch', function () {
    // 异步加载插件
    const districtSearch = new AMap.DistrictSearch()
    map.addControl(districtSearch)
  })

  let district = null
  let polygons = []
  // 加载行政区划插件
  if (!district) {
    // 实例化DistrictSearch
    let opts = {
      subdistrict: 0, // 获取边界不需要返回下级行政区
      extensions: 'all', // 返回行政区边界坐标组等具体信息
      level: 'district' // 查询行政级别为 市
    }
    district = new AMap.DistrictSearch(opts)
  }
  // 行政区查询
  district.setLevel(level)
  district.search(location, function (status, result) {
    map.clearMap() // 清除上次结果
    polygons = []
    let bounds = result.districtList[0].boundaries
    if (bounds) {
      for (let i = 0, l = bounds.length; i < l; i++) {
        // 生成行政区划polygon
        let polygon = new AMap.Polygon({
          strokeWeight: 1,
          path: bounds[i],
          fillOpacity: 0.4,
          fillColor: '#80d8ff',
          strokeColor: '#0091ea'
        })
        polygons.push(polygon)
      }
    }
    map.add(polygons)
  })
}
const creatDivergency = () => {
  if (pathSimplifierIns != null) {
    pathSimplifierIns.clearPathNavigators()
    pathSimplifierIns.setData([])
  }
  AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (
    PathSimplifier,
    $
  ) {
    pathSimplifierIns = new PathSimplifier({
      zIndex: 100,
      map: map,
      autoSetFitView: false,
      // 返回轨迹数据中的节点坐标信息
      getPath: function (pathData, pathIndex) {
        return pathData.path
      },
      // 返回鼠标悬停时显示的信息
      getHoverTitle: function (pathData, pathIndex, pointIndex) {
        return null
      },
      renderOptions: {
        // 轨迹线的样式
        pathLineStyle: {
          strokeStyle: 'rgba(255,255,255,0.8)',
          lineWidth: 1,
          dirArrowStyle: false
        },
        // 巡航器样式
        pathNavigatorStyle: {
          initRotateDegree: 0,
          width: 10,
          height: 10,
          autoRotate: true,
          lineJoin: 'round',
          content: 'defaultPathNavigator',
          fillStyle: '#fff',
          strokeStyle: '#fff',
          lineWidth: 1,
          pathLinePassedStyle: {
            // 巡航器线条样式
            lineWidth: 2,
            strokeStyle: '#fff',
            borderWidth: 'none',
            borderStyle: '#fff',
            dirArrowStyle: false
          }
        }
      }
    })

    window.pathSimplifierIns = pathSimplifierIns

    // 设置数据
    pathSimplifierIns.setData([{
        name: '嘉陵区-仪陇县',
        path: [
          [106.068974, 30.757481],
          [106.295567, 31.253027]
        ]
      },
      {
        name: '嘉陵区-西充县',
        path: [
          [106.068974, 30.757481],
          [105.901433, 30.973201]
        ]
      },
      {
        name: '嘉陵区-南部县',
        path: [
          [106.068974, 30.757481],
          [105.959432, 31.336638]
        ]
      },
      {
        name: '嘉陵区-阆中市',
        path: [
          [106.068974, 30.757481],
          [106.115987, 31.552216]
        ]
      },
      {
        name: '嘉陵区-顺天区',
        path: [
          [106.068974, 30.757481],
          [106.092664, 30.790519]
        ]
      },
      {
        name: '嘉陵区-高坪区',
        path: [
          [106.068974, 30.757481],
          [106.12013, 30.776656]
        ]
      },
      {
        name: '嘉陵区-蓬安县',
        path: [
          [106.068974, 30.757481],
          [106.396138, 31.015875]
        ]
      },
      {
        name: '嘉陵区-营山县',
        path: [
          [106.068974, 30.757481],
          [106.635091, 31.073528]
        ]
      }
    ])

    // 对第一条线路（即索引 0）创建一个巡航器
    let navg0 = pathSimplifierIns.createPathNavigator(0, {
      loop: true, // 循环播放
      speed: 40000 // 巡航速度，单位千米/小时
    })
    let navg1 = pathSimplifierIns.createPathNavigator(1, {
      loop: true,
      speed: 20000
    })
    let navg2 = pathSimplifierIns.createPathNavigator(2, {
      loop: true,
      speed: 30000
    })
    let navg3 = pathSimplifierIns.createPathNavigator(3, {
      loop: true,
      speed: 45000
    })
    let navg4 = pathSimplifierIns.createPathNavigator(4, {
      loop: true,
      speed: 3000
    })
    let navg5 = pathSimplifierIns.createPathNavigator(5, {
      loop: true,
      speed: 4000
    })
    let navg6 = pathSimplifierIns.createPathNavigator(6, {
      loop: true,
      speed: 30000
    })
    let navg7 = pathSimplifierIns.createPathNavigator(7, {
      loop: true,
      speed: 35000
    })

    navg0.start()
    navg1.start()
    navg2.start()
    navg3.start()
    navg4.start()
    navg5.start()
    navg6.start()
    navg7.start()
  })
}
const creatCarPath = () => {
  AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (
    PathSimplifier,
    $
  ) {
    let pathSimplifierIns = new PathSimplifier({
      zIndex: 100,
      autoSetFitView: false,
      map: map,

      getPath: function (pathData, pathIndex) {
        return pathData.path
      },
      getHoverTitle: function (pathData, pathIndex, pointIndex) {
        if (pointIndex >= 0) {
          return (
            pathData.name + '，点：' + pointIndex + '/' + pathData.path.length
          )
        }

        return pathData.name + '，点数量' + pathData.path.length
      },
      renderOptions: {
        renderAllPointsIfNumberBelow: 100 // 绘制路线节点，如不需要可设置为-1
      }
    })

    window.pathSimplifierIns = pathSimplifierIns

    let myPath = [
        [106.044579, 30.738201],
        [106.045094, 30.739677],
        [106.045437, 30.741447],
        [106.046124, 30.742332],
        [106.04681, 30.74366],
        [106.047325, 30.745283],
        [106.048012, 30.747348],
        [106.049214, 30.749119],
        [106.050244, 30.751627],
        [106.051102, 30.753545],
        [106.051445, 30.753987],
        [106.052304, 30.753987],
        [106.05402, 30.75384],
        [106.05505, 30.753397],
        [106.056595, 30.753249],
        [106.058312, 30.752807],
        [106.059513, 30.752364],
        [106.060028, 30.753987],
        [106.0602, 30.75561],
        [106.06123, 30.757232],
        [106.061745, 30.758265],
        [106.062947, 30.759593],
        [106.063462, 30.760478],
        [106.063805, 30.76092],
        [106.065178, 30.762985],
        [106.06638, 30.76269],
        [106.067925, 30.761658],
        [106.069298, 30.761068],
        [106.071015, 30.76092],
        [106.071701, 30.761805],
        [106.072216, 30.762838],
        [106.072388, 30.764165],
        [106.073075, 30.765346],
        [106.072216, 30.766378],
        [106.071701, 30.767706],
        [106.071701, 30.768738],
        [106.071701, 30.770508],
        [106.072045, 30.772573],
        [106.072216, 30.774195],
        [106.07256, 30.774933],
        [106.073246, 30.777293],
        [106.076336, 30.78157],
        [106.079254, 30.784077],
        [106.080971, 30.785256],
        [106.082344, 30.786584],
        [106.083546, 30.787616],
        [106.085434, 30.788943],
        [106.086979, 30.790418],
        [106.087666, 30.792187],
        [106.089039, 30.793662],
        [106.089897, 30.795137],
        [106.090756, 30.796464],
        [106.091099, 30.797938],
        [106.091786, 30.799708],
        [106.092644, 30.801919],
        [106.093846, 30.806343],
        [106.094532, 30.808554],
        [106.094876, 30.810029],
        [106.095391, 30.811798],
        [106.095906, 30.813714],
        [106.096592, 30.815484],
        [106.097622, 30.817695],
        [106.098137, 30.819022],
        [106.098652, 30.820938],
        [106.098996, 30.823739],
        [106.098996, 30.82654],
        [106.098996, 30.828309],
        [106.098996, 30.830078],
        [106.098824, 30.832436],
        [106.098481, 30.834352],
        [106.097622, 30.836416],
        [106.092816, 30.842164],
        [106.091271, 30.843048],
        [106.081658, 30.852628],
        [106.078224, 30.857196],
        [106.07668, 30.860438],
        [106.074276, 30.862943],
        [106.072045, 30.868837],
        [106.068268, 30.872521],
        [106.064663, 30.872668],
        [106.062432, 30.874731],
        [106.060887, 30.875762],
      ],
      endIdx = 0,
      data = [{
        name: '动态路线',
        path: myPath.slice(0, 1)
      }]

    pathSimplifierIns.setData(data)

    // 对第一条线路（即索引 0）创建一个巡航器
    let navg1 = pathSimplifierIns.createPathNavigator(0, {
      loop: true, // 循环播放
      speed: 1000 // 巡航速度，单位千米/小时
    })

    function expandPath() {
      function doExpand() {
        endIdx++

        if (endIdx >= myPath.length) {
          return false
        }

        let cursor = navg1.getCursor().clone(), // 保存巡航器的位置
          status = navg1.getNaviStatus()

        data[0].path = myPath.slice(0, endIdx + 1)
        pathSimplifierIns.setData(data) // 延展路径

        // 重新建立一个巡航器
        navg1 = pathSimplifierIns.createPathNavigator(0, {
          // loop: true, // 循环播放
          speed: 600000 // 巡航速度，单位千米/小时
        })

        if (status !== 'stop') {
          navg1.start()
        }

        // 恢复巡航器的位置
        if (cursor.idx >= 0) {
          navg1.moveToPoint(cursor.idx, cursor.tail)
        }
        return true
      }
      if (doExpand()) {
        setTimeout(expandPath, 1000)
      }
    }
    navg1.start()
    expandPath()
  })
}
export default {
  creatMap,
  createdGovernmentLocation,
  createdVillage,
  creatLevel,
  creatCarPath,
  creatDivergency
}
