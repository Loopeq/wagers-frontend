import { createRouter, createWebHistory } from 'vue-router';
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
            auth: true,
            title: "Dashboard"
        }
    },  
    {
        path: '/auth',
        name: 'Auth', 
        component: () => import('../views/Auth.vue'),
        meta: {
            layout: 'auth',
            auth: false,
            title: "Log in"
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
        return next('/dashboard');
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