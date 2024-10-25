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


router.beforeEach( async (to, from, next) => {
    try {
        await axios.get('auth/check');
        console.log('in try')
        if (to.meta.requiresAuth) next();
        else next('/') 
    } 
    catch {
        console.log('in catch')
        if (to.meta.requiresAuth) next('/login')
        else next();
    }
})

export default router
