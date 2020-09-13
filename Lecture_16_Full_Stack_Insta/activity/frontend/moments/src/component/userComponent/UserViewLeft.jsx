// imrc
import React, { Component } from 'react';
import axios from "axios";
// cc
class UserViewLeft extends Component {
    state = {
        src: "",
        handle: "....",
        name: "...",
        noOfpost: "",
        followersCount: "",
        followingCount: ""
    }
    //  ui pe print 
    componentDidMount() {
        // getUser
        axios.get("/api/v1/user/1c10a5c8-6627-46d5-a6c9-63886b343310")
            .then((res) => {
                let { handle, name } = res.data.user
                this.setState({ handle: handle, name });
            }).then(() => {
                return axios.get("/api/v1/user/request/1c10a5c8-6627-46d5-a6c9-63886b343310");
            }).then((res) => {
                let followers = res.data.message.filter(follower=> follower.is_accepted == 1);
                console.log(followers);
                this.setState({ followersCount: followers.length });
            })
            .catch(function (err) { console.log(err) });
    }
    render() {
        let { src, handle, name, noOfpost, followersCount, followingCount } = this.state;
        // console.log("I was rendered");
        return (<React.Fragment>
            <div className="profile">
                <div className="profile-details">
                    <img src={src} alt="profile-img" />
                    <p>{name}</p>
                    <p>{handle}</p>
                </div>
                <div className="profile-stats">
                    <div className="stat ">
                        <div className="post">{noOfpost}</div>
                        <div>POST</div>
                    </div>
                    <div className="stat ">
                        <div className="followers">{followersCount}</div>
                        <div>Followers</div>
                    </div>
                    <div className="stat ">
                        <div className="following">{followingCount}</div>
                        <div >Following</div>
                    </div>
                </div>
            </div>
            <div className="menu">Menu</div>
            {/* <p>{title} </p> */}
        </React.Fragment>);
    }
}

export default UserViewLeft;