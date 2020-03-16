<template>
    <router-link
        :to="{ name: 'home' }"
        class="logo cell"
        title="Back to the jungle"
    >
        <img
            class="logo-img"
            src="../assets/logo.svg"
            alt="Musigger"
        >
    </router-link>
</template>

<style lang="scss">
@import "../assets/app.scss";
.logo {
    width: 4em !important;
    line-height: 0;
    margin-right: 0 !important;
    transition: all 0.2s ease-out;
    &:hover {
        filter: sepia(1) brightness(90%) hue-rotate(150deg) ;
    }
    .logo-img {
        width: 3.5em;
    }
}

</style>
