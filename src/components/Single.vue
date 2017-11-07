<template>
    <div class="grid-container">
        <div v-if="Release" class="srelease">
            <div class="grid-x">
                <img v-bind:src="freakeurl+Release.Cover" class="srelease-cover">
                <div class="srelease-info auto cell">
                    <p class="srelease-info-title">{{Release.Name}}</p>
                    <p class="srelease-info-label">{{Release.Label}}</p>
                    <span class="srelease-info-type">Album</span>
                    <span class="srelease-info-rating">{{Release.Rating}}</span>
                    <span class="srelease-info-votes">{{Release.Votes}}</span>
                    <p class="srelease-info-genres">{{Release.Genres}}</p>
                </div>
            </div>
            <div class="srelease-extra grid-y">
                <div v-html="Release.Info" class="srelease-extra-info cell"></div>
                <div class="cell grid-x">
                    <div v-html="Release.Links" class="srelease-extra-links auto cell"></div>
                    <div class="srelease-extra-tofreake small-2 cell">
                        <a v-bind:href="freakeurl+'/'+Release.ReleaseId" class="button" target="_blank">Freake.ru</a>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Single',
    data () {
        return {
            freakeurl: 'http://freake.ru/',
            Release: {}
        }
    },
    methods: {
        getSingleRelease: function (releaseid) {
            var resource = this.$resource('http://localhost:49951/api/releases{/id}')
            resource.get({ id: releaseid }).then(response => {
                console.log(response.data)
                this.Release = response.data
            }, response => {
                // error
            })
        }
    },
    created: function () {
        var releaseId = this.$route.params.id
        this.getSingleRelease(releaseId)
    }
}
</script>

<style lang="scss">
.srelease {
    padding: 8em 0 0 0;
    background-color: white;
    .srelease-cover {
        width: 25em;
        height: 25em;
    }
    .srelease-info {
        padding: 0 4em;
        align-self: center;
        p { 
            margin: 0;
            line-height: 1em;
        }
        .srelease-info-title {
            font-size: 2em;
            line-height: 1em;
            font-weight: bold;
        }
        .srelease-info-label {
            font-weight: bold;
            margin-bottom: 2em;
        }
        .srelease-info-type,
        .srelease-info-rating,
        .srelease-info-votes {
            width: max-content;
            font-weight: bold;
            display: inline;
            margin-right: 1em;
        }
        .srelease-info-type {
            border: 2px solid black;
            font-size: 1em;
            line-height: 1em;
            padding: 2px 4px;
        }
        .srelease-info-genres {
            margin-top: 0.5em;
            color: gray;
        }
    }
    .srelease-extra {
        padding: 4em;
        .srelease-extra-info {
            margin-bottom: 1em;
        }
        .srelease-extra-links {
            ul {
                list-style: none;
                padding: 0;
                margin: 0;
                .link-head {
                    font-weight: bold;
                }
            } 
        }
        .srelease-extra-tofreake {
            text-align: right;
            overflow: hidden;
        }
    }
}
iframe {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 100% !important;
}
</style>