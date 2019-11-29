<template>
    <div id="single" class="grid-container">
        <transition name="fadeout">
            <preloader v-if="IsLoading" />
        </transition>
        <div class="releaseinner">
            <div class="logodiv grid-x">
                <Logo />
            </div>


            <div
                v-if="Release"
                class="srelease grid-x"
            >
                <div class="srelease-info auto cell">
                    <p class="srelease-info-title">
                        {{ Release.Name }}
                    </p>
                    <p>
                        <strong>by</strong>
                        <span
                            v-for="artist in artists"
                            :key="artist"
                        >
                            <router-link
                                :to="{ name: 'releases', query: { artists: artist } }"
                                class="srelease-info-artist"
                                title="Find all releases by this artist"
                            >
                                {{ artist }}
                            </router-link>
                            <span />
                        </span>
                    </p>

                    <br>
                    <span class="srelease-info-type">{{ Release.Type }}</span>
                    <span class="srelease-info-rating"><v-icon name="star" /> {{ Release.Rating }}</span>
                    <span class="srelease-info-votes"><v-icon name="users" /> {{ Release.Votes }}</span>
                    <span class="srelease-info-date"><v-icon name="calendar" /> {{ Release.Date }}</span>
                    <router-link
                        :to="{ name: 'releases', query: { labels: Release.Label } }"
                        class="srelease-info-label"
                        title="Find all releases by this label"
                    >
                        <v-icon name="image" /> {{ Release.Label }}
                    </router-link>
                    <span class="srelease-info-genres">
                        <v-icon name="music" /> {{ Release.Genres }}
                    </span>
                    <div class="srelease-extra grid-y">
                        <div
                            class="srelease-extra-info cell"
                            v-html="Release.Info"
                        />
                        <div class="cell grid-x">
                            <div
                                class="srelease-extra-links auto cell"
                                v-html="Release.Links"
                            />
                            <div class="srelease-extra-tofreake small-4 cell">
                                <a
                                    :href="`http://freake.ru/${Release.ReleaseId}`"
                                    class="button"
                                    target="_blank"
                                ><v-icon name="external-link-square-alt" /> Link</a>
                            </div>
                        </div>

                        <br>
                        <br>
                        <div class="cell grid-y">
                            <vue-disqus :shortname="TITLE" :identifier="$route.params.id.toString()" :url="URL" />
                        </div>
                    </div>
                </div>
                <img
                    :src="Release.Cover"
                    class="srelease-cover"
                    :alt="Release.Name"
                >
            </div>
        </div>

        <Getlow />
    </div>
</template>

<script>
import axios from "axios"
import "vue-awesome/icons"
import Icon from "vue-awesome/components/Icon"
import Helpers from "@/utils/Helpers"
import LoadingState from "@/mixins/LoadingState"
import Preloader from "@/components/shared/Preloader"
import Logo from "@/components/Logo"
import Getlow from "@/components/Getlow"

export default {
    name: "Single",
    components: {
        "preloader": Preloader,
        Logo,
        Getlow,
        "v-icon": Icon
    },
    mixins: [LoadingState],
    data () {
        return {
            filesurl: process.env.VUE_APP_FILES_URL,
            Release: {},
            artists: []
        }
    },
    computed: {
        URL() {
            return "https://" + window.location.hostname + this.$route.path
        },
        TITLE() {
            return process.env.VUE_APP_TITLE
        }
    },
    created: function () {
        // get release id from url params
        var releaseId = this.$route.params.id
        this.getSingleRelease(releaseId)
        this.getUpdatedInfo(releaseId)
    },
    methods: {
        getSingleRelease: function (releaseid) {
            this.switchLoading()
            axios.get(process.env.VUE_APP_API_URL + "/releases", {
                params: {
                    ID: releaseid
                }
            })
                .then(response => {
                    this.setReleaseData(response.data)
                    this.switchLoading()
                })
                .catch(() => {
                    // console.log(e)
                })
        },
        getUpdatedInfo: function (releaseid) {
            axios.get(process.env.VUE_APP_API_URL + "/releases", {
                params: {
                    ID: releaseid,
                    update: true
                }
            }).then(response => {
                if (response.status === 200)
                    this.setReleaseData(response.data)
            })
                .catch(() => {
                    // console.log(e)
                })
        },
        setReleaseData: function (payload) {
            this.Release = payload
            Helpers.setFavicon(this.filesurl + payload.Cover, "shortcut icon")
            Helpers.setFavicon(this.filesurl + payload.Cover, "icon")
            Helpers.setFavicon(this.filesurl + payload.Cover, "apple-touch-icon")
            Helpers.setMetaImage(this.filesurl + payload.Cover, "twitter")
            Helpers.setMetaImage(this.filesurl + payload.Cover, "og")
            this.Release.Cover = this.filesurl + payload.Cover
            var shortDate = new Date(payload.Date)
            this.Release.Date = shortDate.toLocaleString("ru", {
                year: "numeric",
                month: "numeric",
                day: "numeric"
            })
            this.artists = payload.Artists.split(", ")
        }
    },
    metaInfo() {
        return {
            title: this.Release.Name,
            meta: [
                { name: "description", content: this.Release.Info },
                { property: "og:description", content: this.Release.Info },
                { property: "og:title", content: this.Release.Name }
            ]
        }
    }
}
</script>

<style lang="scss">
@import "~foundation-sites/scss/foundation";
@import "../assets/app.scss";

.grid-container {
    max-width: 100em;
}
.releaseinner {
    background-color: $color-level1;
    padding: 2em;
    margin: 0 0.2em 0.2em 0.2em;
    .logodiv {
        padding: 2em 2em 0;
        @media #{$small-only} {
            padding: 2em 1em 0;
        }
    }
    @media #{$small-only} {
        padding: 0;
    }
}
.srelease {
    padding: 2em 0 2em;
    justify-content: space-between;
    .srelease-cover {
        width: 30em;
        height: 30em;
        padding: 0 2em;
        @media #{$small-only} {
            width: 100%;
            height: 100%;
            font-size: 0.9em;
        }
    }
    .srelease-info {
        padding: 0 2em;
        align-self: center;
        flex-basis: auto;
        max-width: 40em;
        @media (min-width: 1680px) {
            max-width: 57em;
        }
        @media (max-width: 1400px) {
            width: 100%;
            max-width: 100%;
        }
        @media (max-width: 768px) {
            padding: 0 1em;
        }
        p {
            margin: 0;
            line-height: 1em;
            font-size: 1.2em;
            > * {
                margin-right: 0.25em;
            }
        }
        .srelease-info-title {
            font-size: 2.2em;
            line-height: 1.2em;
            font-weight: bold;
            margin-bottom: 0.1em;
            @media #{$small-only} {
                font-size: 1.8em;
                line-height: 1.1em;
            }
        }
        .srelease-info-label,
        .srelease-info-artist {
            display: inline-block;
            color: black;
            border-bottom: 2px solid black;
            text-decoration: none;
            font-weight: bold;
        }
        .srelease-info-artist {
            margin-bottom: 1em;
        }
        .srelease-info-type,
        .srelease-info-rating,
        .srelease-info-votes,
        .srelease-info-date,
        .srelease-info-genres,
        .srelease-info-label {
            font-weight: bold;
            display: inline;
            margin-right: 1em;
            line-height: 2;
            white-space: nowrap;
        }
        .srelease-info-type {
            border: 2px solid black;
            font-size: 1em;
            line-height: 1em;
            padding: 2px 4px;
        }
    }
    .srelease-extra {
        margin-top: 2em;
        padding: 0;
        overflow: hidden;
        .srelease-extra-info {
            margin-bottom: 1em;
        }
        .srelease-extra-links {
            overflow: hidden;
        }
        .srelease-extra-tofreake {
            text-align: right;
            overflow: hidden;
            > a {
                color: lightgray;
            }
        }
        ul, ol {
            padding: 0;
            margin: 0 0 1em 0;
            .link-head {
                font-weight: bold;
            }
            li {
                overflow: hidden;
                white-space: pre;
                text-overflow: ellipsis;
            }
        }
        ol {
            padding-left: 1em;
            li {
                overflow: visible;
            }
        }
        ul {
            list-style: none;
        }
    }
    @media (max-width: 1400px) {
        flex-flow: column-reverse nowrap;
        padding: 2em;
        .srelease-cover {
            padding: 0;
            align-self: center;
            margin-bottom: 2em;
        }
    }
    @media #{$small-only} {
        padding: 2em 1em;
    }
}
iframe,
embed,
object {
    display: block;
    width: 100% !important;
    max-width: 100% !important;
    min-width: 100% !important;
    overflow: hidden;
}
footer {
    padding: 0 4em !important;
    @media #{$small-only} {
        padding: 0 1em !important;
    }
}
</style>
