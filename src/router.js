import {createRouter, createWebHistory} from 'vue-router'
import AppMatches from './views/AppMatches.vue'
import AppChange from './views/AppChange.vue'
import AppLogin from './views/AppLogin.vue'

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


function getCookie(name){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


router.beforeEach((to, from, next) => {
    const token = getCookie('wags');
    if (to.meta.requiresAuth && !token) {
        next('/login');  
    } else if (to.path === '/' && token) {
        next('/matches');
    } else {
        next();
    }
})

export default router
