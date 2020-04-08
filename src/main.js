// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import http from '@/plugins/http' // 自定义全局样式
import moment from 'moment'
Vue.use(ElementUI)
// 生产 true  开发 false
Vue.config.productionTip = false
// 使用axios自定义开发插件
Vue.use(http)

// 全局过滤器 处理日期

Vue.filter('fmtdate', v => {
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
