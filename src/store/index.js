import Vue from "vue"
import Vuex from "vuex"

import Music from "./modules/music"
import Release from "./modules/release"
import Info from "./modules/info"

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        Music,
        Release,
        Info
    }
})

export default store
