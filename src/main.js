import Vue from 'vue'
import App from './App.vue'
import './assets/css/base.css'
import './assets/js/font.js'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Validator from 'vue-validator'
import $ from 'jquery'

Vue.config.debug = true
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(VueAwesomeSwiper)
Vue.use(Validator)
import routes from './router.config';
const router=new VueRouter({
  routes
});


//引入状态管理(共享数据流向)
import store from './store'

//引入loading组件
import loading from './components/loading'
Vue.use(loading);

//引入动画
import 'animate.css'

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store

})
