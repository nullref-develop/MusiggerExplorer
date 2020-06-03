<template>
    <div id="music">
        <transition name="fade">
            <preloader v-if="IsLoading" />
        </transition>
        <div class="grid-container">
            <Filtration
                :artists-query-p="artistsQuery"
                :genres-query-p="genresQuery"
                :types-query-p="typesQuery"
                :labels-query-p="labelsQuery"
                :title-query-p="titleQuery"
                :votes-p="votes"
                :current-page-p="currentPage"
                :per-page-p="perPage"
                @filter-changed="getAllReleases"
            />
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
                            :src="filesurl+Release.MiniCover"
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
                                <span><icon
                                    name="users"
                                    scale="0.8"
                                /> {{ Release.Votes }}</span>
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

            <Paginator
                :current="currentPage"
                :total="totalReleases"
                :per-page="perPage"
                :votes="votes"
                :genres="genresQuery"
                :labels="labelsQuery"
                :types="typesQuery"
                :title="titleQuery"
                @page-changed="getAllReleases"
            />

            <Getlow />
        </div>
    </div>
</template>

<script>
import axios from "axios"
import "vue-awesome/icons"
import Icon from "vue-awesome/components/Icon"
import Helpers from "@/utils/Helpers"
import LoadingState from "@/mixins/LoadingState"
import Preloader from "@/components/shared/Preloader"
import Filtration from "@/components/Filtration"
import Paginator from "@/components/Paginator"
import Getlow from "@/components/Getlow"

export default {
    name: "Finder",
    components: {
        preloader: Preloader,
        Filtration,
        Paginator,
        Getlow,
        Icon
    },
    mixins: [LoadingState],
    data() {
        return {
            // urls
            filesurl: process.env.VUE_APP_FILES_URL,
            api: `${process.env.VUE_APP_API_URL}/releases`,
            // releases
            Releases: [],
            // for pagination
            totalReleases: 0,
            perPage: 24,
            currentPage: 1,
            votes: 0,
            // selected item in strings
            labelsQuery: "",
            genresQuery: "",
            typesQuery: "",
            artistsQuery: "",
            titleQuery: "",
            // disable url rewrite on first app launch
            firstLaunch: true
        }
    },
    created() {
        Helpers.setFavicon("/img/icons/favicon.ico", "shortcut icon")
        Helpers.setFavicon("/img/icons/favicon-32x32.png", "icon")
        Helpers.setFavicon("/img/icons/apple-touch-icon.png", "apple-touch-icon")
        Helpers.setMetaImage("http://www.musigger.com/img/icons/android-chrome-512x512.png", "twitter")
        Helpers.setMetaImage("http://www.musigger.com/img/icons/android-chrome-512x512.png", "og")
        document.title = process.env.VUE_APP_TITLE_FULL
        // Parse query from url and apply to filter
        this.currentPage = (this.$route.query.p)
            ? parseInt(this.$route.query.p, 10)
            : this.currentPage
        this.votes = (this.$route.query.votes)
            ? parseInt(this.$route.query.votes, 10)
            : this.votes
        this.perPage = (this.$route.query.perPage)
            ? parseInt(this.$route.query.perPage, 10)
            : this.perPage
        if (this.$route.query.genres) {
            this.genresQuery = this.$route.query.genres
        }
        if (this.$route.query.labels) {
            this.labelsQuery = this.$route.query.labels
        }
        if (this.$route.query.types) {
            this.typesQuery = this.$route.query.types
        }
        if (this.$route.query.artists) {
            this.artistsQuery = this.$route.query.artists
        }
        if (this.$route.query.title) {
            this.titleQuery = this.$route.query.title
        }
        // get genres and releases (that fits the filter)
        this.getAllReleases(
            this.currentPage,
            this.votes,
            this.perPage,
            this.genresQuery,
            this.labelsQuery,
            this.typesQuery,
            this.artistsQuery,
            this.titleQuery
        )
    },
    methods: {
        getAllReleases(
            page,
            votes,
            perPage,
            selectedGenres,
            selectedLabels,
            selectedTypes,
            artists,
            title
        ) {
            if (!this.IsLoading) {
                this.switchLoading()
                const options = {
                    params: {
                        p: page,
                        votes,
                        perPage,
                        genres: selectedGenres,
                        labels: selectedLabels,
                        types: selectedTypes,
                        artists,
                        title
                    }
                }
                axios.get(this.api, options).then((response) => {
                    this.Releases = response.data
                    this.totalReleases = parseInt(response.headers["x-total"], 10)
                    // update from filtration
                    this.currentPage = page
                    this.page = page
                    this.votes = votes
                    this.perPage = perPage
                    this.genresQuery = selectedGenres
                    this.labelsQuery = selectedLabels
                    this.typesQuery = selectedTypes
                    this.artistsQuery = artists
                    this.titleQuery = title
                    // update url query when something changed (except first app launch)
                    if (!this.firstLaunch) {
                        this.$router.replace({
                            query: {
                                p: options.params.p,
                                votes: options.params.votes,
                                perPage: options.params.perPage,
                                genres: options.params.genres,
                                labels: options.params.labels,
                                types: options.params.types,
                                artists: this.artistsQuery,
                                title: options.params.title
                            }
                        })
                    }
                    this.firstLaunch = false
                    this.switchLoading()
                })
                    .catch(() => {
                        // console.log(e)
                    })
            }
        }
    },
    metaInfo() {
        return {
            title: process.env.VUE_APP_TITLE_FULL,
            titleTemplate: process.env.VUE_APP_TITLE_FULL,
            meta: [
                // eslint-disable-next-line max-len
                { name: "description", content: "Web application for searching and filtering music releases. Musigger provides flexible release filtering engine that sorts by genres, types, labels, votes and even artists." },
                // eslint-disable-next-line max-len
                { property: "og:description", content: "Web application for searching and filtering music releases. Musigger provides flexible release filtering engine that sorts by genres, types, labels, votes and even artists." },
                { property: "og:title", content: "Musigger - Search and filter music releases" }
            ]
        }
    }
}
</script>
