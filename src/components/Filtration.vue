<template>
    <div class="filter">
        <transition name="slide-fade">
            <div v-if="showFilter" class="grid-x grid-margin-x" style="margin-bottom: 1em;">
                <div class="filter-item large-3 medium-6 cell">
                    <label>Genre</label>
                    <multiselect
                        v-model="selectedGenres"
                        :options="genres"
                        :multiple="true"
                        placeholder="Select genre"
                        @input="filterInput"
                    />
                </div>
                <div class="filter-item large-3 medium-6 cell">
                    <label>Label</label>
                    <multiselect
                        v-model="selectedLabels"
                        :options="labels"
                        :multiple="true"
                        placeholder="Select record label"
                        @search-change="getLabels"
                        @close="filterInput"
                        @remove="filterInput"
                    />
                </div>
                <div class="filter-item large-2 medium-4 cell">
                    <label>Release type</label>
                    <multiselect
                        v-model="selectedTypes"
                        :options="types"
                        :multiple="true"
                        placeholder="Release type"
                        @input="filterInput"
                    />
                </div>
                <div class="filter-item large-2 medium-4 cell">
                    <label>Number of votes</label>
                    <input
                        v-model.number="votes"
                        type="number"
                        class="finder-input"
                        @input="filterInput"
                    >
                </div>
                <div class="filter-item large-2 medium-4 cell">
                    <label>Releases per page</label>
                    <input
                        v-model.number="perPage"
                        type="number"
                        class="finder-input"
                        @input="filterInput"
                    >
                </div>
            </div>
        </transition>
        <div class="grid-x grid-margin-x">
            <Logo />
            <div class="auto cell">
                <div class="filter-item auto cell grid-x">
                    <input
                        v-model="titleQuery"
                        type="text"
                        class="finder-input is-search margin-0 auto cell"
                        :placeholder="SearchBar.Placeholder"
                        @focus="searchChangeFocus"
                        @blur="searchChangeFocus"
                        @input="filterInput"
                    >
                    <button
                        v-if="SpeechRecognition.Available"
                        class="speech-button button shrink cell"
                        type="button"
                        role="button"
                        alt="Voice search"
                        aria-label="Voice search"
                        @click="speechRecognise()"
                    >
                        <icon
                            :name="SpeechRecognitionIcon"
                            :pulse="SpeechRecognitionIconPulse"
                            :spin="SpeechRecognitionIconSpin"
                            :color="(SpeechRecognition.Status.Listening) ? 'red' : ''"
                            scale="0.9"
                        />
                    </button>
                </div>
            </div>
            <div class="shrink cell">
                <svg
                    class="filter-button button burger"
                    :class="{ active: showFilter }"
                    viewBox="0 0 100 100"
                    width="40"
                    role="button"
                    alt="Show/hide filters panel"
                    aria-label="Show/hide filters panel"
                    @click="ShowFilter()"
                >
                    <path class="line top" d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
                    <path class="line middle" d="m 70,50 h -40" />
                    <path class="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
                </svg>
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
                </button>
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
            LabelLoaded: false,
            SpeechRecognition: {
                Available: false,
                RecognitionAPI: null,
                RecognitionEngine: null,
                Status: {
                    Ready: false,
                    Listening: false,
                    Analyzing: false
                }
            },
            SearchBar: {
                Focused: false,
                Placeholder: "Search by artist/title"
            }
        }
    },
    computed: {
        SpeechRecognitionIcon() {
            if (this.SpeechRecognition.Status.Listening) return "circle-notch"
            if (this.SpeechRecognition.Status.Analyzing) return "spinner"
            return "microphone"
        },
        SpeechRecognitionIconPulse() {
            if (this.SpeechRecognition.Status.Analyzing) return true
            return false
        },
        SpeechRecognitionIconSpin() {
            if (this.SpeechRecognition.Status.Listening) return true
            return false
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
        // check speech recognition availability
        this.speechCheckAvailability()
        // if params exist - show filter panel
        if (this.genresQueryP || this.labelsQueryP || this.typesQueryP || this.artistsQuery || this.votes || this.perPage !== 24) {
            this.showFilter = true
        }
    },
    methods: {
        filterInput: debounce(
            // задержка поиска при пользовательском вводе
            function () {
                this.filter()
            },
            1500
        ),
        // casting of variable types
        filter() {
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
        },
        searchChangeFocus() {
            if (this.SearchBar.Focused) {
                this.SearchBar.Focused = false
                this.SearchBar.Placeholder = "Search by artist/title"
            }
            else {
                this.SearchBar.Focused = true
                this.SearchBar.Placeholder = "Enter the name of the artist/release or click the button on the right and just say it"
            }
        },
        speechCheckAvailability() {
            if (("webkitSpeechRecognition" in window)) {
                this.SpeechRecognition.Available = true
                this.speechInitialize()
            }
            // else console.warn("Web Speech API is not supported by this browser.")
        },
        speechCapitalize(text) {
            const sentence = text.split(" ")
            for (let i = 0, x = sentence.length; i < x; i += 1) {
                sentence[i] = sentence[i][0].toUpperCase() + sentence[i].substr(1)
            }
            return sentence.join(" ")
        },
        speechInitialize() {
            /* eslint-disable no-use-before-define */
            /* eslint-disable no-undef */
            this.SpeechRecognition.RecognitionAPI = webkitSpeechRecognition
            this.SpeechRecognition.RecognitionEngine = new this.SpeechRecognition.RecognitionAPI()

            this.SpeechRecognition.RecognitionEngine.continuous = false
            this.SpeechRecognition.RecognitionEngine.lang = "en-US"
            this.SpeechRecognition.RecognitionEngine.interimResults = false
            this.SpeechRecognition.RecognitionEngine.maxAlternatives = 1

            this.SpeechRecognition.Status.Ready = true
        },
        speechRecognise() {
            if (
                !this.SpeechRecognition.Status.Ready
                || this.SpeechRecognition.Status.Listening
                || this.SpeechRecognition.Status.Analyzing
            ) return
            const vm = this

            this.SpeechRecognition.RecognitionEngine.start()
            this.SpeechRecognition.Status.Listening = true

            this.SpeechRecognition.RecognitionEngine.onresult = function (event) {
                vm.SpeechRecognition.Status.Listening = false
                vm.SpeechRecognition.Status.Analyzing = false
                vm.titleQuery = vm.speechCapitalize(event.results[0][0].transcript)
                vm.filter()
                // console.log(`Confidence: ${event.results[0][0].confidence}`)
            }

            this.SpeechRecognition.RecognitionEngine.onspeechend = function () {
                vm.SpeechRecognition.Status.Listening = false
                vm.SpeechRecognition.Status.Analyzing = true
                vm.SpeechRecognition.RecognitionEngine.stop()
            }

            this.SpeechRecognition.RecognitionEngine.onerror = function (event) {
                vm.SpeechRecognition.Status.Listening = false
                vm.SpeechRecognition.Status.Analyzing = false
                console.error(`Error occurred in this.SpeechRecognition.RecognitionEngine: ${event.error}`)
            }
        }
    }
}
</script>
