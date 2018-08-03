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
// 引入登录组件
import login from './components/login.vue';
// 引入支付详情页
import orderInfo from './components/orderInfo.vue';
// 支付成功组件
import paySuccess from './components/paySuccess.vue';
// 交易订单
import orderCenter from './components/orderCenter.vue';
// 订单详情
import lookOrder from './components/lookOrder.vue';

// 设置带上cookie
import axios from 'axios';
axios.defaults.withCredentials = true

// 注册路由规则
const router = new VueRouter({
  routes : [
    {path: '/', component: index },
    {path: '/index', component: index },
    {path: '/gobuy', component: gobuy },
    {path: '/self', component: self },
    {path: '/goodsInfo/:id', component: goodsInfo},
    {path: '/payOuder/:ids', component: payOuder },
    {path: '/login', component: login },
    {path: '/orderInfo/:orderid', component: orderInfo  },
    {path: '/paySuccess', component: paySuccess },
    {path: '/orderCenter', component: orderCenter },
    {path: "/lookOrder/:orderId",component: lookOrder,},
  ]
})

// 判断数据是否存在
let buyList = JSON.parse(window.localStorage.getItem('buyList'))||{};

// 实例化仓库
const store = new Vuex.Store({
  state: {
    buyList,
        // 是否登陆
    isLogin: false,
        // 来的路由
    fromPath:''
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
    },
    // 修改登陆状态
    changeLogin(state, isLogin) {
      // 直接赋值
      state.isLogin = isLogin;
    },
    // 修改来时的路由
    rememberFromPath(state,path){
      state.fromPath = path;
    },
  }
});

// 注册路由守卫
router.beforeEach((to, from, next) => {
  // 从哪来
  // console.log(from);
  // 保存数据
  store.commit('rememberFromPath',from.path);
  // 去订单支付页
  if(to.path=='/payOuder'){
    axios.get("http://47.106.148.205:8899/site/account/islogin")
    .then(response => {
      // console.log(response);
      if (response.data.code == "nologin") {
        // console.log("没登录");
        // 打到登录页
        next('/login');
      } else {
        // 登陆了 继续执行即可
        next();
         
      }
    })
    .catch(err => {
      // console.log(err);
    });
  }else{
    // 如果去的不是订单支付页 直接可以访问
    next();
  }
});

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
