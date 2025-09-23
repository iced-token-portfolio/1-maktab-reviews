import MainPage from '@/pages/MainPage.vue'
import ReviewsPage from '@/pages/ReviewsPage.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
	history: createMemoryHistory(),
	routes: [
		{
			name: 'main-page',
			path: '/',
			component: MainPage
		},
		{
			name: 'reviews',
			path: '/reviews/:teacherId',
			component: ReviewsPage
		}
	],
})

export default router
