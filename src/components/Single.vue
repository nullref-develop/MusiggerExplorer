<template>
    <div class="grid-container">
        <div class="releaseinner">
            <div class="logodiv grid-x">
                <Logo></Logo>
            </div>


            <div v-if="Release" class="srelease grid-x">

                <div class="srelease-info auto cell">
                    <p class="srelease-info-title">{{Release.Name}}</p>
                    <p>
                        <strong>by</strong>
                        <span v-for="artists in artists">
                            <router-link
                            :to="{ name: 'releases', query: {artists: artists} }"
                            class="srelease-info-artist"
                            title="Find all releases by this artist"
                            >
                                {{artists}}
                            </router-link>
                            <span> </span>
                        </span>
                    </p>
                    
                    <br>
                    <span class="srelease-info-type">{{Release.Type}}</span>
                    <span class="srelease-info-rating"><icon name="star"></icon> {{Release.Rating}}</span>
                    <span class="srelease-info-votes"><icon name="users"></icon> {{Release.Votes}}</span>
                    <router-link
                        :to="{ name: 'releases', query: {labels: Release.Label} }"
                        class="srelease-info-label"
                        title="Find all releases by this label"
                        >
                        <icon name="picture-o"></icon> {{Release.Label}}
                    </router-link>
                    <p class="srelease-info-genres"><icon name="music"></icon> {{Release.Genres}}</p>
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
        </div>

        <Getlow></Getlow>

    </div>
</template>

<script>
import Logo from './Logo'
import Getlow from './Getlow'
import axios from 'axios'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

export default {
    components: {
        Logo,
        Getlow,
        Icon
    },
    name: 'Single',
    data () {
        return {
            freakeurl: this.freakeUrl,
            Release: {},
            artists: []
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
                this.artists = response.data.Artists.split(', ')
                document.title = this.Release.Name + ' | ' + this.appName
            })
            .catch(e => {
                console.log(e)
            })
        }
        getUpdatedInfo: function () {
            axios.patch(this.apiUrl + '/releases', {
                params: {
                    ID: releaseid
                }
            }).then(response => {
                if (response.status == 200) {
                    this.Release = response.data
                }
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
        this.getUpdatedInfo(releaseId)
    }
}
</script>

<style lang="scss">
@import "../assets/app.scss";

.grid-container {
    max-width: 100em;
}
.releaseinner {
    background-color: $color-level1;
    padding: 2em;
    margin: 0.2em;
    .logodiv {
        padding: 2em 2em 0;
    }
}
.srelease {
    padding: 2em 0 2em;
    .srelease-cover {
        width: 30em;
        height: 30em;
        padding: 0 2em;
        @media (max-width: 640px) {
            width: 100%;
            height: 100%;
        }
    }
    .srelease-info {
        padding: 0 2em;
        align-self: center;
        flex-basis: auto;
        max-width: 57.6em;
        @media (max-width: 1400px) {
            width: 100%;
            max-width: 100%;
        }
        @media (max-width: 768px) {
            padding: 0 1em;
        }
        p { 
            margin: 0;
            line-height: 1em;
            font-size: 1.2em;
        }
        .srelease-info-title {
            font-size: 2.2em;
            line-height: 1.2em;
            font-weight: bold;
            margin-bottom: 0.1em;
        }
        .srelease-info-label,
        .srelease-info-artist {
            display: inline-block;
            color: black;
            border-bottom: 2px solid black;
            text-decoration: none;
            font-weight: bold;
        }
        .srelease-info-artist {
            margin-bottom: 1em;
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
            margin-top: 0.4em;
            color: $color-darkgrey;
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
            ol {
                padding-left: 1em;
            }
        }
        .srelease-extra-tofreake {
            text-align: right;
            overflow: hidden;
        }
    }
    @media (max-width: 1400px) {
        flex-flow: column-reverse nowrap;
        padding: 2em;
        .srelease-cover {
            padding: 0;
            align-self: center;
            margin-bottom: 2em;
        }
    }
}
iframe,
embed {
    width: 100% !important;
    max-width: 100% !important;
    min-width: 100% !important;
}
footer {
    padding: 0 4em !important;
}
</style>