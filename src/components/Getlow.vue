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


<style lang="scss">
@import "~foundation-sites/scss/foundation";
@import "../assets/app.scss";

footer {
    background-color: $color-level1;
    margin: 0.4em 0.2em 0 0.2em;
    padding: 0 2em;
    .musigger-icon {
        text-align: right;
        img {
            width: 4.7em;
            margin: 2.73em 0;
        }
    }
    .musigger-title {
        h1 {
            display: inline-block;
            font-size: 3em;
            line-height: 1.2em;
            margin: 0.67em 0;
        }
    }
    ul {
        list-style: none;
        padding: 0;
        li > a {
            text-decoration: none;
            color: black !important;
            &:after {
                content: '\00a0›';
            }
        }
    }
    .footer-down {
        padding: 2em 0;
        span {
            font-size: 0.8em;
            font-weight: bold;
        }
        .madeby {
            float: right;
        }
    }
    @media #{$small-only} {
        padding: 0 1em;
        font-size: 0.9em;
    }
}
</style>
