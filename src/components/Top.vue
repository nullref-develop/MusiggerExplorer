<template>
    <div id="top">
        <div class="releases grid-x">
            <div
                v-for="Release in Releases"
                :key="Release.Id"
                class="cell"
                :class="
                    `small-${((12/perline)*3 < 4) ? 4 : (12/perline)*3} medium-${(12/perline)*2} large-${12/perline}`
                "
            >
                <router-link
                    :to="{ name: 'release', params: { id: Release.Id } }"
                    class="release-item grid-y"
                    :class="{ 'is-small': (perline > 6) }"
                >
                    <div
                        class="release-item-img"
                        :style="`background-image:url(`+filesurl+Release.Cover+`);`"
                    />
                    <div class="release-info cell auto grid-y">
                        <p class="release-info-title cell">
                            {{ Release.Name }}
                        </p>
                        <p class="release-info-label cell">
                            {{ Release.Label }}
                        </p>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import "vue-awesome/icons"

import { TOP_LIST_REQUEST } from "@/store/actions/release"

export default {
    name: "TopTrax",
    props: {
        weeks: {
            default: 1,
            type: Number
        },
        count: {
            default: 6,
            type: Number
        },
        perline: {
            default: 6,
            type: Number
        }
    },
    data() {
        return {
            filesurl: process.env.VUE_APP_FILES_URL
        }
    },
    computed: {
        Releases() {
            if (this.weeks === 1) return this.$store.state.Release.TopWeekReleases
            if (this.weeks === 4) return this.$store.state.Release.TopMonthReleases
            return []
        }
    },
    created() {
        this.getTopTrax()
    },
    methods: {
        getTopTrax() {
            this.$store.dispatch(TOP_LIST_REQUEST, {
                weeks: this.weeks,
                count: this.count
            })
        }
    }
}
</script>
