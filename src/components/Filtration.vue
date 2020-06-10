<template>
    <div class="filter">
        <transition name="slide-fade">
            <div v-if="ShowFilter" class="grid-x grid-margin-x" style="margin-bottom: 1em;">
                <div class="filter-item large-3 medium-6 cell">
                    <label>Genre</label>
                    <multiselect
                        v-model="GenresSelected"
                        :options="genres"
                        :multiple="true"
                        placeholder="Select genre"
                        @input="filterInput"
                    />
                </div>
                <div class="filter-item large-3 medium-6 cell">
                    <label>Label</label>
                    <multiselect
                        v-model="LabelsSelected"
                        :options="labels"
                        :multiple="true"
                        placeholder="Select record label"
                        @input="filterInput"
                    />
                </div>
                <div class="filter-item large-2 medium-4 cell">
                    <label>Release type</label>
                    <multiselect
                        v-model="TypesSelected"
                        :options="Types"
                        :multiple="true"
                        placeholder="Release type"
                        @input="filterInput"
                    />
                </div>
                <div class="filter-item large-2 medium-4 cell">
                    <label>Number of votes</label>
                    <input
                        v-model.number="Votes"
                        type="number"
                        class="finder-input"
                        @input="filterInput"
                    >
                </div>
                <div class="filter-item large-2 medium-4 cell">
                    <label>Releases per page</label>
                    <input
                        v-model.number="ReleasesPerPage"
                        type="number"
                        class="finder-input"
                        @input="filterInput"
                    >
                </div>
            </div>
        </transition>
        <div class="grid-x grid-margin-x">
            <Logo />
            <div class="auto cell">
                <div class="filter-item auto cell grid-x">
                    <SpeechRecognition @voice-recognition-result="speechRecogintionResult" />
                    <input
                        v-model="TitleQuery"
                        type="text"
                        class="finder-input is-search margin-0 auto cell"
                        :placeholder="SearchBar.Placeholder"
                        @focus="searchChangeFocus"
                        @blur="searchChangeFocus"
                        @input="filterInput"
                        @keyup.enter="filterNow"
                    >
                </div>
            </div>
            <div class="shrink cell">
                <svg
                    class="filter-button button burger"
                    :class="{ active: ShowFilter }"
                    viewBox="0 0 100 100"
                    width="40"
                    role="button"
                    alt="Show/hide filters panel"
                    aria-label="Show/hide filters panel"
                    @click="showFilter()"
                >
                    <path class="line top" d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
                    <path class="line middle" d="m 70,50 h -40" />
                    <path class="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
                </svg>
                <button
                    v-if="ShowFilter"
                    class="clearfilter-button filter-button button"
                    type="button"
                    role="button"
                    alt="Clear filter"
                    aria-label="Clear filter"
                    @click="clearFilter"
                >
                    <icon name="trash" scale="0.8" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from "vue-multiselect"
import debounce from "lodash/debounce"
import throttle from "lodash/throttle"
import "vue-awesome/icons"
import Icon from "vue-awesome/components/Icon"
import { GENRE_LIST_REQUEST, LABEL_LIST_REQUEST } from "@/store/actions/music"
import Logo from "./Logo"
import SpeechRecognition from "./SpeechRecognition"

export default {
    name: "Filtration",
    components: {
        Multiselect,
        Icon,
        Logo,
        SpeechRecognition
    },
    props: {
        titleParam: {
            default: "",
            type: String
        },
        genresParam: {
            default: "",
            type: String
        },
        labelsParam: {
            default: "",
            type: String
        },
        typesParam: {
            default: "",
            type: String
        },
        votesParam: {
            default: 0,
            type: Number
        },
        releasesPerPageParam: {
            default: 24,
            type: Number
        },
        currentPageParam: {
            default: 1,
            type: Number
        },
        artistsParam: {
            default: "",
            type: String
        }
    },
    data() {
        return {
            ShowFilter: false,
            LabelsLoaded: false,
            Types: ["Album", "Single", "EP", "LP", "Compilation", "Radioshow"],

            TitleQuery: "",
            GenresSelected: null,
            GenresQuery: "",
            LabelsSelected: null,
            LabelsQuery: "",
            TypesSelected: null,
            TypesQuery: "",
            Votes: 0,
            ReleasesPerPage: 24,
            CurrentPage: 1,
            ArtistsQuery: "",

            SearchBar: {
                Focused: false,
                Placeholder: "Search by artist or title"
            }
        }
    },
    computed: {
        genres() {
            return this.$store.state.Music.Genres
        },
        labels() {
            return this.$store.state.Music.Labels
        }
    },
    created() {
        // Parse query from parent component and apply to filter
        this.parseParams()
        // load full list of genres from web api
        this.getAllGenres()
        // if params exist - show filter panel and load label's list
        if (this.genresParam || this.labelsParam || this.typesParam || this.ArtistsQuery || this.Votes || this.ReleasesPerPage !== 24) {
            this.ShowFilter = true
            this.getLabels()
        }
    },
    methods: {
        parseParams() {
            this.TitleQuery = this.titleParam
            if (this.genresParam) {
                this.GenresSelected = this.genresParam.split(",")
                this.GenresQuery = this.genresParam
            }
            if (this.labelsParam) {
                this.LabelsSelected = this.labelsParam.split(",")
                this.LabelsQuery = this.labelsParam
            }
            if (this.typesParam) {
                this.TypesSelected = this.typesParam.split(",")
                this.TypesQuery = this.typesParam
            }
            this.Votes = this.votesParam
            this.ReleasesPerPage = this.releasesPerPageParam
            this.CurrentPage = this.currentPageParam
            this.ArtistsQuery = this.artistsParam
        },
        filter() {
            this.CurrentPage = 1 // reset current page when filter change
            this.TypesQuery = this.TypesSelected != null
                ? this.TypesSelected.join()
                : null
            this.LabelsQuery = this.LabelsSelected != null
                ? this.LabelsSelected.join()
                : null
            this.GenresQuery = this.GenresSelected != null
                ? this.GenresSelected.join()
                : null
            this.$emit(
                "filter-changed",
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
        filterInput: debounce(
            // задержка поиска при пользовательском вводе
            function () {
                this.filterNow()
            }, 1500
        ),
        filterNow: throttle(
            function () {
                this.filter()
            },
            1500,
            { trailing: false }
        ),
        clearFilter() {
            this.LabelsQuery = ""
            this.GenresQuery = ""
            this.TypesQuery = ""
            this.ArtistsQuery = ""
            this.TitleQuery = ""
            this.LabelsSelected = null
            this.GenresSelected = null
            this.TypesSelected = null
            this.CurrentPage = 1
            this.Votes = 0
            this.ReleasesPerPage = 24
            this.$emit(
                "filter-changed",
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
        getAllGenres() {
            if (!this.$store.getters.IS_GENRES_LOADED) {
                this.$store.dispatch(GENRE_LIST_REQUEST)
            }
        },
        getLabels() {
            if (!this.$store.getters.IS_LABELS_LOADED && !this.LabelsLoaded) {
                this.LabelsLoaded = !this.LabelsLoaded
                this.$store.dispatch(LABEL_LIST_REQUEST)
            }
        },
        showFilter() {
            this.ShowFilter = !this.ShowFilter
            this.getLabels()
        },
        searchChangeFocus() {
            if (this.SearchBar.Focused) {
                this.SearchBar.Focused = false
                this.SearchBar.Placeholder = "Search by artist or title"
            }
            else {
                this.SearchBar.Focused = true
                this.SearchBar.Placeholder = "Enter the name of the artist/release or click the button on the right and just say it"
            }
        },
        speechRecogintionResult(result) {
            this.TitleQuery = result
            this.filter()
        }
    }
}
</script>
