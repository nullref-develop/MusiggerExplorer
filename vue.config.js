module.exports = {
    productionSourceMap: false,
    css: {
        sourceMap: true
    },
    pwa: {
        name: "Musigger",
        themeColor: "#000000",
        msTileColor: "#ffffff",
        iconPaths: {
            favicon32: "img/icons/favicon-32x32.png",
            favicon16: "img/icons/favicon-16x16.png",
            appleTouchIcon: "img/icons/apple-touch-icon.png",
            maskIcon: "img/icons/safari-pinned-tab.svg",
            msTileImage: "img/icons/mstile-150x150.png"
        },
        workboxOptions: {
            skipWaiting: true
        }
    }
}
