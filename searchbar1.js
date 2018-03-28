$(function () {

    Vue.directive('click-outside', {
        bind: function (el, binding, vnode) {
            el.event = function (event) {
                // here I check that click was outside the el and his childrens
                if (!(el == event.target || el.contains(event.target))) {
                    // and if it did, call method provided in attribute value
                    vnode.context[binding.expression](event);
                }
            };
            document.body.addEventListener('click', el.event)
        },
        unbind: function (el) {
            document.body.removeEventListener('click', el.event)
        },
    });

    let table = new Vue({
        el: "#searchbar1",
        data: {
            users: [],
            value: "",
            activeUser: {},
            activeMedia: {},
            search: "",
            current: 0,
            showList: false,
        },
        computed: {
            accessToken: function () {

                //// Get access token via Login Button
                let url = window.location.href;
                let split = url.split("#access_token=");
                return split[split.length - 1]
            }
        },
        methods: {
            updateUsers(text) {
                this.value = text;
                let self = this;

                //set showList to true
                this.showList = true;

                if (text.length >= 3) {
                    $.getJSON("https://api.instagram.com/v1/users/search?q=" + text + "&access_token=" + this.accessToken,
                        function (json) {
                            self.users = json.data;
                        });
                }
                else {
                    this.users = []
                }
            },

            // When enter pressed or clicked on the list item set active user and hide list
            enterOrClick() {

                // guard: this.users.length > 0
                if (this.users.length === 0) {
                    return
                }

                let activeUser = this.users[this.current];

                // set active user
                this.activeUser = activeUser;
                this.value = activeUser.username;

                // hide list
                this.showList = false;

                // get media of active user
                let self = this;
                $.getJSON("https://api.instagram.com/v1/users/" + activeUser.id + "/media/recent/?access_token=" + this.accessToken,
                    function (json) {

                        this.activeMedia = json.data;
                    });
                console.log(this.activeUser);
            },

            // When up pressed while suggestions are showList
            up() {
                if (this.current > 0) {
                    this.current--
                }
            },

            // When up pressed while suggestions are showList
            down() {
                if (this.current < this.users.length - 1) {
                    this.current++
                }
            },

            // For highlighting element
            isActive(index) {
                return index === this.current
            },
            hideList: function (event) {
                this.showList = false;
            }
        },


    })

})
;
