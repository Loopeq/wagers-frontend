import {createRouter, createWebHistory} from 'vue-router'
import AppMatches from './views/AppMatches.vue'
import AppChange from './views/AppChange.vue'
import AppLogin from './views/AppLogin.vue'
import axios from 'axios'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/login', alias:"/", component: AppLogin}, 
        {path: '/matches', component: AppMatches, meta: { requiresAuth: true }},
        {
            path: '/match/:matchId',
            name: 'match',
            component: AppChange,
            meta: { requiresAuth: true }
        }
    ],
    linkActiveClass: 'active',
    linkExactActiveClass: 'active'
})

let isAuthenticated = false; 

router.beforeEach( async (to, from, next) => {

    if (to.path === '/login') {
        next();
        return;
    }


    if (to.meta.requiresAuth) {
        
        if (isAuthenticated) {
            next();
            return;
        }

        try {
            await axios.get(`/auth/check`, {withCredentials: true});
            isAuthenticated = true; 
            next(); 
        } catch (error) {
            isAuthenticated = false; 
            next('/login');
        }
    } else {
        next();
    }
})

export default router
