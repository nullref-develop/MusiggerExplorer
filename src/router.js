import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "releases",
            component: () => import("./components/Finder.vue")
        },
        {
            path: "/release/:id",
            name: "release",
            component: () => import("./components/Single.vue")
        }
    ]
})
