<template>
    <div id="top">
        <preloader v-if="IsLoading" />
        <div class="releases grid-x">
            <div
                v-for="Release in Releases"
                :key="Release.Id"
                class="small-12 medium-6 large-4 cell"
            >
                <router-link
                    :to="{ name: 'release', params: { id: Release.Id } }"
                    class="release-item grid-x"
                >
                    <img
                        class="release-cover cell"
                        :src="freakeurl+Release.MiniCover"
                        :alt="Release.Name"
                    >
                    <div class="release-info cell auto grid-y">
                        <p class="release-info-title cell">
                            {{ Release.Name }}
                        </p>
                        <p class="release-info-label cell">
                            {{ Release.Label }}
                        </p>
                        <div class="release-info-summary cell">
                            <span><icon
                                name="play"
                                scale="0.8"
                            /> {{ Release.Type }}&nbsp;&nbsp;</span>
                        </div>
                        <p class="release-info-genres cell">
                            <icon
                                name="music"
                                scale="0.8"
                            /> {{ Release.Genres }}
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
import Icon from "vue-awesome/components/Icon"
import LoadingState from "@/mixins/LoadingState"
import Preloader from "@/components/shared/Preloader"

export default {
    name: "Top",
    components: {
        "preloader": Preloader,
        Icon
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
    margin-bottom: 2em;
}
</style>