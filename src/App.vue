<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style lang="scss">
@font-face {
    font-family: "futura-pt";
    font-style: normal;
    font-weight: bold;
    src: url("https://cdn-resources.ableton.com/80bA26cPQ1hEJDFjpUKntxfqdmG3ZykO/static/fonts/futura-pt-medium.5201fc3a314d.eot?&1e781793c759#iefix") format("embedded-opentype"), url("https://cdn-resources.ableton.com/80bA26cPQ1hEJDFjpUKntxfqdmG3ZykO/static/fonts/futura-pt-medium.b650e9c2aaf6.woff2?1e781793c759") format("woff2"), url("https://cdn-resources.ableton.com/80bA26cPQ1hEJDFjpUKntxfqdmG3ZykO/static/fonts/futura-pt-medium.038ac2935219.woff?1e781793c759") format("woff"), url("https://cdn-resources.ableton.com/80bA26cPQ1hEJDFjpUKntxfqdmG3ZykO/static/fonts/futura-pt-medium.c056901ef82f.ttf?1e781793c759") format("truetype"), url("https://cdn-resources.ableton.com/80bA26cPQ1hEJDFjpUKntxfqdmG3ZykO/static/fonts/futura-pt-medium.3bb7659593c8.svg?1e781793c759#FuturaPTWeb-Book") format("svg");
}
@font-face {
    font-family: "futura-pt";
    font-style: normal;
    font-weight: normal;
    src: url("https://cdn-resources.ableton.com/80bA26cPQ1hEJDFjpUKntxfqdmG3ZykO/static/fonts/futura-pt-book.325fc4671f06.eot?&1e781793c759#iefix") format("embedded-opentype"), url("https://cdn-resources.ableton.com/80bA26cPQ1hEJDFjpUKntxfqdmG3ZykO/static/fonts/futura-pt-book.2dadbb3c03c1.woff2?1e781793c759") format("woff2"), url("https://cdn-resources.ableton.com/80bA26cPQ1hEJDFjpUKntxfqdmG3ZykO/static/fonts/futura-pt-book.b65339f98771.woff?1e781793c759") format("woff"), url("https://cdn-resources.ableton.com/80bA26cPQ1hEJDFjpUKntxfqdmG3ZykO/static/fonts/futura-pt-book.187839f67492.ttf?1e781793c759") format("truetype"), url("https://cdn-resources.ableton.com/80bA26cPQ1hEJDFjpUKntxfqdmG3ZykO/static/fonts/futura-pt-book.60a93019c94b.svg?1e781793c759#FuturaPTWeb-Book") format("svg");
}

* {
    text-rendering: optimizeLegibility;
    -webkit-font-variant-ligatures: common-ligatures;
    font-variant-ligatures: common-ligatures;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-feature-settings: "kern";
    font-feature-settings: "kern";
    font-kerning: normal;
    font-family: 'futura-pt', 'Oswald', sans-serif;
}
html, body {
    background-color: #F0F0F0;
}
blockquote {
    margin: 0;
}
.button {
    display: inline-block;
    background-color: darkgray;
    padding: 10px 15px;
    text-decoration: none;
    font-weight: bold;
    color: white;
    transition: all 0.2s ease;
    &:hover {
        background-color: DodgerBlue;
    }
}
</style>