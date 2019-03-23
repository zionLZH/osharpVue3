// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
// element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/core/style/4B9E65/index.css'
// router
import App from './App'
import router from './router'
// baiduMap
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'DEoKuz2v5YYrRK2nibNRN8tv387ylFCb'
})

// Core
import { routerHook } from '@/core/lib/permission'
import { directiveInit } from '@/core/lib/directive'
import '@/assets/font-class/iconfont.css'
// var Dracula = require('graphdracula')
// console.log(Dracula)

// Extras
import qriously from 'vue-qriously'
import * as system from '@/utils/system'
import * as vExtend from './utils/vextend'

Vue.prototype.routerPath = vExtend.routerPath

directiveInit(Vue)
router.beforeEach(routerHook)

// 特殊需求
window.vModuleArr = system.dataGet('modules', true)
Vue.prototype.$moduleCheck = function (moduleName) {
  if (!window.vModuleArr || window.vModuleArr.constructor !== Array) {
    window.vModuleArr = system.dataGet('modules', true)
  }
  try {
    for (let i = 0; i < moduleName.length; i++) {
      if (window.vModuleArr.indexOf(moduleName[i]) === -1) {
        return false
      }
    }
  } catch (e) {
    return false
  }
  return true
}
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })
Vue.use(qriously)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
