<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
    metaInfo: {
        title: process.env.VUE_APP_TITLE,
        titleTemplate: `%s | ${process.env.VUE_APP_TITLE}`
    }
}
</script>
