import Vue from "vue"
import Notifications from "vue-notification"

Vue.use(Notifications)

const Helpers = {

    notify(type = "error", message = "", duration = 5000) {
        Vue.notify({
            group: "all",
            speed: 1000,
            type,
            text: message,
            duration,
            animationName: "fade"
        })
    },

    setFavicon(URL, Type) {
        const link = document.querySelector(`link[rel="${Type}"]`)
        link.type = "image/jpeg"
        link.rel = Type
        link.href = URL
        link.sizes = "32x32"
        link.replaceWith(link)
    },

    setMetaImage(URL, Type) {
        let meta = null
        switch (Type) {
        case "twitter":
            meta = document.querySelector("meta[name*='twitter:image']")
            meta.name = "twitter:image"
            meta.content = URL
            break
        case "og":
            meta = document.querySelector("meta[property*='og:image']")
            meta.property = "og:image"
            meta.content = URL
            break
        default:
            break
        }
        meta.replaceWith(meta)
    }

}

export default Helpers
