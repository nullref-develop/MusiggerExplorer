<template>
    <div class="grid-container">
        <div v-if="Release" class="srelease grid-x">
                <div class="srelease-info auto cell">
                    <p class="srelease-info-title">{{Release.Name}}</p>
                    <p class="srelease-info-label">{{Release.Label}}</p>
                    <span class="srelease-info-type">{{Release.Type}}</span>
                    <span class="srelease-info-rating"><icon name="star"></icon> {{Release.Rating}}</span>
                    <span class="srelease-info-votes"><icon name="users"></icon> {{Release.Votes}}</span>
                    <p class="srelease-info-genres">{{Release.Genres}}</p>
                    <div class="srelease-extra grid-y">
                        <div v-html="Release.Info" class="srelease-extra-info cell"></div>
                        <div class="cell grid-x">
                            <div v-html="Release.Links" class="srelease-extra-links auto cell"></div>
                            <div class="srelease-extra-tofreake small-2 cell">
                                <a v-bind:href="freakeurl+'/'+Release.ReleaseId" class="button" target="_blank"><icon name="external-link-square"></icon> Freake.ru</a>
                            </div>
                        </div>
                    </div>
                </div>
                <img v-bind:src="freakeurl+Release.Cover" class="srelease-cover">
        </div>

        <Getlow></Getlow>

    </div>
</template>

<script>
import Getlow from './Getlow'
import axios from 'axios'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

export default {
    components: {
        Getlow,
        Icon
    },
    name: 'Single',
    data () {
        return {
            freakeurl: this.freakeUrl,
            Release: {}
        }
    },
    methods: {
        getSingleRelease: function (releaseid) {
            axios.get(this.apiUrl + '/releases', {
                params: {
                    ID: releaseid
                }
            }).then(response => {
                this.Release = response.data
                document.title = this.Release.Name + ' | ' + this.appName
            })
            .catch(e => {
                console.log(e)
            })
        }
    },
    created: function () {
        // get release id from url params
        var releaseId = this.$route.params.id
        this.getSingleRelease(releaseId)
    }
}
</script>

<style lang="scss">

.grid-container {
    max-width: 100em;
}
.srelease {
    padding: 8em 0;
    background-color: white;
    .srelease-cover {
        width: 30em;
        height: 30em;
        padding: 0 4em 0 0;
        @media (max-width: 640px) {
            width: 100%;
            height: 100%;
        }
    }
    .srelease-info {
        padding: 0 4em;
        align-self: center;
        flex-basis: auto;
        @media (max-width: 768px) {
            padding: 0 1em;
        }
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
        margin-top: 2em;
        padding: 0;
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
    @media (max-width: 1600px) {
        flex-flow: column-reverse nowrap;
        padding: 4em 0;
        .srelease-cover {
            padding: 0;
            align-self: center;
            margin-bottom: 4em;
        }
    }
}
iframe,
embed {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 100% !important;
}
</style>