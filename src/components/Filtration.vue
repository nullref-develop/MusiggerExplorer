<template>
    <div class="filter">
        <transition name="slide-fade">
            <div v-if="showFilter" class="grid-x grid-margin-x" style="margin-bottom: 1em;">
                <div class="filter-item large-9 medium-9 cell">
                    <label>Search</label>
                    <input
                        v-model="titleQuery"
                        type="text"
                        class="finder-input margin-0"
                        placeholder="Search for titles and artists"
                        @change="filterInput"
                        @keyup="filterInput"
                    >
                </div>
                <div class="filter-item large-3 medium-3 cell">
                    <label>Releases per page</label>
                    <input
                        v-model.number="perPage"
                        type="number"
                        class="finder-input"
                        @change="filterInput"
                        @keyup="filterInput"
                    >
                </div>
                <div class="filter-item large-3 medium-6 cell">
                    <label>Genres</label>
                    <multiselect
                        v-model="selectedGenres"
                        :options="genres"
                        :multiple="true"
                        placeholder="Select genres"
                        @input="filterInput"
                    />
                </div>
                <div class="filter-item large-3 medium-6 cell">
                    <label>Types</label>
                    <multiselect
                        v-model="selectedTypes"
                        :options="types"
                        :multiple="true"
                        placeholder="Select release types"
                        @input="filterInput"
                    />
                </div>
                <div class="filter-item large-3 medium-6 cell">
                    <label>Labels</label>
                    <multiselect
                        v-model="selectedLabels"
                        :options="labels"
                        :multiple="true"
                        placeholder="Select record labels"
                        @search-change="getLabels"
                        @close="filterInput"
                        @remove="filterInput"
                    />
                </div>
                <div class="filter-item large-3 medium-6 cell">
                    <label>Votes</label>
                    <input
                        v-model.number="votes"
                        type="number"
                        class="finder-input"
                        @change="filterInput"
                        @keyup="filterInput"
                    >
                </div>
            </div>
        </transition>
        <div class="grid-x grid-margin-x">
            <Logo />
            <div class="auto cell">
                <transition name="fade">
                    <div v-if="!showFilter" class="filter-mini">
                        <span v-if="titleQuery">
                            <icon name="search" scale="0.8" />
                            {{ titleQuery }}&nbsp;&nbsp;
                        </span>
                        <span v-if="artistsQuery">
                            <icon name="user" scale="0.8" />
                            {{ artistsQuery }}&nbsp;&nbsp;
                        </span>
                        <span v-if="genresQuery" class="genres">
                            <icon name="music" scale="0.8" />
                            {{ genresQuery }}&nbsp;&nbsp;
                        </span>
                        <span v-if="typesQuery">
                            <icon name="play" scale="0.8" />
                            {{ typesQuery }}&nbsp;&nbsp;
                        </span>
                        <span v-if="labelsQuery">
                            <icon name="tag" scale="0.8" />
                            {{ labelsQuery }}&nbsp;&nbsp;
                        </span>
                        <span v-if="votes">
                            <icon name="users" scale="0.8" />
                            {{ votes }}&nbsp;&nbsp;
                        </span>
                    </div>
                </transition>
            </div>
            <div class="medium-4 small-8 cell">
                <button
                    :class="{ active: showFilter }"
                    class="filter-button button"
                    type="button"
                    role="button"
                    alt="Show/hide filters panel"
                    aria-label="Show/hide filters panel"
                    @click="ShowFilter()"
                >
                    <icon name="chevron-down" scale="0.7" />
                </button>
                <transition name="fade">
                    <button
                        v-if="showFilter"
                        class="clearfilter-button filter-button button"
                        type="button"
                        role="button"
                        alt="Clear filter"
                        aria-label="Clear filter"
                        @click="clearFilter"
                    >
                        <icon name="trash" scale="0.8" />
                        Clear filter
                    </button>
                </transition>
                <transition name="fade">
                    <!-- If no one filter is set -->
                    <span
                        v-if="
                            !artistsQuery &&
                                !genresQuery &&
                                !typesQuery &&
                                !labelsQuery &&
                                !votes &&
                                !titleQuery &&
                                !showFilter
                        "
                        class="filterinfotext"
                    >
                        Push the button to show the filters
                        <icon name="angle-double-right" scale="0.8" />
                    </span>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Multiselect from "vue-multiselect"
import axios from "axios"
import debounce from "tiny-debounce"
import "vue-awesome/icons"
import Icon from "vue-awesome/components/Icon"
import Logo from "./Logo"

export default {
    name: "Filtration",
    components: {
        Multiselect,
        Logo,
        Icon
    },
    props: {
        artistsQueryP: {
            default: "",
            type: String
        },
        genresQueryP: {
            default: "",
            type: String
        },
        typesQueryP: {
            default: "",
            type: String
        },
        labelsQueryP: {
            default: "",
            type: String
        },
        titleQueryP: {
            default: "",
            type: String
        },
        votesP: {
            default: 0,
            type: Number
        },
        currentPageP: {
            default: 1,
            type: Number
        },
        perPageP: {
            default: 24,
            type: Number
        }
    },
    data() {
        return {
            // urls
            apiGenres: `${process.env.VUE_APP_API_URL}/genres`,
            apiLabels: `${process.env.VUE_APP_API_URL}/labels`,
            // for pagination
            currentPage: 1,
            // for filter
            showFilter: false,
            isLoading: false,
            selectedLabels: null,
            labels: [],
            selectedGenres: null,
            genres: [],
            selectedTypes: null,
            types: ["Album", "Single", "EP", "LP", "Compilation", "Radioshow"],
            votes: 0,
            perPage: 24,
            // selected item in strings
            labelsQuery: "",
            genresQuery: "",
            typesQuery: "",
            artistsQuery: "",
            titleQuery: "",
            LabelLoaded: false
        }
    },
    created() {
        // Parse query from parent component and apply to filter
        if (this.genresQueryP) {
            this.selectedGenres = this.genresQueryP.split(",")
            this.genresQuery = this.genresQueryP
        }
        if (this.labelsQueryP) {
            this.selectedLabels = this.labelsQueryP.split(",")
            this.labelsQuery = this.labelsQueryP
        }
        if (this.typesQueryP) {
            this.selectedTypes = this.typesQueryP.split(",")
            this.typesQuery = this.typesQueryP
        }
        this.artistsQuery = this.artistsQueryP
        this.titleQuery = this.titleQueryP
        this.votes = this.votesP
        this.currentPage = this.currentPageP
        this.perPage = this.perPageP
        // load full list of genres from web api
        this.getAllGenres()
    },
    methods: {
        // casting of variable types
        filterInput: debounce(
            // задержка поиска при пользовательском вводе
            function () {
                this.currentPage = 1 // reset current page when filter change
                this.typesQuery = this.selectedTypes != null
                    ? this.selectedTypes.join()
                    : null
                this.labelsQuery = this.selectedLabels != null
                    ? this.selectedLabels.join()
                    : null
                this.genresQuery = this.selectedGenres != null
                    ? this.selectedGenres.join()
                    : null
                this.$emit(
                    "filter-changed",
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
            1000
        ),
        clearFilter() {
            this.labelsQuery = ""
            this.genresQuery = ""
            this.typesQuery = ""
            this.artistsQuery = ""
            this.titleQuery = ""
            this.selectedLabels = null
            this.selectedGenres = null
            this.selectedTypes = null
            this.currentPage = 1
            this.votes = 0
            this.perPage = 24
            this.$emit(
                "filter-changed",
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
        getAllGenres() {
            axios
                .get(this.apiGenres)
                .then((response) => {
                    this.genres = response.data
                })
        },
        getLabels() {
            this.LabelLoaded = true
            axios
                .get(this.apiLabels)
                .then((response) => {
                    this.labels = response.data
                })
        },
        ShowFilter() {
            this.showFilter = !this.showFilter
            if (this.labels.length === 0 && !this.LabelLoaded) this.getLabels()
        }
    }
}
</script>
