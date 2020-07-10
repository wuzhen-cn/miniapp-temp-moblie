export default {
	state: {
		name: '',
		age: 0,
		gender: ''
	},
	mutations: {
		resetForm(state) {
			state.name = ''
			state.age = 0
			state.gender = ''
		},
		setName(state, val) {
			state.name = val
		},
		setAge(state, val) {
			state.age = val
		},
		setGender(state, val) {
			state.gender = val
		}
	},
	actions: {
		//异步请求放在这里
	}
}
