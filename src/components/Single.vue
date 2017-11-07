<template>
    <div v-if="Release" class="release">
        <img v-bind:src="freakeurl+Release.Cover">
        <p>{{Release.Name}}</p>
        <p>{{Release.Type}}</p>
        <p>{{Release.Votes}}</p>
        <p>{{Release.Rating}}</p>
        <p>{{Release.Genres}}</p>
        <p>{{Release.Artists}}</p>
        <p>{{Release.Label}}</p>
        <div v-html="Release.Info"></div>
        <div v-html="Release.Links"></div>
        <a v-bind:href="freakeurl+'/'+Release.ReleaseId" target="_blank">Freake link</a>
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

</style>