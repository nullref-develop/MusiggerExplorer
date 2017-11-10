import Vue from 'vue'
import Router from 'vue-router'
import Finder from '@/components/Finder'
import Single from '@/components/Single'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'releases',
            component: Finder,
            props: true
        },
        {
            path: '/release/:id',
            name: 'release',
            component: Single
        }
    ]
})
