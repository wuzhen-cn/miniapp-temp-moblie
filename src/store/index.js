import Vue from 'vue'
import Vuex from 'vuex'
import baseInfo from './baseInfo'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		user: {},
		sessionId: ''
	},
	mutations: {
		setUser (state, val) {
			state.user = val
		},
		setSessionId (state, val) {
			state.sessionId = val
		}
	},
	actions: {
		//异步请求放在这里
		getUser ({ commit }) {
			commit('setUser', {age: 12, name: 'testUser'})
		}
	},
	modules: {
		//模块放在这里
		baseInfo
	}
})

export default store