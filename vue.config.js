module.exports = {
    productionSourceMap: false,
    css: {
        sourceMap: true
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://api.musigger.com/",
                changeOrigin: true
            }
        }
    }
}
