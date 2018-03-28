var usersData = data.graphql.user;
var name = usersData.username
var followers = usersData.edge_followed_by.count;
var profPic = usersData.profile_pic_url_hd;
var popularity

$(usersData.edge_owner_to_timeline_media.edges.node).each(function (likes) {


})

$("#name1").append("Name:  " + name);
$("#followers1").append("Followers:  " + followers);

$("#user1").attr("placeholder", "Search user");
$("#user2").attr("placeholder", "Search second user");



console.log(name);

