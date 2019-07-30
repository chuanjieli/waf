<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed',left:0, width: '100%',zIndex:100000}">
        <Menu mode="horizontal" theme="dark" active-name="4">
          <Icon
            @click.native="hideSider"
            :class="rotateIcon"
            :style="{position: 'absolute',zIndex: 10000,top:'20px',left:'125px'}"
            type="md-menu"
            color="#E1E1E1"
            size="30"
          ></Icon>
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <!-- <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>Item 1
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>Item 2
            </MenuItem>
            <MenuItem name="3">
              <Icon type="ios-analytics"></Icon>Item 3
            </MenuItem>-->
            <MenuItem name="4">
              <Tooltip placement="bottom">
                <Icon type="md-person" />
                <span>{{user}}</span>
                <div slot="content" @click="logout">
                  <p>退出登录</p>
                </div>
              </Tooltip>
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider
          ref="side1"
          hide-trigger
          collapsible
          :collapsed-width="0"
          v-model="isCollapsed"
          :style="{position: 'fixed', height: '100%', left: 0, overflow: 'auto',background: '#fff',marginTop:'64px',zIndex:100000}"
        >
          <Menu
            :active-name="path"
            theme="dark"
            width="auto"
            style="height:100%"
            :open-names="[path]"
            :class="menuitemClasses"
          >
            <MenuItem name="home" to="/home">
              <Icon type="ios-navigate"></Icon>
              <span>首页</span>
            </MenuItem>
            <MenuItem name="weblist" to="/weblist">
              <Icon type="logo-buffer"></Icon>
              <span>网站列表</span>
            </MenuItem>
            <MenuItem name="application" to="/application">
              <Icon type="ios-keypad"></Icon>
              <span>应用管理</span>
            </MenuItem>
            <MenuItem name="certificate" to="/certificate">
              <Icon type="ios-paper-outline" />
              <span>证书管理</span>
            </MenuItem>
            <MenuItem name="waf" to="/waf">
              <Icon type="ios-planet-outline" />
              <span>WAF策略</span>
            </MenuItem>
            <MenuItem name="waflogs" to="/waflogs">
              <Icon type="ios-planet-outline" />
              <span>WAF日志</span>
            </MenuItem>
            <MenuItem name="cclogs" to="/cclogs">
              <Icon type="ios-planet-outline" />
              <span>CC日志</span>
            </MenuItem>
            <!-- <MenuItem name="nodes" to="/nodes">
              <Icon type="md-git-network" />
              <span>节点管理</span>
            </MenuItem>
            <MenuItem name="users" to="/users">
              <Icon type="md-people" />
              <span>用户管理</span>
            </MenuItem>-->
            <Submenu name="ttt">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>Item 3
              </template>
              <MenuItem name="ttt" to="/ttt">Option 1</MenuItem>
              <MenuItem name="3-2">Option 2</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>Item 3
              </template>
              <MenuItem name="4-1">Option 1</MenuItem>
              <MenuItem name="4-2">Option 2</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0'}">
          <Content
            ref="cont"
            :style="{margin:'65px 0 0 200px',height:'calc(100vh - 105px)' ,background: '#F2F2F2'}"
          >
            <router-view style="padding-bottom:15px" v-if="isRouterAlive"></router-view>
            <footer ref="footer">
              <div style="margin:0 auto;width:100%">©和盾 版权所有</div>
            </footer>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  // 子页面不跳转刷新
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      icon: 'open',
      isCollapsed: false,
      path: this.$route.path.substr(1),
      isRouterAlive: true,
      user: ''
    }
  },
  created () {
    this.user = JSON.parse(window.localStorage.getItem('user'))
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    hideSider () {
      if (this.icon === 'open') {
        this.icon = 'close'
        this.$refs.footer.style.width = '100%'
        this.$refs.cont.$el.style.marginLeft = '0px'
      } else {
        this.icon = 'open'
        this.$refs.cont.$el.style.marginLeft = '200px'
        this.$refs.footer.style.width = 'calc(100% - 200px)'
      }
      this.$refs.side1.toggleCollapse()
    },
    logout () {
      localStorage.removeItem('user')
      localStorage.removeItem('Authorization')
      this.$router.push('/login')
    }
  },
  mounted () {},
  computed: {
    rotateIcon () {
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
    },
    menuitemClasses () {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    }
  },
  watch: {}
}
</script>
<style scoped>
.ivu-layout-header {
  padding: 0;
}
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 90px;
  height: 37px;
  background: url('../assets/img/logo1.png');
  background-size: cover;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 25px;
}
.layout-nav {
  width: 100px;
  margin: 0 auto;
  margin-right: 0px;
}
.icon {
  float: left;
  top: 15px;
  position: relative;
  left: 130px;
}
footer {
  position: fixed;
  bottom: 0;
  width: calc(100% - 200px);
  z-index: 99999;
  background-color: #fff;
  padding: 10px 0;
  text-align: center;
  border-top: 1px solid rgb(228, 225, 225);
}
.rotate-icon {
  transition: all 0.3s;
  transform: rotate(-90deg);
}
.collapsed-menu {
  width: 0px;
  transition: width 0.1s ease;
}

.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
