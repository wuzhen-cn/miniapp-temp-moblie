
const routes = [
	{
		path: '/',
		redirect: '/home'
	}, {
		path: '/home',
		name: 'home',
		meta: {
			title: '首页',
			requireLogin: false
		},
		component: () => import('@/view/home.vue'),
		children: []
	}
]

export default routes