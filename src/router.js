import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

let router = new Router({
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

router.afterEach((to) => {
    document.querySelectorAll("link[rel=canonical]").forEach(e => e.parentNode.removeChild(e))
    let head = document.getElementsByTagName("head")[0]
    let link = document.createElement("link")
    link.rel = "canonical"
    link.href = "https://" + window.location.hostname + to.path
    head.appendChild(link)
})

export default router