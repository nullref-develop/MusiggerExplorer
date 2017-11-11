<template>
    <div class="filter">
        <transition name="slide-fade">
            <div v-if="showFilter" class="grid-x grid-margin-x">
                <div class="filter-item small-12 cell">
                    <label>Genres</label>
                    <multiselect v-model="selectedGenres" @input="filterInput" :options="genres" :multiple="true" placeholder="Select genres"></multiselect>
                </div>
                <div class="filter-item large-6 medium-12 cell">
                    <label>Types</label>
                    <multiselect v-model="selectedTypes" @input="filterInput" :options="types" :multiple="true" placeholder="Select release types"></multiselect>
                </div>
                <div class="filter-item large-6 medium-12 cell">
                    <label>Labels</label>
                    <multiselect v-model="selectedLabels" @search-change="getLabels" @close="filterInput" @remove="filterInput" :options="labels" :multiple="true" placeholder="Select record labels"></multiselect>
                </div>
                <div class="filter-item large-6 medium-12 cell">
                    <label>Votes</label>
                    <input v-model.number="votes" v-on:change="filterInput" v-on:keyup="filterInput" type="number" class="finder-input">
                </div>
                <div class="filter-item large-6 medium-12 cell">
                    <label>Releases per page</label>
                    <input v-model.number="perPage" v-on:change="filterInput" v-on:keyup="filterInput" type="number" class="finder-input">
                </div>
            </div>
        </transition>
        <div class="grid-x grid-margin-x">
            <Logo></Logo>
            <div class="auto cell">
                <transition name="fade">
                    <div v-if="!showFilter" class="filter-mini">
                        <span v-if="artistsQuery">
                            <icon name="user" scale="0.8"></icon> {{artistsQuery}}&nbsp;&nbsp;
                        </span>
                        <span v-if="genresQuery" class="genres">
                            <icon name="music" scale="0.8"></icon> {{genresQuery}}&nbsp;&nbsp;
                        </span>
                        <span v-if="typesQuery">
                            <icon name="play" scale="0.8"></icon> {{typesQuery}}&nbsp;&nbsp;
                        </span>
                        <span v-if="labelsQuery">
                            <icon name="picture-o" scale="0.8"></icon> {{labelsQuery}}&nbsp;&nbsp;
                        </span>
                        <span v-if="votes">
                            <icon name="users" scale="0.8"></icon> {{votes}}&nbsp;&nbsp;
                        </span>
                        <!-- If no one filter is set -->
                        <span v-if="!artistsQuery && !genresQuery && !typesQuery && !labelsQuery && !votes">
                            Push the button to show the filters <icon name="angle-double-right" scale="0.8"></icon>
                        </span>
                    </div>
                </transition>
            </div>
            <div class="small-2 cell">
                <button v-bind:class="{ active: showFilter }" @click="showFilter = !showFilter" class="filter-button button" type="button">
                    <icon name="chevron-down" scale="0.7"></icon>
                </button>
                <transition name="fade">
                    <button v-if="showFilter" @click="clearFilter" class="clearfilter-button filter-button button" type="button">
                        <icon name="trash" scale="0.8"></icon>
                        Clear filter
                    </button>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from './Logo'
import Multiselect from 'vue-multiselect'
import axios from 'axios'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

export default {
    components: {
        Multiselect,
        Logo,
        Icon
    },
    name: 'Filtration',
    props: {
        artistsQueryP: {
            default: '',
            type: String
        },
        genresQueryP: {
            default: '',
            type: String
        },
        typesQueryP: {
            default: '',
            type: String
        },
        labelsQueryP: {
            default: '',
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
    data: function () {
        return {
            // urls
            apiGenres: this.apiUrl + '/genres',
            apiLabels: this.apiUrl + '/labels',
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
            types: ['Album', 'Single', 'EP', 'LP', 'Compilation', 'Radioshow'],
            votes: 0,
            perPage: 24,
            // selected item in strings
            labelsQuery: '',
            genresQuery: '',
            typesQuery: '',
            artistsQuery: ''
        }
    },
    methods: {
        // casting of variable types
        filterInput: function () {
            this.currentPage = 1 // reset current page when filter change
            this.typesQuery = (this.selectedTypes != null) ? this.selectedTypes.join() : null
            this.labelsQuery = (this.selectedLabels != null) ? this.selectedLabels.join() : null
            this.genresQuery = (this.selectedGenres != null) ? this.selectedGenres.join() : null
            this.$emit('filter-changed',
                this.currentPage,
                this.votes,
                this.perPage,
                this.genresQuery,
                this.labelsQuery,
                this.typesQuery,
                this.artistsQuery
            )
        },
        clearFilter: function () {
            this.labelsQuery = ''
            this.genresQuery = ''
            this.typesQuery = ''
            this.artistsQuery = ''
            this.selectedLabels = null
            this.selectedGenres = null
            this.selectedTypes = null
            this.currentPage = 1
            this.votes = 0
            this.perPage = 24
            this.$emit('filter-changed',
                this.currentPage,
                this.votes,
                this.perPage,
                this.genresQuery,
                this.labelsQuery,
                this.typesQuery,
                this.artistsQuery
            )
        },
        getAllGenres: function () {
            axios.get(this.apiGenres).then(response => {
                this.genres = response.data
            })
            .catch(e => {
                console.log(e)
            })
        },
        getLabels: function () {
            this.isLoading = true
            axios.get(this.apiLabels).then(response => {
                this.labels = response.data
                this.isLoading = false
            })
            .catch(e => {
                console.log(e)
            })
        }
    },
    created: function () {
        // Parse query from parent component and apply to filter
        if (this.genresQueryP) {
            this.selectedGenres = this.genresQueryP.split(',')
            this.genresQuery = this.genresQueryP
        }
        if (this.labelsQueryP) {
            this.selectedLabels = this.labelsQueryP.split(',')
            this.labelsQuery = this.labelsQueryP
        }
        if (this.typesQueryP) {
            this.selectedTypes = this.typesQueryP.split(',')
            this.typesQuery = this.typesQueryP
        }
        this.artistsQuery = this.artistsQueryP
        this.votes = this.votesP
        this.currentPage = this.currentPageP
        this.perPage = this.perPageP
        // load full list of genres from web api
        this.getAllGenres()
    }
}
</script>

<style lang="scss">
@import "../assets/app.scss";

.fade-enter-active {
    transition: opacity 0.5s
}
.fade-leave-active {
    transition: opacity 0.2s
}
.fade-enter,
.fade-leave-to {
    opacity: 0
}
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all .1s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
      transform: translateY(-1em);
      opacity: 0;
}
.filter {
    padding: 1em 2em;
    background-color: $color-level1;
    margin: 0 0.2em 0.4em 0.2em;
    .filter-mini {
        overflow: hidden;
        word-wrap: none;
        span {
            max-width: 20em;
            overflow: hidden;
            white-space: nowrap;
            display: inline-block;
            text-overflow: ellipsis;
            margin: 0.5em 0 0.3em;
            line-height: 1.2em;
        }
        .genres {
            max-width: 30em;
        }
    }
    label {
        font-size: 1em;
        font-weight: normal;
    }
    .filter-button {
        background-color: transparent;
        // background-color: $color-background;
        color: black;
        float: right;
        svg {
            transition: background 0.3s ease;
            transition: transform 0.3s ease;
        }
        &:hover {
            color: $color-level1;
            background-color: $color-accent;
        }
        &.active {
            svg {
                transform: rotate(180deg);
            }
        }
    }
    .clearfilter-button {
        margin-right: 2em;
    }
    .filter-item {
    }
    .finder-input {
        min-height: 2.5em;
        display: block;
        padding: 0.8em;
        border-radius: 0;
        border: none;
        background: #ffffff;
        box-shadow: none;
        background-color: $color-background;
    }
}
</style>