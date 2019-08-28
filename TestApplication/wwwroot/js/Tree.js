Vue.component('track-item', {
    template: '#track-item-template',
    props: {
        track: Object
    },
    data:
        function () {
            return {
                like: this.track.like,
                dislike: this.track.dislike,
                favorite: this.track.favorite,
            }
        },
    methods:
    {
        likeHandler: function () {
            this.like = !this.like;
            axios.post('/Home/PostTrackInfo', { trackData: this.track })
                .then(function () {
                    this.dislike = false;
                    if (this.favorite && !this.like) {
                        this.favorite = false;
                        $.notify("Трек '" + this.track.name + "' удален из избранного", "info");
                    }
                }).catch(function (err) {
                    console.log(err, err)
                })
        },
        dislikeHandler: function () {
            this.like = false;
            if (this.favorite) {
                this.favorite = false;
                $.notify("Трек '" + this.track.name + "' удален из избранного", "info");
            }

            this.dislike = !this.dislike;
        },
        favoriteHandler: function () {
            this.favorite = !this.favorite;
            this.favorite ?
                $.notify("Трек '" + this.track.name + "' добавлен в избранное", "success") :
                $.notify("Трек '" + this.track.name + "' удален из избранного", "info");
        }
    }
})

Vue.component('tree-item', {
    template: '#tree-item-template',
    props: {
        item: Object
    },
    data: function () {
        return {
            isOpen: false
        }
    },
    computed: {
        isFolder: function () {
            return this.item.album &&
                this.item.album.length
        }
    },
    methods: {
        toggle: function () {
            if (this.isFolder) {
                this.isOpen = !this.isOpen
            }
        },
        detail: function (element) {
            this.$emit('node-change', element);
        }
    }
})


var MusicApp = new Vue({
    el: '#MusicApp',
    data() {
        return {
            treeData: [],
            tracks: [],
            searchString: ''
        };
    },
    mounted() {
        axios
            .get('/Home/GetTree')
            .then(response => { this.treeData = response.data; })

    },
    methods: {
        search: function () {
            debugger;
            axios
                .get('/Home/Search?str=' + this.searchString)
                .then(response => { this.treeData = response });

        },
        setdata: function (data) {
            debugger;
            this.treeData = data;
        },
        changenode: function (element) {
            if (!element.album) {
                axios
                    .get('/Home/GetTracks?albumId=' + element.id)
                    .then(response => { response.data ? this.tracks = response.data : null });
            }
        }
    }
})