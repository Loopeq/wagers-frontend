import { createRouter, createWebHistory, redirect } from 'vue-router';
import { useAuthStore } from '@/store/auth.module';

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: {
            layout: 'main',
            auth: true
        }
    },
    {
        path: '/auth',
        name: 'Auth', 
        component: () => import('../views/Auth.vue'),
        meta: {
            layout: 'auth',
            auth: false
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})

router.beforeEach((to, from, next) => {
    const store = useAuthStore();
    if (to === '/'){
        redirect({'path': '/dashboard'})
    }
    const requiresAuth = to.meta.auth;

    if(requiresAuth && store.isAuthenticated) {
        next();
    } else if (requiresAuth && !store.isAuthenticated){
        next('/auth?message=auth');
    } else {
        next();
    }
})

export default router