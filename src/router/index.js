import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from '../views/login.vue'
// import table from '../views/table.vue'

const scTable = () => import('../views/table')
const index = () => import('../views/index')
const scManage = () => import('../views/scManage')
const student = () => import('../views/student')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/index',
        name: '首页',
        component: index
      },
      {
        path: '/scTable',
        name: '学生成绩查询',
        component: scTable
      },
      {
        path: '/scManage',
        name: '导入学生成绩',
        component: scManage
      },
      {
        path: '/student',
        name: '学生成绩统计',
        component: student
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
