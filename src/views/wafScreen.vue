<template>
  <div class="body" style="position:relative">
    <div class="header">
      <i class="logo"></i>
      <i class="logo1" title="切换地图" @click="cutMap" ref="logo"></i>
      <span>今日阻断</span>
      <span class="font num">{{attack_num.day_attack_num}}</span>
      <span>次，累计阻断</span>
      <span class="font addNum">{{attack_num.all_attack_num}}</span>
      <span>次</span>
      <div id="userName">
        <span class="userName">{{user}}</span>
        <span class="exit" @click="logout">退出</span>
      </div>
    </div>
    <div class="content">
      <div class="leftCont">
        <div class="square leftTop">
          <span class="row row1"></span>
          <span class="row row2"></span>
          <span class="col col2"></span>
          <span class="col col1"></span>
          <div class="gradient titleFont">被防护网站数</div>
          <div class="font networkNum">{{app_node_num.all_pro_web_num}}</div>
        </div>
        <div class="square leftMiddle">
          <span class="row row1"></span>
          <span class="row row2"></span>
          <span class="col col2"></span>
          <span class="col col1"></span>
          <div class="back1 titleFont">被攻击网站</div>
          <div class="attackList">
            <ul class="attackHost">
              <li v-for="(obj,i) in be_attack_host" :key="i">
                <ul class="block">
                  <li :title="obj.be_attack_host">{{obj.be_attack_host}}</li>
                  <li :title="obj.be_attack_num">{{obj.be_attack_num}}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="square leftBottom">
          <span class="row row1"></span>
          <span class="row row2"></span>
          <span class="col col2"></span>
          <span class="col col1"></span>
          <div class="back1 titleFont">攻击类型</div>
          <div class="attackList">
            <ul class="attackType">
              <li v-for="(obj,i) in attack_type" :key="i">
                <ul class="block">
                  <li :title="obj.attack_type">{{obj.attack_type}}</li>
                  <li :title="obj.attack_num">{{obj.attack_num}}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="map"></div>
      <div class="centerCont">
        <div class="square realList">
          <span class="row row1"></span>
          <span class="row row2"></span>
          <span class="col col2"></span>
          <span class="col col1"></span>
          <i class="arrow" @click="block($event)"></i>
          <div class="listHeader">
            <ul>
              <li>时间</li>
              <li>攻击IP(归属)</li>
              <li>被攻击归属</li>
              <li>被攻击网络</li>
              <li>端口</li>
              <li>攻击类型</li>
            </ul>
          </div>
          <div class="listBody" ref="listBody">
            <ul class="listRow" ref="cont" :class="{anim:animate==true}">
              <li v-for="(obj,i) in roll_data" :key="i">
                <ul class="listBlock">
                  <li :title="obj.attack_time">{{obj.attack_time | time}}</li>
                  <li
                    :title="obj.attack_ip +'('+ obj.attack_ip_loc +')' "
                  >{{obj.attack_ip}} ( {{obj.attack_ip_loc}} )</li>
                  <li :title="obj.be_attack_domain_loc">{{obj.be_attack_domain_loc}}</li>
                  <li :title="obj.be_attack_domain">{{obj.be_attack_domain}}</li>
                  <li :title="obj.be_attack_domain_port">{{obj.be_attack_domain_port}}</li>
                  <li :title="obj.attack_type">{{obj.attack_type}}</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="rightCont">
        <div class="square rightTop" id="node">
          <span class="row row1"></span>
          <span class="row row2"></span>
          <span class="col col2"></span>
          <span class="col col1"></span>
          <div class="gradient titleFont">WAF节点数</div>
          <div class="font nodeNum"></div>
        </div>
        <div class="square rightMiddle">
          <span class="row row1"></span>
          <span class="row row2"></span>
          <span class="col col2"></span>
          <span class="col col1"></span>
          <div class="title titleFont">
            <i class="littleLogo"></i>
            攻击趋势
          </div>
          <div id="line"></div>
        </div>
        <div class="square rightBottom">
          <span class="row row1"></span>
          <span class="row row2"></span>
          <span class="col col2"></span>
          <span class="col col1"></span>
          <div class="title titleFont">
            <i class="littleLogo"></i>
            攻击来源
          </div>
          <div id="bar"></div>
        </div>
      </div>
    </div>
    <Spin style="z-index:9999999" size="large" fix v-if="spinShow"></Spin>
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/world.js'
import 'echarts/map/js/china.js'
import geoCoordMap from '../assets/js/mapjson'
import imgurl from '../assets/img/arrow.png'
import imgurl1 from '../assets/img/arrow1.png'
// import imgurl2 from '../assets/img/china.png'
// import imgurl3 from '../assets/img/world.png'
export default {
  inject: ['reload'],
  data () {
    return {
      spinShow: true,
      animate: false,
      app_node_num: '',
      attack_num: '',
      attack_source: [],
      attack_type: [],
      be_attack_host: [],
      line: {},
      bar: {},
      site: 'world',
      map_data: {},
      roll_data: [],
      roll_data1: [],
      timer: '',
      timer1: '',
      timer2: '',
      user: '',
      myChart2: '',
      num: 0,
      src: [
        require('../assets/img/arrow.png'),
        require('../assets/img/arrow1.png'),
        require('../assets/img/china.png'),
        require('../assets/img/world.png')
      ]
    }
  },
  created () {
    this.site = this.$route.params.site
    this.user = JSON.parse(window.localStorage.getItem('user'))
    this.getData(this.site)
    this.getData1(this.site, 1)
  },
  mounted () {
    let logo = this.$refs.logo
    if (this.$route.params.site === 'world') {
      logo.style.background = 'url(' + this.src[2] + ') -5px -2px'
    } else {
      logo.style.background = 'url(' + this.src[3] + ') -5px -2px'
    }
  },
  methods: {
    cutMap () {
      clearInterval(this.timer)
      clearInterval(this.timer1)
      clearInterval(this.timer2)
      if (this.site === 'world') {
        this.$router.replace({ path: '/wafscreen/china' })
      } else {
        this.$router.replace({ path: '/wafscreen/world' })
      }
      this.reload()
    },
    block (e) {
      if (this.num % 2 === 0) {
        e.target.style.background =
          'url(' + imgurl + ') no-repeat center center'
        this.$refs.listBody.style.display = 'none'
      } else {
        e.target.style.background =
          'url(' + imgurl1 + ') no-repeat center center'
        this.$refs.listBody.style.display = 'block'
      }
      this.num++
    },
    logout () {
      window.localStorage.removeItem('access-user')
      window.localStorage.removeItem('user')
      this.$router.go('/login')
    },
    getData (site) {
      this.axios.get('/' + site + '_all_info/').then(res => {
        if (res.data.msg === 'success!') {
          this.app_node_num = res.data.data.all_web_num_dict
          this.attack_num = res.data.data.attack_num
          this.attack_source = res.data.data.attack_source
          this.attack_type = res.data.data.attack_type
          this.be_attack_host = res.data.data.be_attack_host
          let line = {
            datax: [],
            datay: []
          }
          for (let index = 0; index < res.data.data.trend_map.length; index++) {
            line.datax.push(res.data.data.trend_map[index].trend_time)
            line.datay.push(res.data.data.trend_map[index].trend_num)
          }
          let bar = {
            datax: [],
            datay: []
          }
          for (
            let index = 0;
            index < res.data.data.attack_source.length;
            index++
          ) {
            bar.datax.push(res.data.data.attack_source[index].attack_ip_loc)
            bar.datay.push(res.data.data.attack_source[index].attack_num)
          }
          this.line = line
          this.bar = bar

          this.wrapecharts()
          this.timer1 = setTimeout(() => {
            this.getData(site)
          }, 8000)
        } else if (
          res.data.msg === 'You are not logged in, please login first!'
        ) {
          this.logout()
        }
      })
    },
    getData1 (site, id) {
      clearInterval(this.timer)
      this.axios.get('/' + site + '_attack_logs/?id=' + id).then(res => {
        var that = this
        if (res.data.msg === 'ok') {
          var map = site + '_attack_map'
          var logs = site + '_attack_logs'

          this.map_data = this.lines(res.data[map])
          if (this.map_data[0].length > 0 || id === 1) {
            this.wrapmap(site)
          }
          let data = res.data[logs]
          var len = 0
          if (id === 0) {
            data = data.reverse()
            len = data.length > 4 ? 4 : data.length
          } else {
            len = data.length
          }

          for (let i = 0; i < len; i++) {
            if (id === 0) {
              this.roll_data.unshift(res.data[logs][i])
              this.roll_data1.unshift(res.data[logs][i])
            } else {
              this.roll_data.push(res.data[logs][i])
              this.roll_data1.push(res.data[logs][i])
            }
          }
          if (this.roll_data.length <= 7) {
            let leng = this.roll_data.length
            this.$refs.listBody.style.height = 36 * leng + 'px'
          } else {
            this.$refs.listBody.style.height = '252px'
          }

          that.spinShow = false
          if (id === 0) {
            // this.roll_data.splice(15, this.roll_data.length);
            // this.roll_data1.splice(15, this.roll_data.length);
          }

          this.timer2 = setTimeout(() => {
            clearInterval(that.timer)
            that.getData1(site, 0)
          }, 5000)
        } else if (
          res.data.msg === 'You are not logged in, please login first!'
        ) {
          this.logout()
        }
      })
    },
    lines (data) {
      var arrData = []
      var arr = []
      var arr1 = []
      var arr2 = []
      var arr3 = []
      for (var i = 0; i < data.length; i++) {
        var level = data[i].hazard_level
        switch (level) {
          case 'H':
            level = 4
            break
          case 'M':
            level = 3
            break
          case 'L':
            level = 2
            break
          default:
            level = 4
        }

        arr.push([
          {
            coord: geoCoordMap[data[i].fromName],
            value: level
          },
          {
            coord: geoCoordMap[data[i].toName]
          }
        ])
        arr1.push(data[i].toName)
        arr3.push({
          name: data[i].fromName,
          value: geoCoordMap[data[i].fromName].concat(level)
        })
      }

      for (let i = 0; i < arr1.length; i++) {
        arr2.push({
          name: arr1[i],
          value: geoCoordMap[arr1[i]].concat(0)
        })
      }

      arrData.push(arr)
      arrData.push(arr2)
      arrData.push(arr3)
      return arrData
    },
    wrapecharts () {
      this.$nextTick(() => {
        var myChart = echarts.init(document.getElementById('line'))
        var option = {
          grid: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 0,
            containLabel: true
          },
          tooltip: {
            trigger: 'item'
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: this.line.datax,
            triggerEvent: true,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(167,209,217,.1)'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: 'rgba(167,209,217,.6)'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#fff',
              rotate: 45
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(167,209,217,.1)'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: 'rgba(167,209,217,.6)'
              }
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              color: '#fff',
              rotate: 45
            }
          },
          series: [
            {
              data: this.line.datay,
              type: 'line',
              symbol: 'circle',
              symbolSize: 8,
              color: '#03E0F2',
              lineStyle: {
                color: '#03E0F2'
              }
            }
          ]
        }
        myChart.setOption(option)
        var myChart1 = echarts.init(document.getElementById('bar'))
        var option1 = {
          grid: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 0,
            containLabel: true
          },
          tooltip: {
            trigger: 'item'
          },
          xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: this.bar.datax,
            triggerEvent: true,
            splitLine: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: 'rgba(255,255,255,.4)'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#fff',
              rotate: 35
            }
          },
          yAxis: {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,.1)'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: 'rgba(255,255,255,0)'
              }
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              color: '#fff',
              rotate: 45
            }
          },
          series: [
            {
              type: 'bar',
              barMinHeight: 10,
              barWidth: 20,
              color: '#03E0F2',
              data: this.bar.datay
            }
          ]
        }
        var that = this
        window.onresize = function () {
          myChart.resize()
          myChart1.resize()
          if (that.myChart2) {
            that.myChart2.resize()
          }
        }
        myChart1.setOption(option1)
      })
    },
    wrapmap (site) {
      this.$nextTick(() => {
        this.myChart2 = echarts.init(document.getElementById('map'))
        var series = []
        series.push(
          {
            type: 'lines',
            zlevel: 12,
            effect: {
              show: true,
              period: 4, // 箭头指向速度，值越小速度越快
              trailLength: 0.3, // 特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', // 箭头图标
              symbolSize: 5 // 图标大小
            },
            lineStyle: {
              normal: {
                width: 1, // 尾迹线条宽度
                opacity: 0, // 尾迹线条透明度
                curveness: 0.3 // 尾迹线条曲直度
              }
            },
            data: this.map_data[0]
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 12,
            rippleEffect: {
              // 涟漪特效
              period: 4, // 动画时间，值越小速度越快
              brushType: 'stroke', // 波纹绘制方式 stroke, fill
              scale: 4 // 波纹圆环最大限制，值越大波纹越大
            },
            label: {
              normal: {
                show: true,
                position: 'right', // 显示位置
                offset: [5, 0], // 偏移设置
                formatter: function (params) {
                  // 圆环显示文字
                  // return params.data.name;
                  return ' '
                },
                fontSize: 13
              },
              emphasis: {
                show: true,
                formatter: function (params) {
                  // 圆环显示文字
                  return params.data.name
                }
              }
            },
            symbol: 'circle',
            symbolSize: function (val) {
              return 8 // 圆环大小
            },
            itemStyle: {
              normal: {
                show: false,
                color: '#f00'
              }
            },
            data: this.map_data[2]
          },
          // 被攻击点
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 12,
            rippleEffect: {
              period: 4,
              brushType: 'stroke',
              scale: 4
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                offset: [5, 0],
                color: 'red',
                formatter: function (param) {
                  return param.name
                },
                textStyle: {
                  color: 'red'
                }
              },
              emphasis: {
                show: true
              }
            },
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
              normal: {
                show: true,
                color: '#0ff'
              }
            },
            data: this.map_data[1]
          }
        )

        var option2 = {
          tooltip: {
            show: false,
            trigger: 'item'
          },
          backgroundColor: 'rgba(0,0,0,0)',
          visualMap: {
            // 图例值控制
            type: 'piecewise',
            splitNumber: 4,
            min: 0,
            max: 4,
            calculable: true,
            show: false,
            // seriesIndex:3,
            color: ['red', '#65b742', '#fc9700', '#f9282a'].reverse(),
            // color: ['#fff'],
            textStyle: {
              color: '#fff'
            }
          },
          geo: [
            {
              map: site,
              zoom: 1.2,
              zlevel: 10,
              label: {
                emphasis: {
                  show: false
                }
              },
              roam: false, // 是否允许缩放
              aspectScale: 0.65, // 地图长宽比例
              layoutCenter: ['48%', '50%'], // 地图位置
              layoutSize: '130%',
              itemStyle: {
                normal: {
                  color: 'rgba(22,32,47,0.3)', // 地图背景色
                  borderColor: '#0fcbd1', // 省市边界线
                  borderWidth: 0
                },
                emphasis: {
                  color: 'rgba(37, 43, 61, .7)' // 悬浮背景
                }
              }
            },
            {
              map: site,
              zoom: 1.2,
              zlevel: 8,
              label: {
                emphasis: {
                  show: false
                }
              },
              roam: false, // 是否允许缩放
              aspectScale: 0.65, // 地图长宽比例
              layoutCenter: ['48%', '50%'], // 地图位置
              layoutSize: '130%',
              itemStyle: {
                normal: {
                  color: 'rgba(22,32,47,0)', // 地图背景色
                  borderColor: '#0fcbd1', // 省市边界线
                  borderWidth: 1
                },
                emphasis: {
                  color: 'rgba(37, 43, 61, .7)' // 悬浮背景
                }
              }
            }
          ],
          series: series
        }
        if (site === 'china') {
          option2.geo[0].aspectScale = 0.8
          option2.geo[1].aspectScale = 0.8
          option2.geo[0].layoutSize = '110%'
          option2.geo[1].layoutSize = '110%'
        }
        // window.onresize = function() {
        //   myChart2.resize();
        // };
        this.myChart2.setOption(option2)

        this.scroll()
      })
    },
    scroll () {
      var that = this // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
      if (that.roll_data.length > 8) {
        this.timer = setInterval(() => {
          let cont = this.$refs.cont
          cont.style.marginBottom = '-36px'
          this.animate = !this.animate

          setTimeout(function () {
            // that.roll_data.push(that.roll_data[0]);
            that.roll_data.pop()
            cont.style.marginBottom = '0px'
            that.animate = !that.animate // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
          }, 500)
          if (that.roll_data.length < 9) {
            clearInterval(that.timer)
          }
        }, 1000)
      } else {
        clearInterval(that.timer)
      }
    }
  },
  filters: {
    time: function (a) {
      let time = a.substr(a.indexOf('T') + 1)
      return time
    }
  },
  beforeDestroy () {
    this.$once('hook:beforeDestroy', () => {
      clearInterval(this.timer)
      clearTimeout(this.timer1)
      clearTimeout(this.timer2)
    })
  }
}
</script>
<style scoped>
@import '../assets/common/font/font.css';
.font {
  font-family: 'myfont', 'Microsoft YaHei';
}
.anim {
  transition: all 0.5s;
}
* {
  margin: 0;
  padding: 0;
}

ul,
li {
  list-style: none;
}

.clear {
  content: '';
  display: inline-block;
  overflow: hidden;
  clear: both;
}

.body {
  background: url('../assets/img/back.png');
  background-size: cover;
  color: #fff;
  font-family: 'Microsoft YaHei';
}

#node {
  opacity: 0;
}

.square {
  position: relative;
  width: 98%;
  margin: 0 auto;
  border: 1px solid #788ec6;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.3),
    inset 0 0 30px 0 rgba(44, 116, 205, 0.5);
}

.square > span {
  position: absolute;
  padding: 5px;
  border-style: solid;
  border-color: #0efcff;
}

.row1 {
  border-width: 3px 0 0 3px;
  top: -3px;
  left: -3px;
}

.row2 {
  border-width: 3px 3px 0 0;
  top: -3px;
  right: -3px;
}

.col1 {
  border-width: 0 0 3px 3px;
  bottom: -3px;
  left: -3px;
}

.col2 {
  border-width: 0 3px 3px 0;
  bottom: -3px;
  right: -3px;
}

.header {
  position: relative;
  width: 98%;
  margin: 0 auto;
  height: 5rem /* 80px */;
  background: url('../assets/img/bottom_03.png') no-repeat center bottom;
  text-align: center;
  color: #0cbdfb;
  line-height: 5rem /* 80px */;
  font-size: 1.5rem /* 24px */;
}

.header > .num {
  font-size: 2.5rem /* 40px */;
  color: #ef5c5a;
}

.header > .addNum {
  font-size: 2.5rem /* 40px */;
}

.header > .logo {
  position: absolute;
  left: 0;
  display: inline-block;
  width: 16.25rem /* 260px */;
  height: 5rem /* 80px */;
  background: url('../assets/img/logo_03.png') no-repeat center center;
}

#userName {
  font-size: 14px;
  position: absolute;
  right: 5px;
  top: 20px;
  cursor: pointer;
  line-height: 35px;
  height: 36px;
  z-index: 100000;
}

.userName {
  display: inline-block;
  min-width: 50px;
  line-height: 35px;
  height: 35px;
  padding: 0 9px;
  cursor: pointer;
}

#userName:hover {
  height: 72px;
  color: aliceblue;
}

#userName:hover .userName {
  background-color: #2a2c3a;
  border-bottom: 1px solid rgb(25, 218, 252);
}

#userName:hover .exit {
  background-color: #2a2c3a;
  opacity: 1;
  top: 36px;
  transition: all 0.5s ease;
}

.header .exit {
  opacity: 0;
  position: absolute;
  right: 0px;
  top: 55px;
  line-height: 35px;
  height: 35px;
  cursor: pointer;
  width: 100%;
}

.header > .logo1 {
  position: absolute;
  left: 270px;
  top: 20px;
  cursor: pointer;
  display: inline-block;
  width: 2.5rem /* 40px */;
  height: 2.5rem /* 40px */;
  /* background: url('../assets/img/map.png'); */
  background-position: -5px -2px;
}

.content {
  width: 98%;
  max-width: 2500px;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 100%;
  margin: 0 auto;
  position: relative;
}

.content > div {
  float: left;
}

.titleFont {
  color: #0efcff;
  font-size: 1.125rem /* 18px */;
  font-weight: 600;
  text-align: center;
}

.gradient {
  height: 2.5rem /* 40px */;
  line-height: 2.5rem /* 40px */;
  background: url('../assets/img/gradient_03.png') no-repeat;
  background-size: cover;
}

.nodeNum,
.networkNum {
  text-align: center;
  color: #fe986c;
  font-size: 2.5rem /* 40px */;
  font-weight: 600;
  height: 2.8125rem /* 45px */;
  line-height: 2.8125rem /* 45px */;
}

.back1 {
  width: 80%;
  height: 2.5rem /* 40px */;
  margin: 13px auto;
  background: url('../assets/img/back1_03.png');
  background-size: 100% 100%;
  line-height: 2.5rem /* 40px */;
}

.title {
  width: 90%;
  height: 2.5rem /* 40px */;
  margin: 10px auto;
  background: url('../assets/img/fly.png');
  background-size: 100% 100%;
  line-height: 2.5rem /* 40px */;
  text-align: left;
}

.littleLogo {
  display: inline-block;
  width: 1.75rem /* 28px */;
  height: 1.5rem /* 24px */;
  background: url('../assets/img/title.png');
  vertical-align: text-top;
}

.attackList {
  width: 80%;
  margin: 20px auto;
}

.attackList > ul > li {
  cursor: pointer;
}

.attackList > ul > li:hover {
  background: #152f5b;
}

.block {
  font-size: 0;
}

.block > li {
  display: inline-block;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 0.875rem /* 14px */;
}

.block > li:nth-of-type(1) {
  width: 73%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.block > li:nth-of-type(2) {
  width: 27%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

#line,
#bar {
  height: 13.125rem /* 210px */;
  margin-top: 30px;
}

.arrow {
  position: absolute;
  top: 0;
  left: 50%;
  -ms-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  display: inline-block;
  width: 1.875rem /* 30px */;
  height: 1.875rem /* 30px */;
  background: url('../assets/img/arrow1.png') no-repeat center center;
  cursor: pointer;
}

.listHeader {
  background: linear-gradient(
    rgba(14, 140, 161, 1),
    rgba(14, 140, 161, 0.1),
    rgba(14, 252, 255, 0)
  );
}

.listHeader li {
  display: inline-block;
  text-align: center;
  margin-top: 0.9375rem /* 15px */;
  color: #0efcff;
  font-size: 1.125rem /* 18px */;
  font-weight: 600;
  height: 2.5rem /* 40px */;
  line-height: 2.5rem /* 40px */;
}

.listHeader > ul,
.listBlock {
  font-size: 0;
}

.listHeader li:nth-of-type(1),
.listBlock > li:nth-of-type(1) {
  width: 11%;
}

.listHeader li:nth-of-type(2),
.listBlock > li:nth-of-type(2) {
  width: 22%;
}

.listHeader li:nth-of-type(3),
.listBlock > li:nth-of-type(3) {
  width: 15%;
}

.listHeader li:nth-of-type(4),
.listBlock > li:nth-of-type(4) {
  width: 21%;
}

.listHeader li:nth-of-type(5),
.listBlock > li:nth-of-type(5) {
  width: 10%;
}

.listHeader li:nth-of-type(6),
.listBlock > li:nth-of-type(6) {
  width: 21%;
}

.listBlock {
  height: 36px;
  cursor: pointer;
}

.listBlock > li {
  display: inline-block;
  text-align: center;
  font-size: 0.875rem /* 14px */;
  height: 36px;
  line-height: 36px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.listBody {
  position: relative;
  /* display:none; */
  height: 252px;
  overflow: hidden;
  transition: all 0.5s;
}

.listRow {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.listBody > ul > li:hover {
  background: #152f5b;
}

.leftCont {
  position: relative;
  margin-top: 3.125rem /* 50px */;
  width: 15%;
  z-index: 10000;
}

.centerCont {
  position: relative;
  margin-top: 3.125rem /* 50px */;
  margin-bottom: 3.125rem /* 50px */;
  width: 65%;
  height: 836px;
  /* z-index:100; */
}

.rightCont {
  position: relative;
  margin-top: 3.125rem /* 50px */;
  width: 20%;
  z-index: 10000;
}

#map {
  position: absolute;
  height: 37.5rem /* 600px */;
  width: 100%;
  top: 0;
  left: 50%;
  -ms-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  z-index: 1000;
}

.realList {
  position: absolute;
  width: 90%;
  bottom: 0;
  left: 50%;
  border: 1px solid #10cfd6;
  -ms-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
  z-index: 10000;
}

.leftMiddle,
.rightMiddle {
  height: 310px;
  margin-top: 5rem /* 80px */;
}

.leftBottom,
.rightBottom {
  height: 310px;
  margin-top: 3.125rem /* 50px */;
}

@media screen and (min-width: 2000px) {
  #map {
    height: 65.625rem /* 1050px */;
  }

  #line,
  #bar {
    height: 18.125rem /* 290px */;
    margin-top: 0;
  }

  .header {
    height: 5.625rem /* 90px */;
    line-height: 5.625rem /* 90px */;
    font-size: 1.625rem /* 26px */;
  }

  .header > .logo {
    width: 16.25rem /* 260px */;
    height: 5.625rem /* 90px */;
  }

  .header > .logo1 {
    top: 25px;
  }

  .gradient {
    height: 3.75rem /* 60px */;
    line-height: 3.75rem /* 60px */;
  }

  .nodeNum,
  .networkNum {
    font-size: 3.75rem /* 60px */;
    height: 4.375rem /* 70px */;
    line-height: 4.375rem /* 70px */;
  }

  .leftMiddle,
  .rightMiddle {
    height: 22.5rem /* 360px */;
    margin-top: 10rem /* 160px */;
  }

  .leftBottom,
  .rightBottom {
    height: 22.5rem /* 360px */;
    margin-top: 80px;
  }

  .block > li,
  .listBlock > li {
    font-size: 1rem /* 16px */;
  }
  .leftTop,
  .rightTop {
    margin-top: 100px;
  }

  .centerCont {
    height: 1196px;
  }
}

@media screen and (min-width: 1600px) and (max-width: 2000px) {
  #map {
    height: 50rem /* 800px */;
  }

  #line,
  #bar {
    height: 240px;
    margin-top: 0;
  }

  .header {
    height: 5.625rem /* 90px */;
    line-height: 5.625rem /* 90px */;
    font-size: 1.625rem /* 26px */;
  }

  .header > .logo {
    width: 16.25rem /* 260px */;
    height: 5.625rem /* 90px */;
  }

  .header > .logo1 {
    top: 25px;
  }

  .gradient {
    height: 45px;
    line-height: 45px;
  }

  .nodeNum,
  .networkNum {
    font-size: 3.125rem /* 50px */;
    height: 55px;
    line-height: 55px;
  }

  .leftTop,
  .rightTop {
    margin-top: 40px;
  }

  .leftMiddle,
  .rightMiddle {
    height: 310px;
    margin-top: 120px;
  }

  .leftBottom,
  .rightBottom {
    height: 310px;
    margin-top: 60px;
  }

  .block > li {
    height: 2.25rem /* 36px */;
    line-height: 2.25rem /* 36px */;
  }

  .block > li,
  .listBlock > li {
    height: 2.25rem /* 36px */;
    line-height: 2.25rem /* 36px */;
  }

  .listBlock {
    height: 2.25rem /* 36px */;
  }

  .listBody {
    height: 252px;
  }

  .centerCont {
    height: 942px;
  }
}
</style>
