<template>
    <div id="app">
        <router-view/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Oswald:300,400"></link>
    </div>
</template>

<script>
export default {
    name: 'app'
}
</script>


<style>
* {
    text-rendering: optimizeLegibility;
    -webkit-font-variant-ligatures: common-ligatures;
    font-variant-ligatures: common-ligatures;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-feature-settings: "kern";
    font-feature-settings: "kern";
    font-kerning: normal;
    font-family: 'Oswald', sans-serif;
}
html, body {
    background-color: #F0F0F0;
}
</style>