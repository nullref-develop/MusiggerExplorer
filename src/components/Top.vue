<template>
    <div id="top">
        <div class="releases grid-x">
            <div
                v-for="Release in Releases"
                :key="Release.Id"
                class="cell"
                :class="`small-${((12/perline)*3 < 4) ? 4 : (12/perline)*3} medium-${(12/perline)*2} large-${12/perline}`"
            >
                <router-link
                    :to="{ name: 'release', params: { id: Release.Id } }"
                    class="release-item grid-y"
                    :class="{ 'is-small': (perline > 6) }"
                >
                    <div
                        class="release-item-img"
                        :style="`background-image:url(`+filesurl+Release.Cover+`);`"
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

export default {
    name: "Top",
    props: {
        weeks: {
            default: 1,
            type: Number
        },
        count: {
            default: 6,
            type: Number
        },
        perline: {
            default: 6,
            type: Number
        }
    },
    data: function () {
        return {
            // urls
            filesurl: process.env.VUE_APP_FILES_URL,
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
            var options = {
                params: {
                    weeks: this.weeks,
                    count: this.count
                }
            }
            axios.get(this.api, options).then(response => {
                this.Releases = response.data
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
        &.is-small {
            height: 186px;
            @media #{$small-only} {
                height: 170px;
            }
            .release-info {
                margin: 0.6em 0.6em;
                .release-info-title {
                    font-size: 1.1em;
                }
                .release-info-label {
                    font-size: 0.8em;
                }
            }
            .release-item-img {
                height: 126px;
                @media #{$small-only} {
                    height: 120px;
            
                }
            }
        }
    }
}
</style>