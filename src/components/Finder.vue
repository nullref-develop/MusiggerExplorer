<template>
    <div class="grid-container fluid">
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

        <label>Label</label>
        <multiselect v-model="selectedLabels" @search-change="getLabels" @close="filterInput" :options="labels" :multiple="true"></multiselect>

        <label>Type</label>
        <multiselect v-model="selectedTypes" @input="filterInput" :options="types" :multiple="true"></multiselect>
        
        <label>Genres</label>
        <multiselect v-model="selectedGenres" @input="filterInput" :options="genres" :multiple="true"></multiselect>

        <label>Votes</label>
        <br>
        <input v-model="votes" v-on:change="filterInput" v-on:keyup="filterInput" type="number">
        <br>
        <br>

        <div class="releases grid-x">
            <div v-for="Releases in Releases" :key="Releases.Id" class="small-12 medium-6 large-4 cell">
                <router-link :to="{ name: 'release', params: { id: Releases.Id} }" class="release-item grid-x">
                    <img class="release-cover cell" v-bind:src="freakeurl+Releases.MiniCover" />
                    <div class="release-info cell auto grid-y">
                        <p class="release-info-title cell">{{ Releases.Name }}</p>
                        <p class="release-info-label cell">{{ Releases.Label }}</p>
                        <div class="release-info-summary cell">
                            <span>Type: {{ Releases.Type }}&nbsp;&nbsp;</span>
                            <span>Votes: {{ Releases.Votes }}</span>
                        </div>
                        <p class="release-info-genres cell">Genres: {{ Releases.Genres }}</p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Paginator from './Paginator'
import Multiselect from 'vue-multiselect'
import axios from 'axios'

export default {
    components: {
        'pagination': Paginator,
        Multiselect
    },
    name: 'Finder',
    data: function () {
        return {
            freakeurl: 'http://freake.ru/',
            api: 'http://localhost:49951/api/releases',
            apiGenres: 'http://localhost:49951/api/genres',
            apiLabels: 'http://localhost:49951/api/labels',
            Releases: [],
            totalReleases: 0,
            perPage: 44,
            currentPage: 1,
            selectedGenres: null,
            genres: [],
            selectedTypes: null,
            types: ['Album', 'Single', 'EP', 'LP', 'Compilation', 'Radioshow'],
            selectedLabels: null,
            labels: [],
            votes: '0',
            labelsQuery: '',
            genresQuery: '',
            typesQuery: '',
            isLoading: false
        }
    },
    methods: {
        filterInput: function () {
            this.currentPage = 1
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
            console.log(options)
            axios.get(this.api, options).then(response => {
                this.Releases = response.data
                this.totalReleases = parseInt(response.headers['x-total'])
                this.currentPage = page
            })
            .catch(e => {
                console.log(e)
            })
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
        this.getAllGenres()
        this.getAllReleases(this.currentPage, this.votes, this.perPage, this.selectedGenres, this.selectedLabels, this.selectedTypes)
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style lang="scss">
.releases {
    padding: 0;
    margin: 0;
    list-style: none;
}

.release-item {
    background: white;
    height: 148px;
    color: black;
    margin: 2px;
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
        padding: 10px 20px;
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
