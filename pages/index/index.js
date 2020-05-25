// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
// 数据
let lingyuanData = require('../../utils/data')

// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'xxxxx'
});
const app = getApp()

Page({
  data: {
    // centerX: 113.3345211,
    // centerY: 23.10229,
    markers: [],
    showDialog: false,
    mapId: "myMap" //wxml中的map的Id值
  },
  // 点击回到原点
  moveTolocation: function () {
    // console.log(123)
    let Id = this.data.mapId
    var mapCtx = wx.createMapContext(Id);
    mapCtx.moveToLocation();
  },

  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    // console.log('地图定位！')
    let that = this
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        console.log(res)
        let latitude = res.latitude;
        let longitude = res.longitude;
        let marker = this.createMarker(res);
        this.setData({
          centerX: longitude,
          centerY: latitude,
          markers: this.getLingyuanMarkers(),
        })
      }
    });
  },
  regionchange(e) {
    // console.log(e.type)
  },
  // 点击标点获取数据
  markertap(e) {
    var id = e.markerId
    var name = this.data.markers[id - 1].name
    console.log(name)
    this.setData({
      lingyuanName: name,
      showDialog: true,
    })
  },
  toggleDialog: function () {
    this.setData({
      showDialog: false,
    })
  },

  getLingyuanMarkers() {
    let markers = [];
    for (let item of lingyuanData) {
      let marker = this.createMarker(item);
      markers.push(marker)
    }
    return markers;
  },
  // moveToLocation: function () {
  //   this.mapCtx.moveToLocation()

  // },
  createMarker(point) {
    let latitude = point.latitude;
    let longitude = point.longitude;
    let marker = {
      iconPath: "/image/location.png",
      id: point.id || 0,
      name: point.name || '',
      latitude: latitude,
      longitude: longitude,
      width: 30,
      height: 30,
      label: {
        content: point.name,
        color: '#22ac38',
        fontSize: 14,
        bgColor: "#fff",
        borderRadius: 30,
        borderColor: "#22ac38",
        borderWidth: 1,
        padding: 3
      },
      callout: {
        content: point.name,
        fontSize: 0,
      }
    };
    return marker;

  }
})