<template>
    <div id="home">
        <transition name="fade">
            <preloader v-if="IsLoading" />
        </transition>
        <div class="grid-container">
            <Filtration
                :title-param="TitleQuery"
                :genres-param="GenresQuery"
                :labels-param="LabelsQuery"
                :types-param="TypesQuery"
                :votes-param="Votes"
                :releases-per-page-param="ReleasesPerPage"
                :current-page-param="CurrentPage"
                :artists-param="ArtistsQuery"
                @filter-changed="getAllReleases"
            />

            <template v-if="ShowTop">
                <div class="head">
                    <h2 class="head-title">Hyped /week</h2>
                </div>
                <Top
                    :weeks="1"
                    :count="6"
                    :per-line="6"
                />

                <div class="head">
                    <h2 class="head-title">Hyped /month</h2>
                </div>
                <Top
                    :weeks="4"
                    :count="12"
                    :perline="12"
                />
                <div class="head">
                    <h2 class="head-title">Flow /all</h2>
                </div>
            </template>

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
                            :src="FilesUrl+Release.MiniCover"
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
                :current="CurrentPage"
                :total="TotalReleases"
                :per-page="ReleasesPerPage"
                :votes="Votes"
                :genres="GenresQuery"
                :labels="LabelsQuery"
                :types="TypesQuery"
                :title="TitleQuery"
                @page-changed="getAllReleases"
            />

            <Getlow />
        </div>
    </div>
</template>

<script>
import "vue-awesome/icons"
import Icon from "vue-awesome/components/Icon"
import Helpers from "@/utils/Helpers"
import LoadingState from "@/mixins/LoadingState"
import Preloader from "@/components/shared/Preloader"
import Top from "@/components/Top"
import Filtration from "@/components/Filtration"
import Paginator from "@/components/Paginator"
import Getlow from "@/components/Getlow"
import { RELEASE_LIST_REQUEST } from "@/store/actions/release"

export default {
    name: "Finder",
    components: {
        preloader: Preloader,
        Top,
        Filtration,
        Paginator,
        Getlow,
        Icon
    },
    mixins: [LoadingState],
    data() {
        return {
            FilesUrl: process.env.VUE_APP_FILES_URL,

            TitleQuery: "",
            GenresQuery: "",
            LabelsQuery: "",
            TypesQuery: "",
            Votes: 0,
            ReleasesPerPage: 24,
            CurrentPage: 1,
            ArtistsQuery: "",

            FirstLaunch: true,
            ShowTop: true
        }
    },
    computed: {
        Releases() {
            return this.$store.state.Release.Releases
        },
        TotalReleases() {
            return this.$store.state.Release.ReleasesTotal
        },
        IsFilterDefault() {
            if (
                Object.keys(this.$route.query).length !== 0
                // eslint-disable-next-line eqeqeq
                && this.$route.query.p == 1
                // eslint-disable-next-line eqeqeq
                && this.$route.query.votes == 0
                // eslint-disable-next-line eqeqeq
                && this.$route.query.perPage == 24
                && (this.$route.query.genres === "" || this.$route.query.genres === null)
                && (this.$route.query.labels === "" || this.$route.query.labels === null)
                && (this.$route.query.types === "" || this.$route.query.types === null)
                && (this.$route.query.artists === "" || this.$route.query.artists === null)
                && (this.$route.query.title === "" || this.$route.query.title === null)
            ) {
                return true
            }
            return false
        }
    },
    created() {
        Helpers.setFavicon("/img/icons/favicon.ico", "shortcut icon")
        Helpers.setFavicon("/img/icons/favicon-32x32.png", "icon")
        Helpers.setFavicon("/img/icons/apple-touch-icon.png", "apple-touch-icon")
        Helpers.setMetaImage("http://www.musigger.com/img/icons/android-chrome-512x512.png", "twitter")
        Helpers.setMetaImage("http://www.musigger.com/img/icons/android-chrome-512x512.png", "og")
        // Parse query from url and apply to filter
        this.TitleQuery = this.$route.query.title || this.TitleQuery
        this.GenresQuery = this.$route.query.genres || this.GenresQuery
        this.LabelsQuery = this.$route.query.labels || this.LabelsQuery
        this.TypesQuery = this.$route.query.types || this.TypesQuery
        this.CurrentPage = (this.$route.query.p) ? parseInt(this.$route.query.p, 10) : this.CurrentPage
        this.Votes = (this.$route.query.votes) ? parseInt(this.$route.query.votes, 10) : this.Votes
        this.ReleasesPerPage = (this.$route.query.perPage) ? parseInt(this.$route.query.perPage, 10) : this.ReleasesPerPage
        this.ArtistsQuery = this.$route.query.artists || this.ArtistsQuery
        // get releases
        this.getAllReleases(
            this.CurrentPage,
            this.Votes,
            this.ReleasesPerPage,
            this.GenresQuery,
            this.LabelsQuery,
            this.TypesQuery,
            this.ArtistsQuery,
            this.TitleQuery
        )
    },
    methods: {
        getAllReleases(page, votes, perPage, selectedGenres, selectedLabels, selectedTypes, artists, title) {
            const options = {
                p: page,
                votes,
                perPage,
                genres: selectedGenres,
                labels: selectedLabels,
                types: selectedTypes,
                artists,
                title
            }

            // update url query when any param changed (except first app launch)
            if (!this.FirstLaunch) {
                this.$router.replace({
                    query: {
                        p: options.p,
                        votes: options.votes,
                        perPage: options.perPage,
                        genres: options.genres,
                        labels: options.labels,
                        types: options.types,
                        artists: this.ArtistsQuery,
                        title: options.title
                    }
                })
            }
            // if all params is default - clear query from url
            if (this.IsFilterDefault) this.$router.replace({ query: null })
            // if any params exist - hide top releases sections
            if (Object.keys(this.$route.query).length !== 0) this.ShowTop = false
            else this.ShowTop = true

            this.FirstLaunch = false
            this.switchLoading()
            this.$store.dispatch(RELEASE_LIST_REQUEST, options)
                .then(() => {
                    // update from filtration
                    this.CurrentPage = page
                    this.page = page
                    this.Votes = votes
                    this.ReleasesPerPage = perPage
                    this.GenresQuery = selectedGenres
                    this.LabelsQuery = selectedLabels
                    this.TypesQuery = selectedTypes
                    this.ArtistsQuery = artists
                    this.TitleQuery = title
                })
                .finally(() => this.switchLoading())
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
