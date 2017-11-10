 <template id="pagination-template">
    <div class="pagination grid-x">
        <div class="pagination-left">
            <a href="#" v-if="hasPrev()" @click.prevent="changePage(prevPage)">Previous</a>
        </div>
        <div class="pagination-mid">
            <ul>
                <li v-if="hasFirst()"><a href="#" @click.prevent="changePage(1)">1</a></li>
                <li v-if="hasFirst()">. . .</li>
                <li v-for="page in pages">
                    <a href="#" @click.prevent="changePage(page)" :class="{ current: current == page }">
                        {{ page }}
                    </a>
                </li>
                <li v-if="hasLast()">. . .</li>
                <li v-if="hasLast()"><a href="#" @click.prevent="changePage(totalPages)">{{ totalPages }}</a></li>
            </ul>
        </div>
        <div class="pagination-right">
            <a href="#" v-if="hasNext()" @click.prevent="changePage(nextPage)">Next</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'pagination',
    props: {
        current: {
            default: 1,
            type: Number
        },
        total: {
            type: Number,
            default: 0
        },
        perPage: {
            type: Number,
            default: 0
        },
        pageRange: {
            type: Number,
            default: 2
        },
        votes: {
            type: Number,
            default: 0
        },
        genres: {
            type: String,
            default: ''
        },
        labels: {
            type: String,
            default: ''
        },
        types: {
            type: String,
            default: ''
        }
    },
    computed: {
        pages: function () {
            var pages = []
            for (var i = this.rangeStart; i <= this.rangeEnd; i++) {
                pages.push(i)
            }
            return pages
        },
        rangeStart: function () {
            var start = this.current - this.pageRange
            return (start > 0) ? start : 1
        },
        rangeEnd: function () {
            var end = this.current + this.pageRange
            return (end < this.totalPages) ? end : this.totalPages
        },
        totalPages: function () {
            return Math.ceil(this.total / this.perPage)
        },
        nextPage: function () {
            return this.current + 1
        },
        prevPage: function () {
            return this.current - 1
        }
    },
    methods: {
        hasFirst: function () {
            return this.rangeStart !== 1
        },
        hasLast: function () {
            return this.rangeEnd < this.totalPages
        },
        hasPrev: function () {
            return this.current > 1
        },
        hasNext: function () {
            return this.current < this.totalPages
        },
        changePage: function (page) {
            this.$emit('page-changed', page, this.votes, this.perPage, this.genres, this.labels, this.types)
        }
    }
}
</script>
<style lang="scss">
.pagination {
    justify-content: space-between;
    margin: 40px 0;
    font-weight: bold;
    .pagination-left a,
    .pagination-right a,
    .pagination-mid ul li a {
        padding: 10px 20px;
        background-color: white;
        margin: 0 5px;
        text-decoration: none;
        color: black;
        transition: all 0.2s ease;
        &.current,
        &:hover {
            color: white;
            background-color: DodgerBlue;
        }
    }
    .pagination-mid ul {
        display: flex;
        flex-direction: row;
        list-style: none;
        margin: 0;
    }
}
</style>