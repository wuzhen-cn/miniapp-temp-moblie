import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'
import ns from '@/netServices/netService'

Vue.config.productionTip = false
Vue.prototype.$ns = ns

new Vue({
	router,
	store,
  render: h => h(App),
}).$mount('#app')
