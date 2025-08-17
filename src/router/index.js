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
    {
        path: '/admin',
        name: 'Admin panel',
        component: () => import('../views/admin/AdminPanel.vue'),
        meta: {
            layout: 'admin',
            auth: true, 
            admin: true,
            title: 'Admin Panel'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})

router.beforeEach(async (to, from, next) => {
    const store = useAuthStore();

    if (!store.checkedAuth) {
        await store.checkAuth(); 
        store.checkedAuth = true;
    }

    const requiresAuth = to.meta.auth;
    const requiresAdmin = to.meta.admin;

    if (requiresAuth && !store.isAuthenticated) {
        return next('/auth?message=login');
    }

    if (requiresAdmin && !store.isAdmin) {
        return next('/dashboard');
    }

    next();
})
export default router