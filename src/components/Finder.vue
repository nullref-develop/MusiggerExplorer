<template>
    <div>
        <pagination :current="currentPage" :total="totalReleases" :per-page="perPage" @page-changed="getAllReleases"></pagination>

        <div class="releases">
            <router-link :to="{ name: 'release', params: { id: Releases.Id} }" v-for="Releases in Releases" :key="Releases.Id" class="release-item">
                <img class="release-cover" v-bind:src="freakeurl+Releases.MiniCover" />
                <div class="release-info">
                    <p class="release-info-title">{{ Releases.Name }}</p>
                    <div class="release-info-summary">
                        <span>Type: {{ Releases.Type }}&nbsp;&nbsp;</span>
                        <span>Votes: {{ Releases.Votes }}</span>
                    </div>
                    <p class="release-info-genres">Genres: {{ Releases.Genres }}</p>
                </div>
            </router-link>
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
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
}

.release-item {
    display: flex;
    background: white;
    width: 25vw;
    min-width: 400px;
    max-width: 466px;
    height: 148px;
    color: black;
    margin: 2px;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease;
    overflow: hidden;
    font-weight: 300;
    &:hover {
        transform: scale(1.02);
        box-shadow: 0 14px 28px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.12);
    }
    .release-cover {
        width: 148px;
        height: 148px;
    }
    .release-info {
        padding: 20px 10px 10px 20px;
        .release-info-title {
            font-size: 1.3em;
            line-height: 1em;
            margin: 0 0 0.5em 0;
            font-weight: 400;
        }
        .release-info-summary span,
        .release-info-genres {
            font-size: 0.9em;
            color: gray;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>
