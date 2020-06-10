<template>
    <div id="single" class="grid-container">
        <transition name="fade">
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
                                :to="{ name: 'home', query: { artists: artist } }"
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
                        v-if="Release.Label !== ''"
                        :to="{ name: 'home', query: { labels: Release.Label } }"
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
import { RELEASE_REQUEST } from "@/store/actions/release"

export default {
    name: "Single",
    components: {
        preloader: Preloader,
        Logo,
        Getlow,
        "v-icon": Icon
    },
    mixins: [LoadingState],
    data() {
        return {
            filesurl: process.env.VUE_APP_FILES_URL,
            Release: {},
            artists: []
        }
    },
    computed: {
        URL() {
            return `https://${window.location.hostname}${this.$route.path}`
        },
        TITLE() {
            return process.env.VUE_APP_TITLE
        }
    },
    created() {
        // get release id from url params
        this.getSingleRelease(this.$route.params.id)
    },
    methods: {
        getSingleRelease(releaseid) {
            const ReleaseData = this.$store.getters.GET_RELEASE_BY_ID(parseInt(releaseid, 10))
            if (ReleaseData) this.setReleaseData(ReleaseData)
            else {
                this.switchLoading()
                this.$store.dispatch(RELEASE_REQUEST, {
                    ID: releaseid
                })
                    .then((response) => {
                        this.setReleaseData(response.data)
                        this.$store.dispatch(RELEASE_REQUEST, {
                            ID: releaseid,
                            update: true
                        })
                            .then((response) => {
                                if (response.status === 200) this.setReleaseData(response.data)
                            })
                    })
                    .finally(() => this.switchLoading())
            }
        },
        setReleaseData(payload) {
            const shortDate = new Date(payload.Date)
            const ReleaseDate = shortDate.toLocaleString("ru", {
                year: "numeric",
                month: "numeric",
                day: "numeric"
            })
            const ReleaseCover = this.filesurl + payload.Cover

            Object.assign(this.Release, payload, { Date: ReleaseDate }, { Cover: ReleaseCover })

            Helpers.setFavicon(this.filesurl + payload.Cover, "shortcut icon")
            Helpers.setFavicon(this.filesurl + payload.Cover, "icon")
            Helpers.setFavicon(this.filesurl + payload.Cover, "apple-touch-icon")
            Helpers.setMetaImage(this.filesurl + payload.Cover, "twitter")
            Helpers.setMetaImage(this.filesurl + payload.Cover, "og")

            this.artists = payload.Artists.split(", ")
            setTimeout(this.countDownloads, 100)
        },
        countDownloads(releaseid = this.$route.params.id) {
            const links = document.querySelectorAll("a:not([class])")
            for (let i = 0; i < links.length; i += 1) {
                links[i].addEventListener("click", function () {
                    const URL = `${process.env.VUE_APP_API_URL}/download/${releaseid}`
                    axios({
                        method: "GET",
                        url: URL
                    })
                })
            }
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
