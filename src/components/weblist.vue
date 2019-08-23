<template>
  <div>
    <Row style="padding:10px" :gutter="16">
      <Col span="24">
        <Card :bordered="false">
          <p slot="title">受防护网站列表</p>
          <Table stripe :columns="columns1" :data="data1"></Table>
        </Card>
      </Col>
    </Row>
    <Spin size="large" fix v-if="spinShow"></Spin>
  </div>
</template>
<script>
export default {
  name: 'weblist',
  data () {
    return {
      spinShow: true,
      columns1: [
        {
          title: '序号',
          key: 'id',
          align: 'center'
        },
        {
          title: '网站名称',
          key: 'web_name',
          align: 'center'
        },
        {
          title: '网站域名',
          key: 'web_domain',
          align: 'center'
        },
        {
          title: '协议类型',
          key: 'web_protocol',
          align: 'center'
        },
        {
          title: '接入时间',
          key: 'protection_time',
          align: 'center'
        },
        {
          title: '报表',
          key: 'cont',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    to:
                      '/weblist/protectreport/' +
                      params.row.web_domain +
                      '/' +
                      this.day
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      // this.show(params.index);
                    }
                  }
                },
                '日报'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    to:
                      '/weblist/protectreport/' +
                      params.row.web_domain +
                      '/' +
                      this.month
                  },
                  on: {
                    click: () => {
                      // this.remove(params.index);
                    }
                  }
                },
                '月报'
              )
            ])
          }
        }
      ],
      data1: [
        {
          id: 1,
          web_name: '广目',
          web_domain: 'www.cmri.cn',
          ip: '10.1.4.93',
          web_protocol: 'HTTP',
          protection_time: '2019-05-02',
          cont: '日包'
        },
        {
          id: 2,
          web_name: '广目',
          web_domain: 'www.cmri.cn',
          ip: '10.1.4.93',
          web_protocol: 'HTTP',
          protection_time: '2019-05-02',
          cont: '日包'
        }
      ],
      day: '',
      month: ''
    }
  },
  methods: {
    dateStr (param = 0) {
      let date = new Date()
      let year = date.getFullYear()
      let month = (date.getMonth() + 1).toString().padStart(2, 0)
      let day = date
        .getDate()
        .toString()
        .padStart(2, 0)
      let str = year + '-' + month
      if (param) {
        str += '-' + day
      }
      return str
    }
  },
  created () {
    this.day = this.dateStr(1)
    this.month = this.dateStr()
    var that = this
    this.axios
      .get('/web_all_list/')
      .then(function (response) {
        that.data1 = response.data.data.all_web_list
        that.spinShow = false
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
</script>
