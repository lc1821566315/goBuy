import Vue from 'vue'
// 引入路由模块
// import VueRouter from 'vue-router'
import App from './App.vue'
// 路由中间件
// Vue.use(VueRouter)


// 引入css文件
import './assets/statics/site/css/style.css';
Vue.config.productionTip = false

new Vue({
  el:'#app',
  render: h => h(App),
})
