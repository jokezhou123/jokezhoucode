<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-title">
        <span style="font-size: 18px;color: #fff;">ERP管理系统</span>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i>
            {{nickname}}
            <i class="iconfont icon-down"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="jumpTo('/user/profile')">
                <span style="color: #555;font-size: 14px;">个人信息</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/user/changepwd')">
                <span style="color: #555;font-size: 14px;">修改密码</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

    <!--中间-->
    <el-col :span="24" class="main">
            <aside :class="{showSidebar:!collapsed}">
              
              <div class="menu-toggle" @click.prevent="collapse">
                <i class="fa fa-bars" v-show="!collapsed"></i>
                <i class="fa fa-bars fa-rotate-90" v-show="collapsed"></i>
              </div>
              <el-menu :default-active="defaultActiveIndex" :collapse="collapsed" @select="handleSelect">
                <menutree :data="menus"></menutree>
              </el-menu>
            </aside>

      <!--右侧内容区-->
      <!--右侧内容区-->
      <section
        class="content-container"
        v-loading="$store.state.loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0)"
      >
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <!-- <router-view></router-view> -->
              <tab/>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import menutree from "./menutree";
import tab from "./tab";
import { bus } from "../bus.js";
import API from "../api/api_user";

export default {
  name: "home",
  components: { menutree,tab },
  created() {
    bus.$on("setNickName", text => {
      this.nickname = text;
    });

    bus.$on("goto", url => {
      if (url === "/login") {
        localStorage.removeItem("access-user");
      }
      this.$router.push(url);
    });
    console.log(this.$route.path)
    this.defaultActiveIndex = this.$route.path;
  },
  data() {
    return {
      defaultActiveIndex: "0",
      nickname: "",
      collapsed: false,
      menus: []
    };
  },
  methods: {
    handleSelect(index) {
      //console.log(index)
      console.log(this.$router)
      if (index.indexOf("http") != -1) {
        window.open(index);
      } else {
       this.$router.push(index);
      }
    },
    //折叠导航栏
    collapse: function() {
      this.collapsed = !this.collapsed;
    },
    jumpTo(url) {
      if (url.indexOf("http") != -1) {
      } else {
        this.defaultActiveIndex = url;
        this.$router.push(url); //用go刷新
      }
    },
    logout() {
      let that = this;
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonClass: "el-button--warning"
      })
        .then(() => {
          //确认
          that.loading = true;
          //
          localStorage.removeItem("currentUser");
          localStorage.removeItem("perms");
          localStorage.removeItem("access-token");
          localStorage.removeItem("menus");
          API.logout("").then(function(res) {
            that.$message.error({
              showClose: true,
              message: res.msg,
              duration: 2000
            });
          });
          that.$store.dispatch('isLogin',false)
          that.$router.go("/login"); //用go刷新
        })
        .catch(() => {});
    }
  },
  mounted() {
    //this.menus = JSON.parse(window.localStorage.getItem("menus"))
    this.menus = this.$store.state.nav
    //console.log('localStorage:',window.localStorage.getItem("menus"))
    //console.log('store:',this.$store.state.nav)
    // if (user) {
    //   user = JSON.parse(user);
    //   this.nickname = user.nickname || '';
    // }
    let that = this;
    API.tokenUser()
      .then(function(result) {
        that.nickname = result.name;
      })
      .catch(() => {
        localStorage.removeItem("access-token");
        that.$router.go("/login"); //用go刷新
      });
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .topbar-wrap {
    height: 50px;
    line-height: 50px;
    background: #373d41;
    padding: 0px;

    .topbar-btn {
      color: #fff;
    }
    /*.topbar-btn:hover {*/
    /*background-color: #4A5064;*/
    /*}*/
    .topbar-logo {
      float: left;
      width: 59px;
      line-height: 26px;
    }
    .topbar-logos {
      float: left;
      width: 120px;
      line-height: 26px;
    }
    .topbar-logo img,
    .topbar-logos img {
      height: 40px;
      margin-top: 5px;
      margin-left: 2px;
    }
    .topbar-title {
      float: left;
      text-align: left;
      width: 200px;
      padding-left: 10px;
      border-left: 1px solid #000;
    }
    .topbar-account {
      float: right;
      padding-right: 12px;
    }
    .userinfo-inner {
      cursor: pointer;
      color: #fff;
      padding-left: 10px;
    }
  }
  .main {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: absolute;
    top: 50px;
    bottom: 0px;
    overflow: hidden;
  }

  aside {
    min-width: 50px;
    background: #2f4050;
    &::-webkit-scrollbar {
      display: none;
    }

    &.showSidebar {
      overflow-x: hidden;
      overflow-y: auto;
    }

    .el-menu {
      height: 100%; /*写给不支持calc()的浏览器*/
      height: -moz-calc(100% - 80px);
      height: -webkit-calc(100% - 80px);
      height: calc(100% - 80px);
      border-radius: 0px;
      background-color: #2f4050;
      border-right: 0px;
    }

    // .el-submenu .el-menu-item,
    // .el-submenu__title {
    //   min-width: 60px;
    //   background-color: #2f4050;
    // }
    .el-menu {
      width: 250px;
    }
    .el-menu--collapse {
      width: 60px;
    }

    // .el-menu .el-menu-item,
    // .el-submenu .el-submenu__title {
    //   height: 46px;
    //   line-height: 46px;
    // }

    // .el-menu-item:hover,
    // .el-submenu .el-menu-item:hover,
    // .el-submenu__title:hover {
    //   background-color: #293846;
    //   color: rgb(240, 19, 19);
    // }
  }

  .menu-toggle {
    background: #4a5064;
    text-align: center;
    color: rgb(248, 242, 242);
    height: 26px;
    line-height: 30px;
  }

  .content-container {
    background: #fff;
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    padding-bottom: 1px;

    .content-wrapper {
      background-color: #fff;
      box-sizing: border-box;
    }
  }
}
</style>
