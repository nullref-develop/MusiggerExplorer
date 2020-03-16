<template>
    <footer>
        <div class="grid-x">
            <div class="musigger-title auto cell">
                <h1>Musigger</h1>
            </div>
            <div class="musigger-icon medium-2 small-3 cell">
                <img src="../assets/icon.svg" alt="Musigger logo">
            </div>
        </div>
        <div class="grid-x">
            <div class="large-2 medium-4 small-12 cell">
                <ul>
                    <li>
                        <a
                            href="https://github.com/Musigger"
                            target="_blank"
                            rel="noopener"
                        >GitHub</a>
                    </li>
                    <li>
                        <a
                            href="https://www.facebook.com/nullrdv/"
                            target="_blank"
                            rel="noopener"
                        >NRDV</a>
                    </li>
                </ul>
            </div>
            <div class="large-10 medium-8 small-12 cell">
                <strong>What musigger is?</strong>
                <!-- eslint-disable-next-line max-len -->
                <p>Web application (music digger) for searching and filtering music releases. Musigger provides flexible release filtering engine that sorts by genres, types, labels, votes and even artists. Also it offers superrior perfomance and modern design. Music collection updates every day. Can you belive it, here you can download every release without registration and sms!</p>
            </div>
        </div>
        <div class="grid-x">
            <div class="footer-down small-12 cell">
                <span>Version {{ Version }}</span>
                <span class="madeby">Developed by NRDV</span>
            </div>
        </div>
    </footer>
</template>

<script>
import pjson from "../../package.json"

export default {
    name: "GetLow",
    computed: {
        Version() {
            return pjson.version
        }
    }
}
</script>
