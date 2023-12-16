import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './assets/style.css'
import VueCookie from 'vue-cookie' 
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 全局函数及变量
import Global from './Global';
import { routers } from './routers/routerConfig'
// import baoHttp from '@/utils/ajax'

Vue.use(ElementUI, { size: 'small' })
Vue.use(Global)
Vue.use(VueRouter)

// 相对时间过滤器,把时间戳转换成时间
// 格式: 2020-02-25 21:43:23
Vue.filter('dateFormat', (dataStr) => {
  var time = new Date(dataStr);
  function timeAdd0 (str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str;
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
});


//全局组件
import MyMenu from './components/shopping/MyMenu';
Vue.component(MyMenu.name, MyMenu);
import MyList from './components/shopping/MyList';
Vue.component(MyList.name, MyList);
import MyLogin from './components/shopping/MyLogin';
Vue.component(MyLogin.name, MyLogin);
import MyRegister from './components/shopping/MyRegister';
Vue.component(MyRegister.name, MyRegister);
import ShoppingHome from './components/shopping/ShoppingHome';
Vue.component(ShoppingHome.name, ShoppingHome);
import MyMarkdown from './components/shopping/MyMarkdown';
Vue.component(MyMarkdown.name, MyMarkdown);
import About from './components/shopping/About';
Vue.component(About.name, About);
import Goods from './components/shopping/Goods';
Vue.component(Goods.name, Goods);
import Details from './components/shopping/Details';
Vue.component(Details.name, Details);
import ShoppingCart from './components/shopping/ShoppingCart';
Vue.component(ShoppingCart.name, ShoppingCart);
import ConfirmOrder from './components/shopping/ConfirmOrder';
Vue.component(ConfirmOrder.name, ConfirmOrder);
import Order from './components/shopping/Order';
Vue.component(Order.name, Order);

const router = new VueRouter(routers)

Vue.use(VueCookie)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
