import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile')
      }
    ]
  },
  {
    path: '/user/update',
    name: 'user-edit',
    component: () => import('@/views/user-edit')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true // 开启 Props 传参
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/chart',
    name: 'chart',
    component: () => import('@/views/chart')
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  const token = store.state.user.token
  // 没登录却访问user下的路由
  if (!token && to.path.startsWith('/user')) {
    return next('/login?returnUrl=' + encodeURIComponent(to.fullPath))
  }
  // 其他情况放行
  next()
})
export default router
