$(function () {


    let table = new Vue({
        el: "#searchbar",
        data: {
            users: [],
            value1: "",
            value2: "",
            activeUser1: {},
            activeUser2: {},
            activeMedia1: {},
            activeMedia2: {},
            search: "",
            current: 0,
            showList: false,
        },
        computed: {
            accessToken: function () {

                //// Get access token via Login Button
                // let url = window.location.href;
                // let split = url.split("#access_token=");
                // return split[split.length - 1]

                // Get access token
                return "316085852.c61259b.34b9c69710644b89b60b32e28547f2c7"
            }
        },
        methods: {
            updateUsers(text) {
                this.value = text;
                let self = this;

                //set showList to true
                this.showList = true;

                //https://api.instagram.com/oauth/authorize/?client_id=c61259b12ba44dd7bf6ac2c07e665e41&redirect_uri=https://github.com/Fernandadp/instamatch&response_type=token&scope=basic+public_content

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
            enterOrClick (userOneOrTwo) {

                // guard: this.users.length > 0
                if (this.users.length === 0) {
                    return
                }

                let activeUser = this.users[this.current];

                // set active user
                userOneOrTwo === "1" ? this.activeUser1 = activeUser : this.activeUser2 = activeUser;
                this.value = activeUser.username;

                // hide list
                this.showList = false;

                // get media of active user
                let self = this;
                $.getJSON("https://api.instagram.com/v1/users/" + activeUser.id + "/media/recent/?access_token=" + this.accessToken,
                    function (json) {
                        userOneOrTwo === "1" ? this.activeMedia1 = json.data : this.activeMedia2 = json.data;
                    });
                console.log(this.activeUser1);
            },

            // When up pressed while suggestions are showList
            up () {
                if (this.current > 0) {
                    this.current--
                }
            },

            // When up pressed while suggestions are showList
            down () {
                if (this.current < this.users.length - 1) {
                    this.current++
                }
            },

            // For highlighting element
            isActive (index) {
                return index === this.current
            },
        },
    })

})
;
