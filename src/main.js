import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./registerServiceWorker"

Vue.config.productionTip = false
Vue.prototype.apiUrl = "http://releasecrawler.azurewebsites.net/api"
Vue.prototype.freakeUrl = "http://freake.ru"
Vue.prototype.appName = "Musigger - Search and filter music releases"

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")
