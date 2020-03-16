export default {
    data: () => ({
        IsLoading: false
    }),
    methods: {
        switchLoading() {
            this.IsLoading = !this.IsLoading
        }
    }
}
