<template>
  <div id="report" style="position: relative;">
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <div
          style="background-color: #1e9fff;padding:20px 0 0 20px;color: #fff;font-size:24px;font-weight:600"
        >防护网站：{{params.domain}}</div>
        <div class="layout-nav">
          <ul>
            <li>
              <router-link
                tag="span"
                :to="'/weblist/protectreport/'+ params.domain + '/' + params.date"
              >防护报表</router-link>
            </li>
            <li>
              <router-link
                tag="span"
                :to="'/weblist/visitreport/'+ params.domain + '/' + params.date"
                style="color:#34EDED;border-bottom: 2px solid #fff;padding: 10px 0px;"
              >访问报表</router-link>
            </li>
          </ul>
          <ul>
            <li>
              <DatePicker
                class="color"
                :type="dateType"
                :value="params.date || new Date()"
                :options="options"
                :editable="editable"
                style="width: 200px"
                @on-change="handleChange"
              ></DatePicker>
              <Button type="default" @click="subDate">提交</Button>
            </li>
            <!-- <li>{{params.domain}}</li> -->
          </ul>
        </div>
      </Col>
      <Col span="24">
        <div class="bgCard clear">
          <h2 style="margin-bottom:20px">综合评级</h2>
          <Row type="flex" justify="space-between" class="code-row-bg">
            <Col span="5">
              <Card style="background:rgba(0,0,0,0);color:#FFF">
                <p style="color:#fff;" slot="title">网站访问次数</p>
                <div style="display:flex;justify-content: space-between;">
                  <Icon type="logo-rss" size="56" style="margin:auto;" />
                  <div style="height:81px;min-width:140px">
                    <p>
                      <span class="font">868</span>
                      <span>次</span>
                    </p>
                    <p>
                      访问IP数：
                      <span class="font1">8</span>
                      <span>个</span>
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span="5">
              <Card style="background:rgba(0,0,0,0);color:#FFF">
                <p style="color:#fff;" slot="title">拦截攻击次数</p>
                <div style="display:flex;justify-content: space-between;">
                  <Icon type="ios-albums-outline" size="56" style="margin:auto;" />
                  <div style="height:81px;min-width:140px">
                    <p>
                      <span class="font">422</span>
                      <span>次</span>
                    </p>
                    <p>
                      攻击源区域：
                      <span class="font1">4</span>
                      <span>个</span>
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span="5">
              <Card style="background:rgba(0,0,0,0);color:#FFF">
                <p style="color:#fff;" slot="title">网站总流量</p>
                <div style="display:flex;justify-content: space-between;">
                  <Icon type="ios-ribbon-outline" size="56" style="margin:auto;" />
                  <div style="height:81px;min-width:140px;line-height:81px">
                    <p>
                      <span class="font">1234</span>
                      <span>M</span>
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
            <Col span="5">
              <Card style="background:rgba(0,0,0,0);color:#FFF">
                <p style="color:#fff;" slot="title">疑似攻击源</p>
                <div style="display:flex;justify-content: space-between;">
                  <Icon type="md-wifi" size="56" style="margin:auto;" />
                  <div style="height:81px;min-width:140px;line-height:81px">
                    <p>
                      <span class="font">4</span>
                      <span>个</span>
                    </p>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">关键指标</p>
          <div style="height:300px;display:flex;justify-content:space-around;align-items: center;">
            <i-circle
              :size="250"
              :trail-width="4"
              :stroke-width="5"
              :percent="100"
              stroke-linecap="square"
              stroke-color="#F0412E"
            >
              <div class="demo-Circle-custom">
                <h1 style="color:#F0412E;margin-bottom:10px;">0 S</h1>
                <p>异常时长</p>
              </div>
            </i-circle>
            <i-circle
              :size="250"
              :trail-width="4"
              :stroke-width="5"
              :percent="100"
              stroke-linecap="square"
              stroke-color="#F0412E"
            >
              <div class="demo-Circle-custom">
                <h1 style="color:#F0412E;margin-bottom:10px;">0 次</h1>
                <p>异常次数</p>
              </div>
            </i-circle>
            <i-circle
              :size="250"
              :trail-width="4"
              :stroke-width="5"
              :percent="100"
              stroke-linecap="square"
              stroke-color="#0283E1"
            >
              <div class="demo-Circle-custom">
                <h1 style="color:#0283E1;margin-bottom:10px;">0.289 S</h1>
                <p>平均延时</p>
              </div>
            </i-circle>
            <i-circle
              :size="250"
              :trail-width="4"
              :stroke-width="5"
              :percent="100"
              stroke-linecap="square"
              stroke-color="#0283E1"
            >
              <div class="demo-Circle-custom">
                <h1 style="color:#0283E1;margin-bottom:10px;">28 次</h1>
                <p>延时5S以上</p>
              </div>
            </i-circle>
          </div>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">异常响应分析</p>
          <Row :gutter="16">
            <Col span="12">
              <div id="pie1" style="height:450px"></div>
            </Col>
            <Col span="12">
              <br />
              <Table border stripe :columns="columns1" :data="data1"></Table>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">访问源区域分布</p>
          <Row :gutter="16">
            <Col span="12">
              <div>展现当天网络访问源的境内分布，了解境内访问源区域，为下一步安全保障提供数据支撑</div>
              <div id="map1" style="height:450px"></div>
            </Col>
            <Col span="12">
              <div>访问源区域分布 top10</div>
              <br />
              <Table border stripe :columns="columns2" :data="data3"></Table>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">访问源 IP TOP10</p>
          <Row :gutter="16">
            <Col span="12">
              <div id="bar1" style="height:450px"></div>
            </Col>
            <Col span="12">
              <br />
              <Table border stripe :columns="columns4" :data="data4"></Table>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">访问页面排行</p>
          <Row :gutter="16">
            <Col span="24">
              <div>展现访客对站点各页面的访问情况，重点从浏览量、独立访客、访问独立IP数等维度进行分析，发现最受欢迎的页面</div>
              <br />
              <Table border stripe :columns="columns5" :data="data5"></Table>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">访问来源分析</p>
          <Row :gutter="16">
            <Col span="12">
              <div>展现站点流量的来源方式及占比，帮助站点有效运营和制作最佳推广方案</div>
              <div id="pie2" style="height:450px"></div>
            </Col>
            <Col span="12">
              <br />
              <Table border stripe :columns="columns6" :data="data6"></Table>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">访问终端分析</p>
          <Row :gutter="16">
            <Col span="12">
              <div>展现站点流量的来源方式及占比，帮助站点有效运营和制作最佳推广方案</div>
              <div id="pie3" style="height:450px"></div>
            </Col>
            <Col span="12">
              <br />
              <div id="pie4" style="height:450px"></div>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">响应码分布</p>
          <Row :gutter="16">
            <Col span="12">
              <div>通过发现异常的响应码分布和发现有问题的页面，有针对性的整改，有效提高用户体验</div>
              <div id="pie5" style="height:450px"></div>
            </Col>
            <Col span="12">
              <div>状态码分布</div>
              <br />
              <Table border stripe :columns="columns7" :data="data7"></Table>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
    <!-- <Spin size="large" fix v-if="spinShow"></Spin> -->
  </div>
</template>
<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
export default {
  inject: ['reload'],
  data () {
    return {
      options: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      editable: false, // 日期禁止输入
      theme1: 'light',
      spinShow: true,
      head_data: {},
      columns1: [
        {
          title: '异常响应',
          key: 'response'
        },
        {
          title: '开始时间',
          key: 'startTime'
        },
        {
          title: '结束时间',
          key: 'overTime'
        },
        {
          title: '持续时长',
          key: 'timer'
        }
      ],
      data1: [
        {
          response: '200正常',
          startTime: '10:15:24',
          overTime: '10:15:26',
          timer: '2s'
        },
        {
          response: '连接重复',
          startTime: '10:16:20',
          overTime: '10:16:30',
          timer: '10s'
        },
        {
          response: '连接超时',
          startTime: '10:17:14',
          overTime: '10:17:25',
          timer: '11s'
        },
        {
          response: '503服务器错误',
          startTime: '10:17:34',
          overTime: '10:17:42',
          timer: '8s'
        }
      ],
      columns2: [
        {
          title: '区域',
          key: 'attack_ip_loc'
        },
        {
          title: '访问量',
          key: 'attack_num'
        },
        {
          title: '访问量占比',
          key: 'attack_percentage'
        }
      ],
      data2: [],
      data3: [],
      columns4: [
        {
          title: 'IP',
          key: 'attack_ip'
        },
        {
          title: '区域',
          key: 'attack_ip_loc'
        },
        {
          title: '访问量',
          key: 'attack_num'
        },
        {
          title: '访问量占比',
          key: 'attack_percentage'
        }
      ],
      columns5: [
        {
          title: '栏目/URL',
          align: 'center',
          key: 'attack_type'
        },
        {
          title: '浏览数',
          align: 'center',
          key: 'attack_percentage'
        }
      ],
      columns6: [
        {
          title: '类型',
          key: 'type'
        },
        {
          title: '访问次数',
          key: 'num'
        },
        {
          title: '访问占比',
          key: 'percentage'
        }
      ],
      columns7: [
        {
          title: '响应码',
          key: 'rescode'
        },
        {
          title: 'URL',
          key: 'url'
          // width:'300px'
        },
        {
          title: '次数',
          key: 'num'
        },
        {
          title: '占比',
          key: 'percentage'
        }
      ],
      data4: [],
      data5: [
        {
          attack_type: '/index.html',
          attack_percentage: '120'
        },
        {
          attack_type: '/index.php',
          attack_percentage: '100'
        },
        {
          attack_type: '/api.php',
          attack_percentage: '80'
        }
      ],
      data6: [
        {
          type: '爬虫',
          num: '2',
          percentage: '20%'
        },
        {
          type: '客户端工具',
          num: '8',
          percentage: '80%'
        }
      ],
      data7: [
        {
          rescode: '5xx',
          url: '/servlet/enp. UploadTemplate Servlet',
          num: '1',
          percentage: '0.01%'
        },
        {
          rescode: '2xx',
          url: '/servlet/index.php',
          num: '2',
          percentage: '0.2%'
        }
      ],
      pie_data: [],
      pie1_data: [],
      map_data: [],
      bar_datax: [],
      bar_datay: [],
      linex: [],
      line_access_data: [],
      line_attack_data: [],
      line_inflow_data: [],
      line_outflow_data: [],
      map_num: 0,
      params: {},
      dateType: 'date',
      date: ''
    }
  },
  created () {
    this.getData()
  },
  mounted () {},
  methods: {
    handleChange (date) {
      this.date = date
    },
    subDate () {
      let url = '/report/' + this.params.domain + '/' + this.date
      this.$router.replace({ path: url })
      this.reload()
    },
    wrapEcharts () {
      this.$nextTick(() => {
        var myChart1 = echarts.init(document.getElementById('pie1'))
        var option1 = null

        option1 = {
          color: [
            '#33FFCC',
            '#0096F3',
            '#2ECD73',
            '#F4667C',
            '#FAE266',
            '#A08BF0',
            '#D0570E',
            '#00C0E9'
          ],
          title: {
            // text: '某站点用户访问来源',
            // subtext: '纯属虚构',
            // x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          // legend: {
          //     orient: 'vertical',
          //     left: 'left',
          //     data: ['中国', '美国', '俄罗斯', '日本', '英国']
          // },
          series: [
            {
              name: '异常响应',
              type: 'pie',
              radius: ['30%', '61%'],
              center: ['50%', '50%'],
              data: [
                {
                  name: '200正常',
                  value: 2
                },
                {
                  name: '连接重复',
                  value: 10
                },
                {
                  name: '连接超时',
                  value: 11
                },
                {
                  name: '503服务器错误',
                  value: 8
                }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        if (option1 && typeof option1 === 'object') {
          myChart1.setOption(option1, true)
        }
        var myChart2 = echarts.init(document.getElementById('map1'))
        var option2 = null

        option2 = {
          title: {
            // text: 'iphone销量',
            // subtext: '纯属虚构',
            // left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          visualMap: {
            show: false,
            min: 0,
            max: this.map_num,
            left: 'left',
            color: ['red', '#FF7F50', '#0096F3'],
            top: 'bottom',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: true
          },
          series: [
            {
              name: '访问源',
              type: 'map',
              mapType: 'china',
              roam: false,
              label: {
                normal: {
                  show: true
                },
                emphasis: {
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  areaColor: '#A4B1DE',
                  borderColor: '#F1F5FB',
                  borderWidth: 1
                },
                emphasis: {
                  areaColor: '#fff464',
                  borderWidth: 0
                }
              },
              data: this.map_data
            }
          ]
        }
        if (option2 && typeof option2 === 'object') {
          myChart2.setOption(option2, true)
        }
        var myChart3 = echarts.init(document.getElementById('bar1'))
        var option3 = null
        option3 = {
          tooltip: {
            trigger: 'item'
          },
          grid: {
            left: '1.5%',
            top: 35,
            right: '8%',
            bottom: '1%',
            containLabel: true
          },
          xAxis: {
            show: true,
            type: 'value',
            splitLine: {
              show: false
            },
            axisLine: {
              show: true
            },
            axisTick: {
              show: true
            }
          },
          yAxis: {
            type: 'category',
            data: this.bar_datax.reverse(),
            splitLine: {
              show: false
            },
            axisLine: {
              show: true
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#000'
              }
            },
            nameTextStyle: {
              fontSize: 12
              // color:'#fff'
            }
          },
          series: [
            {
              type: 'bar',
              data: this.bar_datay.reverse(),
              barWidth: 14,
              barMinHeight: 20,
              itemStyle: {
                emphasis: {
                  barBorderRadius: 7
                },
                normal: {
                  barBorderRadius: 7,
                  color: '#4C9AFB'
                }
              }
            }
          ]
        }
        if (option3 && typeof option3 === 'object') {
          myChart3.setOption(option3, true)
        }
        // echarts4
        var myChart4 = echarts.init(document.getElementById('pie2'))
        var option4 = null

        option4 = {
          color: [
            '#33FFCC',
            '#0096F3',
            '#2ECD73',
            '#F4667C',
            '#FAE266',
            '#A08BF0',
            '#D0570E',
            '#00C0E9'
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          // legend: {
          //     orient: 'vertical',
          //     x: 'left',
          //     data: ['SQL注入攻击', '文件限制', '漏洞防护', '协议违规', '跨站脚本攻击', 'HTTP请求出错', '文件注入攻击',
          //         '目录信息泄露', '命令注入攻击', 'HTTP方法限制'
          //     ]
          // },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['35%', '55%'],

              data: [
                {
                  name: '爬虫',
                  value: 2
                },
                {
                  name: '客户端工具',
                  value: 8
                }
              ]
            }
          ]
        }
        if (option4 && typeof option4 === 'object') {
          myChart4.setOption(option4, true)
        }

        // echarts5
        var myChart5 = echarts.init(document.getElementById('pie3'))
        var option5 = null

        option5 = {
          color: [
            '#33FFCC',
            '#0096F3',
            '#2ECD73',
            '#F4667C',
            '#FAE266',
            '#A08BF0',
            '#D0570E',
            '#00C0E9'
          ],
          title: {
            text: '设备终端分布',
            textStyle: {
              // color: "#999"
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          // legend: {
          //   orient: "vertical",
          //   x: "left",
          //   data: ["爬虫", "客户端工具"]
          // },
          series: [
            {
              name: '设备终端',
              type: 'pie',
              radius: ['35%', '55%'],

              data: [
                {
                  name: 'WindowsXP',
                  value: 12
                },
                {
                  name: 'Windows7',
                  value: 9
                },
                {
                  name: 'MacOS',
                  value: 8
                },
                {
                  name: 'Linux',
                  value: 5
                },
                {
                  name: 'others',
                  value: 8
                }
              ]
            }
          ]
        }
        if (option5 && typeof option5 === 'object') {
          myChart5.setOption(option5, true)
        }
        // echarts5
        var myChart6 = echarts.init(document.getElementById('pie4'))
        var option6 = null

        option6 = {
          color: [
            '#33FFCC',
            '#0096F3',
            '#2ECD73',
            '#F4667C',
            '#FAE266',
            '#A08BF0',
            '#D0570E',
            '#00C0E9'
          ],
          title: {
            text: '设备浏览器分布',
            textStyle: {
              // color: "#999"
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          // legend: {
          //   orient: "vertical",
          //   x: "left",
          //   data: ["爬虫", "客户端工具"]
          // },
          series: [
            {
              name: '设备浏览器',
              type: 'pie',
              radius: ['0%', '55%'],

              data: [
                {
                  name: 'IE6',
                  value: 2
                },
                {
                  name: 'IE11',
                  value: 5
                },
                {
                  name: 'Chorme',
                  value: 10
                },
                {
                  name: 'Safari',
                  value: 5
                },
                {
                  name: 'Friefox',
                  value: 5
                },
                {
                  name: 'others',
                  value: 8
                }
              ]
            }
          ]
        }
        if (option6 && typeof option6 === 'object') {
          myChart6.setOption(option6, true)
        }
        // echarts5
        var myChart7 = echarts.init(document.getElementById('pie5'))
        var option7 = null

        option7 = {
          color: [
            '#33FFCC',
            '#0096F3',
            '#2ECD73',
            '#F4667C',
            '#FAE266',
            '#A08BF0',
            '#D0570E',
            '#00C0E9'
          ],
          title: {
            // text: "设备浏览器分布",
            // textStyle: {
            // color: "#999"
            // }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          // legend: {
          //   orient: "vertical",
          //   x: "left",
          //   data: ["爬虫", "客户端工具"]
          // },
          series: [
            {
              name: '响应码',
              type: 'pie',
              radius: ['0%', '55%'],

              data: [
                {
                  name: 'count5xx',
                  value: 5
                },
                {
                  name: 'count3xx',
                  value: 10
                },
                {
                  name: 'count2xx',
                  value: 16
                },
                {
                  name: 'count500',
                  value: 5
                }
              ]
            }
          ]
        }
        if (option7 && typeof option7 === 'object') {
          myChart7.setOption(option7, true)
        }
        window.addEventListener('resize', function () {
          myChart1.resize()
          myChart2.resize()
          myChart3.resize()
          myChart4.resize()
        })
      })
    },
    getData () {
      this.params = this.$route.params
      if (this.$route.params.date.length < 8) {
        this.dateType = 'month'
      }
      var url =
        '/hedunwaf/report_all_info/?access_domain=' +
        this.$route.params.domain +
        '&date_time=' +
        this.$route.params.date
      var that = this
      this.axios
        .get(url)
        .then(function (response) {
          if (response.data.code) {
            that.$Message.error({
              content: response.data.msg,
              duration: 5
            })
            return
          }
          let data = response.data.data
          that.head_data = data.report_head_data
          // that.data1 = data.report_scan_waring;
          let pie_data = data.report_world_attack_source_rank
          let map_data = data.report_china_attack_source_rank
          let bar_data = data.report_attack_ip_rank
          let pie1_data = data.report_attack_type_rank
          let line_data = data.report_view_trend.access_logs_data_list
          that.data2 = pie_data
          that.data3 = map_data
          that.data4 = bar_data
          // that.data5 = pie1_data;
          for (let i = 0; i < line_data.length; i++) {
            that.linex.push(
              data.report_view_trend.access_logs_data_list[i].trend_time
            )
            that.line_access_data.push(
              data.report_view_trend.access_logs_data_list[i].trend_num
            )
            that.line_attack_data.push(
              data.report_view_trend.attack_logs_data_list[i].trend_num
            )
            that.line_inflow_data.push(
              data.report_view_trend.inflow_datasize_list[i]
                .trend_inflow_datasize
            )
            that.line_outflow_data.push(
              data.report_view_trend.outflow_datasize_list[i]
                .trend_outflow_datasize
            )
          }
          for (let i = 0; i < pie_data.length; i++) {
            that.pie_data.push({
              name: pie_data[i].attack_ip_loc,
              value: pie_data[i].attack_num
            })
          }
          for (let i = 0; i < map_data.length; i++) {
            if (map_data[i].attack_num > that.map_num) {
              that.map_num = map_data[i].attack_num
            }
            that.map_data.push({
              name: map_data[i].attack_ip_loc,
              value: map_data[i].attack_num
            })
          }
          for (let i = 0; i < bar_data.length; i++) {
            that.bar_datax.push(bar_data[i].attack_ip)
            that.bar_datay.push(bar_data[i].attack_num)
          }
          for (let i = 0; i < pie1_data.length; i++) {
            that.pie1_data.push({
              name: pie1_data[i].attack_type,
              value: pie1_data[i].attack_num
            })
          }
          that.wrapEcharts()
          that.spinShow = false
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  filters: {
    data () {
      return 12
    }
  }
}
</script>

<style scoped>
.router-link-exact-active {
  color: rgb(38, 233, 247) !important;
}

.layout-nav {
  display: flex;
  justify-content: space-between;
  background-color: #1e9fff;
}

.layout-nav li {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  color: #fff;
  font-size: 16px;
  margin: 0 20px;
  cursor: pointer;
}

.bgCard {
  background-color: #1e9fff;
  border-radius: 0;
  color: #fff;
  font-size: 14px;
  padding: 0px 16px 10px;
}

.bgCard p {
  margin: 5px 0;
}

.clear {
  clear: both;
  content: '';
  overflow: hidden;
}
.color {
  color: #515a6e;
}
.font {
  font-size: 30px;
}
</style>
