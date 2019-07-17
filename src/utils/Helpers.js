const Helpers = {

    setFavicon: function (URL, Type) {
        let link = document.querySelector(`link[rel="${Type}"]`)
        link.type = "image/jpeg"
        link.rel = Type
        link.href = URL
        link.sizes = "32x32"
        link.replaceWith(link)
    },

    setMetaImage: function (URL, Type) {
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