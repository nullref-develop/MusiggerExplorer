<template>
    <div
        class="logo cell"
        title="Back to the jungle"
        @click="backToHome()"
    >
        <img
            class="logo-img"
            src="../assets/logo.svg"
            alt="Musigger"
        >
    </div>
</template>

<script>
export default {
    name: "Logo",
    methods: {
        backToHome() {
            if (this.$route.name !== "home") this.$router.push({ name: "home", query: null })
            else window.location.href = "/"
        }
    }
}
</script>
