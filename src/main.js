import Vue from 'vue'
import App from './App.vue'
// 引入路由模块
import VueRouter from 'vue-router'
// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入iview组件
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// 引入vuex组件
import Vuex from 'vuex';

// 路由中间件
Vue.use(VueRouter)

Vue.use(iView);
// element中间件
Vue.use(ElementUI);
Vue.use(Vuex)
// 引入懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
// 引入index组件
import index from './components/index.vue';
// 引入购物车组件
import gobuy from './components/gobuy.vue';
// 引入会员中心组件
import self from './components/self.vue';
// 引入商品详情组件
import goodsInfo from './components/goodsInfo.vue';
// 引入商品结算路由
import payOuder from './components/payOuder.vue';

// 注册路由规则
const router = new VueRouter({
  routes : [
    {path: '/', component: index },
    {path: '/index', component: index },
    {path: '/gobuy', component: gobuy },
    {path: '/self', component: self },
    {path: '/goodsInfo/:id', component: goodsInfo},
    {path: '/payOuder/:ids', component: payOuder },
  ]
})

// 判断数据是否存在
let buyList = JSON.parse(window.localStorage.getItem('buyList'))||{};

// 实例化仓库
const store = new Vuex.Store({
  state: {
    buyList
  },
  // 类似于computed的属性
  getters: {
    totalCount(state) {
      let num = 0;
      // 遍历对象
      for (const key in state.buyList) {
        // 累加总数
        num += parseInt(state.buyList[key]);
      }
      return num;
    }
  },
  mutations: {
    increment(state,info) {
      if (state.buyList[info.goodId]) {
        // 解决字符串累加问题
        let oldNum = parseInt(state.buyList[info.goodId]);
        oldNum += parseInt(info.goodNum);
        // 重新赋值
        state.buyList[info.goodId] = oldNum;
      } else {
        // 没有 直接赋值这种方法 vue不会跟踪属性
        // state.buyList[info.goodId]=info.goodNum;
        // 需要使用 Vue.set(obj, 'newProp', 123) 替代
        Vue.set(state.buyList, info.goodId, parseInt(info.goodNum));
      }
    },
    changeCount(state,info){
      state.buyList[info.goodId]=info.goodNum;
    },
    delGoodById(state,id){
      // delete state.buyList[id];
      // 告诉Vue我已经删除了这个属性
      Vue.delete(state.buyList, id);
    }
  }
})

// 引入css文件
import './assets/statics/site/css/style.css';
Vue.config.productionTip = false

new Vue({
  el:'#app',
  router,
  render: h => h(App),
  store
})
 
// 注册一些逻辑
window.onbeforeunload = function () {
  // alert('onbeforeunload');
  // window.localStorage.setItem('onbeforeunload',123);
  window.localStorage.setItem('buyList',JSON.stringify(store.state.buyList));
}
