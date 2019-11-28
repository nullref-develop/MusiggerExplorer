<template>
    <div id="top">
        <preloader v-if="IsLoading" />
        <div class="releases grid-x">
            <div
                v-for="Release in Releases"
                :key="Release.Id"
                class="small-6 medium-4 large-2 cell"
            >
                <router-link
                    :to="{ name: 'release', params: { id: Release.Id } }"
                    class="release-item grid-y"
                >
                    <div
                        class="release-item-img"
                        :style="`background-image:url(`+freakeurl+Release.Cover+`);`"
                    />
                    <div class="release-info cell auto grid-y">
                        <p class="release-info-title cell">
                            {{ Release.Name }}
                        </p>
                        <p class="release-info-label cell">
                            {{ Release.Label }}
                        </p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import "vue-awesome/icons"
import LoadingState from "@/mixins/LoadingState"
import Preloader from "@/components/shared/Preloader"

export default {
    name: "Top",
    components: {
        "preloader": Preloader
    },
    mixins: [LoadingState],
    props: {
        weeks: {
            default: 1,
            type: Number
        },
        count: {
            default: 6,
            type: Number
        }
    },
    data: function () {
        return {
            // urls
            freakeurl: process.env.VUE_APP_FREAKE_URL,
            api: process.env.VUE_APP_API_URL + "/toptrax",
            // releases
            Releases: []
        }
    },
    created() {
        this.getTopTrax()
    },
    methods: {
        getTopTrax: function() {
            this.switchLoading()
            var options = {
                params: {
                    weeks: this.weeks,
                    count: this.count
                }
            }
            axios.get(this.api, options).then(response => {
                this.Releases = response.data
                this.switchLoading()
            })
        }
    }
}
</script>

<style lang="scss">
@import "~foundation-sites/scss/foundation";
@import "../assets/app.scss";

#top {
    margin-bottom: 0.2em;
    .release-item {
        height: 330px;
        @media #{$small-only} {
            height: 240px;
        }
        .release-item-img {
            width: unset;
            height: 260px;
            content: "";
            background-size: cover;
            background-position: 50%;
            @media #{$small-only} {
                height: 180px;
            }
        }
        .release-info-title,
        .release-info-label {
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>