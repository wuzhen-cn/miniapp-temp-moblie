import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'

Vue.use(Router)

const router =  new Router({
	routes: routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.length == 0) {
		router.push({
			path: '/404'
		})
	} else {
		next()
	}
})

export default router
