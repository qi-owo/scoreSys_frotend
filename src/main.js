import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Blob from './vendor/Blob'
// import Export2Excel from './vendor/Export2Excel'

// 引入eCharts
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

import ElementUI from 'element-ui'; //引入饿了么包
import 'element-ui/lib/theme-chalk/index.css'; //引入饿了么样式
Vue.use(ElementUI); // 使用饿了么UI

import api from "./api/index" // 引入封装的axios的接口函数
Vue.prototype.$api = api // 将封装的axios接口函数注册到原型链上

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
