// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueTouch from 'vue-touch'
import Vuex from 'vuex'
import App from './App'
import store from './store'

Vue.use(VueResource).use(VueTouch).use(Vuex)

Vue.config.productionTip = false

Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
