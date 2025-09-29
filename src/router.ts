import { createRouter, createWebHistory } from 'vue-router'
import { TokenService } from './services/token.service.js'

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
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
        meta: { requiresAuth: false }
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

/** Logic needed for processing before handling each route **/
router.beforeEach((to, _from, next) => {
    const isAuthenticated = !!TokenService.getToken()

    /** Checks if a route is not public and user isn't logged in, sending them to /login, then the original query*/
    /** Do not allow user to visit login page or register page if they are logged in **/
    if (to.name !== 'login' && !isAuthenticated) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router