<template>
  <div id="app">
    <el-container class="home-el-container" v-show="!isLoginPage">
      <el-header>
        <el-row :gutter="20">
          <el-col :span="20">
            <div class="grid-content bg-purple">
              <span class="home-logo-text">企享汇信息科技公司</span>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple">
              <el-dropdown class="home-help" style="margin-top: -9px;">
                <img id="u305_img" class="img " src="./assets/images/home/u305.svg" tabindex="0">
                <span class="el-dropdown-link" style="color:#fff !important;position: relative;top: 7px;">帮助</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>在线客服</el-dropdown-item>
                  <el-dropdown-item>帮助中心</el-dropdown-item>
                  <el-dropdown-item>更新日志</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
          <el-col :span="2">
            <div class="grid-content bg-purple" style="margin-top: -9px;">
              <el-dropdown class="home-help" @command="handleSettingDropDownCommand">
                <img id="u308_img" class="img " src="./assets/images/home/u308.svg" tabindex="0">
                <span class="el-dropdown-link" style="color:#fff !important;position: relative;top: 7px;">设置</span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="service-provider-management">服务商管理</el-dropdown-item>
                  <el-dropdown-item command="personal-center">个人中心</el-dropdown-item>
                  <el-dropdown-item>权限管理</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="215px">
          <div class="account-show">
            <!-- Unnamed (组 合) -->
                  <div id="u321" class="ax_default" data-left="-1" data-top="50" data-width="215" data-height="230">

                    <!-- Unnamed (动态面板) -->
                    <div id="u322" class="ax_default">
                      <div id="u322_state0" class="panel_state" data-label="State1" style="">
                        <div id="u322_state0_content" class="panel_state_content">
                        </div>
                      </div>
                    </div>

                    <!-- Unnamed (矩形) -->
                    <div id="u323" class="ax_default box_3" style="width:100px;height:100px;background-color:#000000;border-radius:50%;">
                      <img id="u323_img" class="img " src="./assets/images/home/u323.png"/>
                    </div>

                    <!-- Unnamed (图片) -->
                    <div id="u324" class="ax_default _图片_">
                      <img id="u324_img" class="img " src="./assets/images/home/WechatIMG25.jpeg"/>
                    </div>

                    <!-- Unnamed (矩形) -->
                    <div id="u325" class="ax_default box_2">
                      <div id="u325_div" class=""></div>
                      <div id="u325_text" class="text " style="position: relative;top: 22px;">
                        <p><span style="margin-left: 48px;">{{ userInfo.deptName }}</span></p>
                        <p><span style="margin-left: 48px;">{{ userInfo.userName }}</span></p>
                      </div>
                    </div>

                    <!-- Unnamed (矩形) -->
                    <div id="u326" class="ax_default box_2">
                      <div id="u326_div" class=""></div>
                      <div id="u326_text" class="text ">
                        <p><span @click="signOut">退出系统</span></p>
                      </div>
                    </div>
                  </div>
          </div>
          <div class="account-nav">
            <el-menu
              router
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#333"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-menu-item index="/home">
                <span slot="title">首页</span>
              </el-menu-item>
                <el-menu-item index="/account">
                  <span slot="title">客户</span>
                </el-menu-item>
              <!-- <el-menu-item index="/flow">
                <span slot="title">流程</span>
              </el-menu-item> -->
              <el-submenu index="3">
                <template slot="title">
                  <span>流程</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/flow">代理记账</el-menu-item>
                  <el-menu-item index="/once-flow">单次业务</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="1">
                <template slot="title">
                  <span>报表</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/diary-report">日记报表</el-menu-item>
                  <el-menu-item index="agent-report">代账报表</el-menu-item>
                  <el-menu-item index="/billing-list">开票列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <span>设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/service-product">服务产品</el-menu-item>
                  <el-menu-item index="/channel-dealer-management">渠道商管理</el-menu-item>
                  <el-menu-item index="/download-center">下载管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </div>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
    <router-view v-show="isLoginPage"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  metaInfo: {
    title: '首页'
  },
  data () {
    return {
      circleUrl: './assets/images/home/WechatIMG25.jpeg',
      squareUrl: 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
      sizeList: ['large', 'medium', 'small'],
      companyInformation: {
        companyLogo: '../assets/images/home/WechatIMG25.jpeg',
        companyDepartmentName: '',
        companyEmployeeName: ''
      }
    }
  },
  methods: {
    signOut () {
      this.$router.push({ path: './' })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSettingDropDownCommand (command) {
      if (command === 'personal-center') {
        this.$router.push({ path: '/personal-center' })
      }
      if (command === 'service-provider-management') {
        this.$router.push({ path: '/service-provider-management' })
      }
    },
    // 获取用户信息
    getUserInfo () {
      this.$store.dispatch('getSysInfo')
    }
  },
  mounted () {
    this.getUserInfo()
  },
  computed: {
    isLoginPage () {
      return this.$route.path === '/'
    },
    ...mapState({
      // 获取用户信息
      userInfo: state => state.sysUser.user.user
    })
  }
}
</script>

<style>
  .el-header {
    background-color: #333;
    color: #fff;
    line-height: 50px;
    padding: 8px 0px 0px 20px !important;
  }
  .el-aside {
    background-color: #333;
    color: #fff;
    text-align: center;
    line-height: 20px;
  }
  .home-logo-text{
    font-family: '微软雅黑 Bold', '微软雅黑';
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #FFFFFF;
    text-align: left !important;
    padding-left: 10px;
  }
  .settings-text{
    font-family: 'PingFang SC Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    color: #FFFFFF;
    text-align: center;
    vertical-align: super;
    padding-left: 8px;
  }
  .el-dropdown-link{
    font-family: 'PingFang SC Regular', 'PingFang SC';
    font-weight: 400;
    font-style: normal;
    /* color: #FFFFFF; */
    text-align: center;
    vertical-align: super;
    padding-left: 8px;
  }
  .acccount-information-show{
    border-width: 0px;
    position: absolute;
    left: -10px;
    top: -8px;
    width: 100px;
    height: 100px;
  }
  #u321 {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:0px;
  height:0px;
}
#u322 {
  border-width:0px;
  position:absolute;
  left:-1px;
  top:75px;
  width:270px;
  height:230px;
  overflow:hidden;
}
#u322_state0 {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:270px;
  height:230px;
  -ms-overflow-x:hidden;
  overflow-x:hidden;
  -ms-overflow-y:hidden;
  overflow-y:hidden;
  background-color:rgba(67, 74, 84, 1);
  background-image:url('./assets/images/home/bg.jpeg');
  background-position:center center;
  background-repeat:no-repeat;
  background-attachment:scroll;
  background-size:cover;
}
#u322_state0_content {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:1px;
  height:1px;
}
#u323_img {
  border-width:0px;
  position:absolute;
  left:0px;
  top:15px;
  width:270px;
  height:auto;
}
#u323 {
  border-width:0px;
  position:absolute;
  left:-1px;
  top:60px;
  width:270px;
  height:auto;
}
#u323_text {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:0px;
  visibility:hidden;
  word-wrap:break-word;
}
#u324_img {
  border-width:0px;
  position:absolute;
  left:17px;
  top:7px;
  width:100px;
  height:100px;
}
#u324 {
  border-width:0px;
  position:absolute;
  left:59px;
  top:67px;
  width:80px;
  height:80px;
}
#u324_text {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:0px;
  visibility:hidden;
  word-wrap:break-word;
}
#u325_div {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:200px;
  height:60px;
  background:inherit;
  background-color:rgba(255, 255, 255, 0);
  border:none;
  border-radius:0px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
  font-family:'微软雅黑 Bold', '微软雅黑';
  font-weight:700;
  font-style:normal;
  color:#FFFFFF;
}
#u325 {
  border-width:0px;
  position:absolute;
  left:-1px;
  top:160px;
  width:200px;
  height:60px;
  font-family:'微软雅黑 Bold', '微软雅黑';
  font-weight:700;
  font-style:normal;
  color:#FFFFFF;
}
#u325_text {
  border-width:0px;
  position:absolute;
  left:2px;
  top:2px;
  width:196px;
  word-wrap:break-word;
}
#u326_div {
  border-width:0px;
  position:absolute;
  left:0px;
  top:0px;
  width:101px;
  height:30px;
  background:inherit;
  background-color:rgba(255, 255, 255, 0);
  box-sizing:border-box;
  border-width:1px;
  border-style:solid;
  border-color:rgba(255, 255, 255, 1);
  border-radius:87px;
  -moz-box-shadow:none;
  -webkit-box-shadow:none;
  box-shadow:none;
  color:#FFFFFF;
}
#u326 {
  border-width:0px;
  position:absolute;
  left:75px;
  top:232px;
  width:101px;
  height:30px;
  color:#FFFFFF;
}
#u326_text {
  border-width:0px;
  position:absolute;
  left:2px;
  top:6px;
  width:97px;
  word-wrap:break-word;
}
.account-nav{
  margin-top: 230px;
}
.el-menu{
  border-right: none !important;

}
.el-menu-item{
    font-family: '微软雅黑' !important;
    font-weight: 400 !important;
    font-style: normal !important;
    font-size: 12px !important;
    color: #FFFFFF !important;
    text-align: left !important;
}
.el-submenu__title{
    font-family: '微软雅黑' !important;
    font-weight: 400 !important;
    font-style: normal !important;
    font-size: 12px !important;
    color: #FFFFFF !important;
    text-align: left !important;
}
.el-submenu>.el-submenu__title .el-submenu__icon-arrow {
  -webkit-transform: rotateZ(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotateZ(-90deg);
  color: #fff;
}
/*菜单展开*/
.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
  -webkit-transform: rotateZ(360deg) !important;
  -ms-transform: rotate(360deg) !important;
  transform: rotateZ(360deg) !important;
  color: #fff;
}
.home-el-container {
  height: 100%;
}
html, body, #app {
  height: 100%;
}
.home {
  height: 100%;
}
.home-help{
  border: none !important;
  padding: 0px 0px !important;
}
.el-select-dropdown__item.selected {
    color: #606266 !important;
    font-weight: 400 !important;
}
</style>
