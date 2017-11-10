<template>
    <footer class="grid-x">
        <div class="small-12 cell">
            <h1>Musigger</h1>
        </div>
        <div class="large-2 medium-4 small-12 cell">
            <ul>
                <li><a href="https://github.com/Musigger" target="_blank">GitHub</a></li>
                <li><a href="https://www.facebook.com/nullrdv/" target="_blank">NRDV</a></li>
                <li><a href="https://www.promusity.com/" target="_blank">Promusity</a></li>
            </ul>
        </div>
        <div class="large-10 medium-8 small-12 cell">
            <strong>What musiggger is?</strong>
            <p>Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla quis lorem ut libero malesuada feugiat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Nulla porttitor accumsan tincidunt. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Nulla porttitor accumsan tincidunt.</p>
        </div>
        <div class="footer-down small-12 cell">
            <span>Version 0.3</span>
            <span class="madeby">Developed by NRDV</span>
        </div>
    </footer>
</template>

<style lang="scss">
@import "../assets/app.scss";
footer {
    background-color: $color-level1;
    margin: 1.2em 0.2em 0.4em;
    padding: 0 2em;
    h1 {
        font-size: 3em;
    }
    ul {
        list-style: none;
        padding: 0;
        li > a {
            text-decoration: none;
            color: black;
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
}
</style>