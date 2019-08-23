<template>
  <div id="home" style="position: relative;">
    <Row style="padding:10px" :gutter="16">
      <Col span="6">
        <DatePicker
          type="date"
          :value="date || new Date()"
          :options="options"
          :editable="editable"
          style="width: 200px"
          @on-change="handleChange"
        ></DatePicker>
        <Button type="primary" @click="subDate">提交</Button>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="12">
        <Card style="background:#1E9FFF;color:#FFF">
          <p style="color:#fff" slot="title">网站访问次数</p>
          <p>
            <Icon type="ios-ribbon-outline" size="40" style="margin:0 20px;vertical-align: sub;" />
            <span class="fontSize">{{access_num}}</span>
            <span>&nbsp;&nbsp;次</span>
          </p>
        </Card>
      </Col>
      <Col span="12">
        <Card style="background:#E65947;color:#FFF">
          <p style="color:#fff" slot="title">拦截攻击次数</p>
          <p>
            <Icon type="ios-shuffle" size="40" style="margin:0 20px;vertical-align: sub;" />
            <span class="fontSize">{{attack_num}}</span>
            <span>&nbsp;&nbsp;次</span>
          </p>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">攻击与访问趋势图</p>
          <div id="line1" style="height:550px"></div>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="12">
        <Card :bordered="false">
          <p slot="title">受攻击域名排行</p>
          <Table stripe :columns="columns1" :data="data1"></Table>
        </Card>
      </Col>
      <Col span="12">
        <Card :bordered="false">
          <p slot="title">攻击类型排行</p>
          <Table stripe :columns="columns2" :data="data2"></Table>
        </Card>
      </Col>
    </Row>
    <Row style="padding:10px" :gutter="16">
      <Col span="12">
        <Card :bordered="false">
          <p slot="title">攻击区域分布情况</p>
          <Table stripe :columns="columns3" :data="data3"></Table>
        </Card>
      </Col>
      <Col span="12">
        <Card :bordered="false">
          <p slot="title">攻击源IP排行</p>
          <Table stripe :columns="columns4" :data="data4"></Table>
        </Card>
      </Col>
    </Row>

    <div ref="table" v-show="show">
      <Table stripe :columns="columns2" :data="data2"></Table>
    </div>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'home',
  data () {
    return {
      options: {
        disabledDate (date) {
          return date && date.valueOf() > Date.now()
        }
      },
      editable: false, // 日期禁止输入
      columns1: [
        {
          title: '受攻击域名',
          key: 'be_attack_domain'
        },
        {
          title: '次数及占比',
          key: 'attack_num',
          width: 160,
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    marginRight: '5px'
                  }
                },
                params.row.attack_num
              ),
              h('span', '(' + params.row.attack_percentage + ')')
            ])
          }
        }
      ],
      data1: [
        {
          be_attack_domain: 'www.hedun.com',
          attack_num: '638(100.00%)'
        },
        {
          be_attack_domain: 'www.security.cmri.cn',
          attack_num: '234(80.00%)'
        }
      ],
      columns2: [
        {
          title: '攻击类型',
          key: 'attack_type'
        },
        {
          title: '次数及占比',
          key: 'attack_num',
          width: 160,
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    marginRight: '5px'
                  }
                },
                params.row.attack_num
              ),
              h('span', '(' + params.row.attack_percentage + ')')
            ])
          }
        }
      ],
      data2: [
        {
          attack_type: 'SQL注入攻击',
          attack_num: '167(22.58%)'
        },
        {
          attack_type: '文件限制',
          attack_num: '34(23.00%)'
        },
        {
          attack_type: '漏洞防护',
          attack_num: '34(23.00%)'
        },
        {
          attack_type: '协议违规',
          attack_num: '34(23.00%)'
        },
        {
          attack_type: 'HTTP请求出错',
          attack_num: '34(23.00%)'
        },
        {
          attack_type: '文件注入攻击',
          attack_num: '34(23.00%)'
        }
      ],
      columns3: [
        {
          title: '攻击区域',
          key: 'attack_ip_loc'
        },
        {
          title: '次数及占比',
          key: 'attack_num',
          width: 160,
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    marginRight: '5px'
                  }
                },
                params.row.attack_num
              ),
              h('span', '(' + params.row.attack_percentage + ')')
            ])
          }
        }
      ],
      data3: [
        {
          attack_ip_loc: '北京',
          attack_num: '636(99.69%)'
        },
        {
          attack_ip_loc: '河南',
          attack_num: '2(0.31%)'
        }
      ],
      columns4: [
        {
          title: '攻击源IP',
          key: 'attack_ip',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    marginRight: '5px'
                  }
                },
                params.row.attack_ip
              ),
              h('span', '(' + params.row.attack_ip_loc + ')')
            ])
          }
        },
        {
          title: '次数及占比',
          key: 'attack_percentage',
          width: 160,
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    marginRight: '5px'
                  }
                },
                params.row.attack_num
              ),
              h('span', '(' + params.row.attack_percentage + ')')
            ])
          }
        }
      ],
      data4: [
        {
          attack_ip: '117.136.138.9 北京',
          attack_percentage: '605(94,83%)'
        },
        {
          attack_ip: '117.136.0.133 北京',
          attack_percentage: '28(4.39%)'
        },
        {
          attack_ip: '221.130.253.135 北京',
          attack_percentage: '3(0.47%)'
        },
        {
          attack_ip: '42.236.10.125 河南',
          attack_percentage: '2(0.31%)'
        }
      ],
      show: false,
      access_num: '3456',
      attack_num: '234',
      spinShow: true,
      line_access_trend: [],
      line_attack_trend: [],
      date: ''
    }
  },
  created () {
    this.request()
  },
  mounted () {},
  methods: {
    handleChange (date) {
      this.date = date
    },
    subDate () {
      this.spinShow = true
      this.request(this.date)
    },
    request (date = '') {
      var that = this
      this.axios
        .get('/home_all_info/?date_time=' + date)
        .then(function (response) {
          console.log(response)

          if (response.data.code) {
            that.$Message.error({
              content: response.data.msg,
              duration: 5
            })
            return
          }
          let resData = response.data.data
          that.data4 = resData.home_attack_ip_rank
          that.data3 = resData.home_attack_source_rank
          that.data2 = resData.home_attack_type_rank
          that.data1 = resData.home_be_attack_domain_rank
          that.access_num = resData.home_head_data.all_web_access_num
          that.attack_num = resData.home_head_data.all_web_attack_num
          let access = resData.home_view_trend.access_logs_data_list
          let attack = resData.home_view_trend.attack_logs_data_list
          that.line_access_trend = []
          that.line_attack_trend = []
          for (let i = 0; i < access.length; i++) {
            that.line_access_trend.push(access[i].access_num)
            that.line_attack_trend.push(attack[i].attack_num)
          }
          that.drawEcharts()
          that.spinShow = false
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    drawEcharts () {
      this.$nextTick(() => {
        var that = this
        var line1 = document.getElementById('line1')
        var myChart2 = echarts.init(line1)
        var timeData = [
          '0:00',
          '0:30',
          '1:00',
          '1:30',
          '2:00',
          '2:30',
          '3:00',
          '3:30',
          '4:00',
          '4:30',
          '5:00',
          '5:30',
          '6:00',
          '6:30',
          '7:00',
          '7:30',
          '8:00',
          '8:30',
          '9:00',
          '9:30',
          '10:00',
          '10:30',
          '11:00',
          '11:30',
          '12:00',
          '12:30',
          '13:00',
          '13:30',
          '14:00',
          '14:30',
          '15:00',
          '15:30',
          '16:00',
          '16:30',
          '17:00',
          '17:30',
          '18:00',
          '18:30',
          '19:00',
          '19:30',
          '20:00',
          '20:30',
          '21:00',
          '21:30',
          '22:00',
          '22:30',
          '23:00',
          '23:30'
        ]
        var option2 = {}
        option2 = {
          backgroundColor: '#fff',
          color: [
            'red',
            '#1a9bfc',
            '#99da69',
            '#e32f46',
            '#7049f0',
            '#fa704d',
            '#01babc'
          ],
          // title: {
          //   text: "攻击与访问趋势图",
          //   x: "left"
          // },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },

          toolbox: {
            show: true,
            feature: {
              mark: {
                show: true
              },
              // dataView: {
              //   show: true,
              //   readOnly: true,
              //   optionToContent: function(opt) {
              //     that.show = true;
              //     var table = that.$refs.table;
              //     return table;
              //   }
              // },
              magicType: {
                show: true,
                type: ['line', 'bar']
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          legend: {
            data: this.name,
            textStyle: {
              fontSize: 12,
              color: '#ccc'
            },
            right: 'center'
          },
          axisPointer: {
            link: {
              xAxisIndex: 'all'
            }
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 0,
              end: 100,
              xAxisIndex: [0, 1]
            },
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: 100,
              xAxisIndex: [0, 1]
            }
          ],
          grid: [
            {
              left: 40,
              right: 40
            },
            {
              left: 40,
              right: 40
            }
          ],
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisLine: {
                onZero: true
              },
              data: timeData
            },
            {
              gridIndex: 1
            }
          ],

          yAxis: [
            {
              type: 'value',
              name: '单位:',
              min: 0
              // interval: 25,
            },
            {
              gridIndex: 1
            }
          ],
          series: [
            {
              name: '攻击',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 9,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              markArea: {
                silent: true,
                label: {
                  normal: {
                    position: ['10%', '50%']
                  }
                }
              },
              data: that.line_attack_trend
            },
            {
              name: '访问',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 9,
              showSymbol: false,
              lineStyle: {
                normal: {
                  width: 1
                  // color: 'cyan'
                }
              },
              markArea: {
                silent: true,
                label: {
                  normal: {
                    position: ['10%', '50%']
                  }
                }
              },
              data: that.line_access_trend
            }
          ]
        }

        if (option2 && typeof option2 === 'object') {
          myChart2.setOption(option2)
        }
        window.addEventListener('resize', function () {
          myChart2.resize()
        })
      })
    }
  },
  watch: {}
}
</script>
<style scoped>
.fontSize {
  font-size: 30px;
  font-weight: 600;
}
</style>
