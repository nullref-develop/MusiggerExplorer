<template>
    <div class="grid-container fluid">
        
        <div class="filter grid-x grid-margin-x">
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

        <pagination
            :current="currentPage"
            :total="totalReleases"
            :per-page="perPage"
            :votes="votes"
            :genres="genresQuery"
            :labels="labelsQuery"
            :types="typesQuery"
            @page-changed="getAllReleases"
        ></pagination>

        <div class="releases grid-x">
            <div v-for="Releases in Releases" :key="Releases.Id" class="small-12 medium-6 large-4 cell">
                <router-link :to="{ name: 'release', params: { id: Releases.Id} }" class="release-item grid-x">
                    <img class="release-cover cell" v-bind:src="freakeurl+Releases.MiniCover" />
                    <div class="release-info cell auto grid-y">
                        <p class="release-info-title cell">{{ Releases.Name }}</p>
                        <p class="release-info-label cell">{{ Releases.Label }}</p>
                        <div class="release-info-summary cell">
                            <span><icon name="play" scale="0.8"></icon> {{ Releases.Type }}&nbsp;&nbsp;</span>
                            <span><icon name="users" scale="0.8"></icon> {{ Releases.Votes }}</span>
                        </div>
                        <p class="release-info-genres cell"><icon name="music" scale="0.8"></icon> {{ Releases.Genres }}</p>
                    </div>
                </router-link>
            </div>
        </div>

        <pagination
            :current="currentPage"
            :total="totalReleases"
            :per-page="perPage"
            :votes="votes"
            :genres="genresQuery"
            :labels="labelsQuery"
            :types="typesQuery"
            @page-changed="getAllReleases"
        ></pagination>

        <Getlow></Getlow>

    </div>
</template>

<script>
import Paginator from './Paginator'
import Getlow from './Getlow'
import Multiselect from 'vue-multiselect'
import axios from 'axios'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

export default {
    components: {
        'pagination': Paginator,
        Multiselect,
        Getlow,
        Icon
    },
    name: 'Finder',
    data: function () {
        return {
            freakeurl: this.freakeUrl,
            api: this.apiUrl + '/releases',
            apiGenres: this.apiUrl + '/genres',
            apiLabels: this.apiUrl + '/labels',
            Releases: [],
            totalReleases: 0,
            perPage: 30,
            currentPage: 1,
            selectedGenres: null,
            genres: [],
            selectedTypes: null,
            types: ['Album', 'Single', 'EP', 'LP', 'Compilation', 'Radioshow'],
            selectedLabels: null,
            labels: [],
            votes: 0,
            labelsQuery: '',
            genresQuery: '',
            typesQuery: '',
            qgenres: '',
            isLoading: false
        }
    },
    methods: {
        // casting of variable types
        filterInput: function () {
            this.currentPage = 1 // reset current page when filter change
            this.typesQuery = (this.selectedTypes != null) ? this.selectedTypes.join() : null
            this.genresQuery = (this.selectedGenres != null) ? this.selectedGenres.join() : null
            this.labelsQuery = (this.selectedLabels != null) ? this.selectedLabels.join() : null
            this.getAllReleases(this.currentPage, this.votes, this.perPage, this.genresQuery, this.labelsQuery, this.typesQuery)
        },
        getAllReleases: function (page, votes, perPage, selectedGenres, selectedLabels, selectedTypes) {
            var options = {
                params: {
                    p: page,
                    votes: votes,
                    perPage: perPage,
                    genres: selectedGenres,
                    labels: selectedLabels,
                    types: selectedTypes
                }
            }
            axios.get(this.api, options).then(response => {
                this.Releases = response.data
                this.totalReleases = parseInt(response.headers['x-total'])
                this.currentPage = page
            })
            .catch(e => {
                console.log(e)
            })
            // update url query when something changed
            this.$router.replace({query: {
                p: page,
                votes: votes,
                perPage: perPage,
                genres: selectedGenres,
                labels: selectedLabels,
                types: selectedTypes
            }})
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
        // Parse query from url and apply to filter
        this.currentPage = (this.$route.query.p) ? parseInt(this.$route.query.p) : this.currentPage
        this.votes = (this.$route.query.votes) ? parseInt(this.$route.query.votes) : this.votes
        this.perPage = (this.$route.query.perPage) ? parseInt(this.$route.query.perPage) : this.perPage
        if (this.$route.query.genres) {
            this.genresQuery = this.$route.query.genres
            this.selectedGenres = this.$route.query.genres.split(',')
        }
        if (this.$route.query.labels) {
            this.labelsQuery = this.$route.query.labels
            this.selectedLabels = this.$route.query.labels.split(',')
        }
        if (this.$route.query.types) {
            this.typesQuery = this.$route.query.types
            this.selectedTypes = this.$route.query.types.split(',')
        }
        // get genres and releases (that fits the filter)
        this.getAllGenres()
        this.getAllReleases(this.currentPage, this.votes, this.perPage, this.genresQuery, this.labelsQuery, this.typesQuery)
    }
}
</script>

<style lang="scss">
@import "../assets/app.scss";
.filter {
    padding: 1em 1em 1em;
    background-color: $color-level1;
    margin: 0 0.2em 0.4em 0.2em;
    label {
        font-size: 1em;
        font-weight: normal;
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

.releases {
    padding: 0;
    margin: 0;
    list-style: none;
}

.release-item {
    background: $color-level1;
    height: 148px;
    color: black;
    margin: 0.2em;
    text-decoration: none;
    transition: all 0.2s ease;
    overflow: hidden;
    font-weight: normal;
    &:hover {
        transform: scale(1.02);
        box-shadow: 0 14px 28px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.12);
    }
    .release-cover {
        width: 148px;
        height: 148px;
    }
    .release-info {
        margin: 0.6em 1.2em;
        overflow: hidden;
        .release-info-title {
            font-size: 1.5em;
            line-height: 1.2em;
            margin: 0;
            font-weight: bold;
            max-height: 2.4em;
            overflow: hidden;
        }
        .release-info-label {
            margin: 0 0 0.5em 0;
        }
        .release-info-summary span,
        .release-info-genres {
            line-height: 1.1em;
            font-size: 0.9em;
            color: gray;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0;
        }
    }
}
</style>
