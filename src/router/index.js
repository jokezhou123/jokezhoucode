import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import store from '@/vuex/store'
// import Dashboard from '@/view/Dashboard'
// import Index from '@/view/welcome/index.vue'
// import BookList from '@/view/role/list'
// import UserList from '@/view/user/list'
// import UserChangePwd from '@/view/user/changepwd'
// import UserProfile from '@/view/user/profile'
// import MenuList from '@/view/menu/list'
// import Book from '@/view/book/list'
// import allOrderType from '@/view/allOrderType/list'
// import baseVendor from '@/view/baseVendor/list'


// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/view/Login'], resolve)

Vue.use(Router)

// 解决报错
const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

console.log('路由开始')

let routes =  [
  // {
  //   path: '/index',
  //   name: '首页',
  //   component: () => import('@/view/welcome/index.vue')
  // },
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/dashboard',
    leaf: true, // 只有一个节点
    menuShow: true,
    iconCls: 'fa fa-home', // 图标样式class
    children: [
      {
        path: 'dashboard', 
        component: () => import('@/view/Dashboard'), 
        name: 'dashboard', 
        menuShow: true
      }
    ]
  },
  // {
  //   path: '/',
  //   component: Home,
  //   name: '图书管理',
  //   menuShow: true,
  //   leaf: true, // 只有一个节点
  //   iconCls: 'fa fa-user', // 图标样式class
  //   children: [
  //     {
  //       path: '/book', 
  //       component: () => import('@/view/book/list'), 
  //       name: '图书列表', 
  //       menuShow: true
  //     },
  //     {
  //       path: '/allOrderType', 
  //       component: () => import('@/view/allOrderType/list'), 
  //       name: '总订单类型', 
  //       menuShow: false
  //     },
  //     {
  //       path: '/baseVendor', 
  //       component: () => import('@/view/baseVendor/list'), 
  //       name: '供应商管理', 
  //       menuShow: true
  //     }
  //   ]
  // },
  // {
  //   path: '/',
  //   component: Home,
  //   name: '用户管理',
  //   menuShow: true,
  //   leaf: true, // 只有一个节点
  //   iconCls: 'fa fa-user', // 图标样式class
  //   children: [
  //     {
  //       path: '/admin/user', 
  //       component: () => import('@/view/user/list'), 
  //       name: '用户列表', 
  //       menuShow: true
  //     }
  //   ]
  // },
  // {
  //   path: '/',
  //   component: Home,
  //   name: '菜单管理',
  //   menuShow: true,
  //   leaf: true, // 只有一个节点
  //   iconCls: 'fa fa-server', // 图标样式class
  //   children: [
  //     {
  //       path: '/admin/menu', 
  //       component: () => import('@/view/menu/list'), 
  //       name: '菜单列表', 
  //       menuShow: true
  //     }
  //   ]
  // },
  // {
  //   path: '/',
  //   component: Home,
  //   name: '角色管理',
  //   menuShow: true,
  //   leaf: true,
  //   iconCls: 'fa fa-group',
  //   children: [
  //     {
  //       path: '/admin/role', 
  //       component: () => import('@/view/role/list'), 
  //       name: '角色管理', 
  //       menuShow: true
  //     },
  //   ]
  // },

  // {
  //   path: '/',
  //   component: Home,
  //   name: '文件管理',
  //   menuShow: true,
  //   leaf: true,
  //   iconCls: 'fa fa-group',
  //   children: [
  //     {
  //       path: '/cms/file', 
  //       component: FileList, 
  //       name: '文件管理', 
  //       menuShow: true
  //     },
  //   ]
  // },
  {
    path: '/',
    component: Home,
    name: '设置',
    menuShow: true,
    iconCls: 'iconfont icon-setting1',
    children: [
      {
        path: '/user/profile', 
        component: () => import('@/view/user/profile'), 
        name: '个人信息', 
        menuShow: true
      },
      {
        path: '/user/changepwd', 
        component: () => import('@/view/user/changepwd'), 
        name: '修改密码', 
        menuShow: true
      }
    ]
  },
]

let router = new Router({
  mode: 'history',
  routes: routes
})

//var isF = false; //这个是用于判断动态路由是否已经被获取
const routerData = (result) => {
  let currenRoutes = router.options.routes;
  //console.log(router)
  //console.log(currenRoutes)
  if (result) {
    result.forEach((item) => {
      // has用于判断当前路由中是否已经具有，避免重复
      var has = currenRoutes.some((it) => it.path == item.path);
      if (!has) {
        // currenRoutes.push({
        //   path: `${item.path}`,
        //   name: item.name,
        //   meta: {
        //     title: item.name,
        //   },
        //   component: () => import('@/view/'+item.component+'/list'),
        // });
        router.addRoute('home',{
          path: `${item.path}`,
          name: item.name,
          meta: {
            title: item.name,
          },
          component: () => import('@/view/'+item.component+'/list'),
        });
      }
      if (item.children && item.children.length) {
        routerData(item.children);
      }
    });
  }
  //console.log(currenRoutes)
  //router.addRoutes(currenRoutes)
  //return currenRoutes
}
//console.log(router)
router.beforeEach((to, from, next) => {
  let user = window.localStorage.getItem('access-token');
  let isF = store.state.isLogin
  if(!isF && user){
    console.log('加载路由规则',router)
    //let add = JSON.parse(window.localStorage.getItem("menus"));
    let add = store.state.nav || ''
    routerData(add);
    store.dispatch('isLogin',true)
    //console.log('加载完毕路由规则',router)
  }
  console.log('开始执行规则')
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-token')
    //window.localStorage.removeItem('menus')
    
    //window.localStorage.removeItem('access-user')
    console.log('放行login')
    next()
  } else if (to.path.startsWith('/home')) {
    //addRoutes()
    console.log('放行2')
    next({path: '/dashboard'})
  } else {
    //let user = window.localStorage.getItem('access-token')
    if (!user) {
      
      next({path: '/login'})
    } else {
      console.log('放行3')
      next()
    }
  }
})

export default router
