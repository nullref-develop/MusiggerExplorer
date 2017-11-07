import Vue from 'vue'
import Router from 'vue-router'
import Finder from '@/components/Finder'
import Single from '@/components/Single'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Finder
        },
        {
            path: '/release/:id',
            name: 'release',
            component: Single
        }
    ]
})
