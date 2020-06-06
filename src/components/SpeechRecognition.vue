<template>
    <button
        v-if="Available"
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
            :color="(Status.Listening) ? 'red' : ''"
            scale="0.9"
        />
    </button>
</template>

<script>
import "vue-awesome/icons"
import Icon from "vue-awesome/components/Icon"

export default {
    name: "SpeechRecognitionButton",
    components: {
        Icon
    },
    data() {
        return {
            Available: false,
            RecognitionAPI: null,
            RecognitionEngine: null,
            Status: {
                Ready: false,
                Listening: false,
                Analyzing: false,
                Complete: false
            },
            Timer: null
        }
    },
    computed: {
        SpeechRecognitionIcon() {
            if (this.Status.Listening) return "circle-notch"
            if (this.Status.Analyzing) return "spinner"
            return "microphone"
        },
        SpeechRecognitionIconPulse() {
            if (this.Status.Analyzing) return true
            return false
        },
        SpeechRecognitionIconSpin() {
            if (this.Status.Listening) return true
            return false
        }
    },
    created() {
        // check speech recognition availability
        this.speechCheckAvailability()
    },
    methods: {
        speechCheckAvailability() {
            if (("webkitSpeechRecognition" in window)) {
                this.Available = true
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
            this.RecognitionAPI = webkitSpeechRecognition
            this.RecognitionEngine = new this.RecognitionAPI()

            this.RecognitionEngine.continuous = false
            this.RecognitionEngine.lang = "en-US"
            this.RecognitionEngine.interimResults = false
            this.RecognitionEngine.maxAlternatives = 1

            this.Status.Ready = true
        },
        speechRecognise() {
            const vm = this
            if (this.Status.Listening || this.Status.Analyzing) {
                this.speechStopRecognise()
                return
            }
            if (!this.Status.Ready) return

            this.RecognitionEngine.start()
            // console.log("Waiting for speech...")
            this.Status.Complete = false
            this.Status.Listening = true

            this.RecognitionEngine.onresult = function (event) {
                if (vm.Status.Complete) return
                vm.speechStopTimer()
                // const log = `%cBest result: ${event.results[0][0].transcript}. Confidence: ${event.results[0][0].confidence}.`
                // if (event.results[0][0].confidence < 0.6) console.log(log, "color: darkred;")
                // else if (event.results[0][0].confidence < 0.8) console.log(log, "color: darkorange;")
                // else if (event.results[0][0].confidence < 0.9) console.log(log, "color: olive;")
                // else console.log(log, "color: green;")

                vm.speechSetStatusComplete()
                vm.$emit("voice-recognition-result", vm.speechCapitalize(event.results[0][0].transcript))
            }

            this.RecognitionEngine.onspeechend = function () {
                if (vm.Status.Complete) return

                // console.log("Processing in progress")
                vm.Status.Listening = false
                vm.Status.Analyzing = true
                vm.RecognitionEngine.stop()
                vm.Timer = setTimeout(stopRecognition, 5000)
            }

            this.RecognitionEngine.onerror = function () {
                // console.error(`Error occurred in this.RecognitionEngine: ${event.error}`)
                vm.Status.Listening = false
                vm.Status.Analyzing = false
            }

            function stopRecognition() {
                vm.RecognitionEngine.stop()
                // console.error("Web Speech API is not responding")
                vm.speechSetStatusComplete()
                vm.speechStopTimer()
            }
        },
        speechStopRecognise() {
            this.RecognitionEngine.abort()
            // console.log("Speech recognition is stopped by user")
            this.speechSetStatusComplete()
            this.speechStopTimer()
        },
        speechSetStatusComplete() {
            this.Status.Listening = false
            this.Status.Analyzing = false
            this.Status.Complete = true
        },
        speechStopTimer() {
            if (this.Timer) clearInterval(this.Timer)
        }
    }
}
</script>
