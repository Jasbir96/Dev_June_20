let btn = document.querySelector(".search");
let input = document.querySelector("input");
let profile = document.querySelector(".profile");
let follower = document.querySelector(".follower");
let request = document.querySelector(".request");

btn.addEventListener("click", function (e) {
    e.preventDefault();
    populateUI(input.value);
    input.value = "";
})
async function populateUI(id) {
    let user = await axios.get(`/api/v1/user/${id}`);
    let AllFollowers = await axios.get(`/api/v1/user/request/${id}`)
        ;
    let userDataObj = user.data.user;
    let AllFollowersArr = AllFollowers.data.message;
    let followers = AllFollowersArr.filter(function (entry) {
        return entry.is_accepted == 1;
    })
    let request = AllFollowersArr.filter(function (entry) {
        return entry.is_accepted == 0;
    })
    addToProfile(userDataObj);
    addToFollowers(followers);
    addToRequest(request);
}
function addToProfile(userObj) {
    let details = document.createElement("div");
    details.innerText = JSON.stringify(userObj);
    profile.appendChild(details);
}
function addToFollowers(followerArr) {
    let ul = document.createElement("ul");
    for (let i = 0; i < followerArr.length; i++) {
        let li = document.createElement('li');
        li.textContent = followerArr[i].follower_id
        ul.appendChild(li);
    }
    follower.appendChild(ul)
}
function addToRequest(requestArr) {
    let ul = document.createElement("ul");
    for (let i = 0; i < requestArr.length; i++) {
        let li = document.createElement('li');
        li.textContent = requestArr[i].follower_id
        ul.appendChild(li);
    }
    request.appendChild(ul)
}