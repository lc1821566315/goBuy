import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 路由中间件
Vue.use(VueRouter)
// element中间件
Vue.use(ElementUI);
// 引入懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
// 引入index组件
import index from './components/index.vue';
// 引入购物车组件
import gobuy from './components/gobuy.vue';
// 引入会员中心组件
import self from './components/self.vue';

// 注册路由规则
const router = new VueRouter({
  routes : [
    {path: '/', component: index },
    {path: '/index', component: index },
    {path: '/gobuy', component: gobuy },
    {path: '/self', component: self },
  ]
})


// 引入css文件
import './assets/statics/site/css/style.css';
Vue.config.productionTip = false

new Vue({
  el:'#app',
  router,
  render: h => h(App),
})
