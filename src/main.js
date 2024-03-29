import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import qs from 'qs';
import wangEditor from "wangeditor";


Vue.prototype.wangEditor = wangEditor;// 红色的wangEditor是this打点调用的名字
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.qs = qs;

Vue.prototype.axios = axios;//添加Axios框架发送请求

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
