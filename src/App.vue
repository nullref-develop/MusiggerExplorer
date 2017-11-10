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
@import "~foundation-sites/scss/foundation";
@include foundation-xy-grid-classes;
@include foundation-forms;

@import "./assets/app.scss";

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
input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: $color-placeholder;
}
input::-moz-placeholder { /* Firefox 19+ */
    color: $color-placeholder;
}
input:-ms-input-placeholder { /* IE 10+ */
    color: $color-placeholder;
}
input:-moz-placeholder { /* Firefox 18- */
    color: $color-placeholder;
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
    background-color: $color-background;
}
blockquote {
    margin: 0;
}
.button {
    display: inline-block;
    background-color: darken($color-background,15%);
    padding: 10px 15px;
    text-decoration: none;
    font-weight: bold;
    color: white;
    transition: all 0.2s ease;
    cursor: pointer;
    border: none;
    outline: none;
    &:hover {
        background-color: $color-accent;
    }
}
.fa-icon {
    position: relative;
    top: 0.1em;
}
</style>