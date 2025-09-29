import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
        meta: { requiresAuth: false }
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/componentView',
        name: 'componentView',
        component: () => import('@/views/Component.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router