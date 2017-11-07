<template>
    <div class="grid-container fluid">
        <pagination :current="currentPage" :total="totalReleases" :per-page="perPage" @page-changed="getAllReleases"></pagination>

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

export default {
    components: {
        'pagination': Paginator
    },
    name: 'Finder',
    data: function () {
        return {
            freakeurl: 'http://freake.ru/',
            api: 'http://localhost:49951/api/releases',
            Releases: [],
            totalReleases: 200,
            perPage: 30,
            currentPage: 1
        }
    },
    methods: {
        getAllReleases: function (page) {
            var options = {
                params: {
                    p: page
                }
            }
            this.$http.get(this.api, options).then(response => {
                this.Releases = response.data
                this.currentPage = page
            }, response => {
                // error
            })
        }
    },
    created: function () {
        this.getAllReleases(this.currentPage)
    }
}
</script>

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
