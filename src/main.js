// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueTouch from 'vue-touch'

Vue.use(VueResource).use(VueTouch)

Vue.config.productionTip = false

Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
