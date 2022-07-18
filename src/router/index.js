import MainPage from '@/pages/MainPage.vue'
import { createRouter, createWebHashHistory } from "vue-router"


const routes = [
    {
        path: '/',
        component: MainPage,
        children: [
        ]
    }
]

const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router;
