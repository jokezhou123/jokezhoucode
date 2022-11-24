<template>
  <fragment class="menutree">
      <template v-for="menu in data" >
        <el-submenu :index="menu.path+''" v-if="!menu.leaf" :key="menu.id">
            <template slot="title">
            <i :class="menu.iconCls"></i>
            <span>{{menu.name}}</span>
            </template>
            <label>
            <menutree :data="menu.children"></menutree>
            </label>
        </el-submenu>
        <el-menu-item v-else :index="menu.path+''" :key="menu.id">
            <i :class="menu.iconCls"></i>
            <span slot="title">{{menu.name}}</span>
        </el-menu-item>
      </template> 
  </fragment>
</template>

<script>

import menutree from "@/view/menutree"

export default {
name: "menutree",
data() {
    return {
    menu_data: {}
    };
},
components: {
    menutree: menutree
},
props: ["data"],
};
</script>


<style scoped lang="scss">
  // .menutree {
  //   min-width: 50px;
  //   background: #2f4050;
  //   &::-webkit-scrollbar {
  //     display: none;
  //   }

    // &.showSidebar {
    //   overflow-x: hidden;
    //   overflow-y: auto;
    // }

    // .el-menu {
    //   height: 100%; /*写给不支持calc()的浏览器*/
    //   height: -moz-calc(100% - 80px);
    //   height: -webkit-calc(100% - 80px);
    //   height: calc(100% - 80px);
    //   border-radius: 0px;
    //   background-color: #131209;
    //   border-right: 0px;
    // }
    .el-submenu {
      background-color: #2F4050;
    }
        .el-menu-item {
      background-color: #2F4050;
    }
    .el-submenu .el-menu-item {
      min-width: 60px;
    }
    .el-menu {
      width: 180px;
    }
    .el-menu--collapse {
      width: 60px;
    }

    .el-menu .el-menu-item,
    .el-submenu .el-submenu__title {
      height: 46px;
      line-height: 46px;
    }

    .el-menu-item:hover,
    .el-submenu .el-menu-item:hover,
    .el-submenu__title:hover {
      background-color: #293846;
      color: rgb(246, 242, 242);
    }
  //}

</style>