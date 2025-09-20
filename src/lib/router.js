import MainPage from '@/pages/MainPage.vue'
import ReviewsPage from '@/pages/ReviewsPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
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
