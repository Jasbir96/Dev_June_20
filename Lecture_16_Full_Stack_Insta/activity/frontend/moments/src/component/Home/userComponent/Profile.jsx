// imrc
import React, { Component } from 'react';
import axios from "axios";

// cc
class Profile extends Component {
    state = {
        src: "",
        handle: "....",
        name: "...",
        noOfpost: "Empty",
        followersCount: "Empty",
        followingCount: "Empty",
    }
    //  ui pe print 
    componentDidMount() {
        // getUser
        axios.get("/api/v1/user/038b49c0-1169-4bbf-81e7-18180a7789f9")
            .then((res) => {
                let { handle, name, pimg_url } = res.data.user;
                this.setState({ handle: handle, name, src:pimg_url });
            }).then(() => {
                return axios.get("/api/v1/user/request/count/038b49c0-1169-4bbf-81e7-18180a7789f9");
            }).then((res) => {
                let count = res.data.message[0].followersCount;
                // console.log(followers);
                this.setState({ followersCount: count });
            })
            .catch(function (err) { console.log(err) });
    }

    render() {
        let { src, handle, name, noOfpost, followersCount, followingCount } = this.state;
        let { updatecurrentMenu } = this.props;
        // console.log("I was rendered");
        return (<React.Fragment>
            <div className="profile-parent">
                <div className="profile">
                    <div className="profile-details">
                        <img src={src} alt="profile-img" className="profile-img"/>
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
                            <div>Following</div>
                        </div>
                    </div>
                </div>
                <div className="menu">
                    <div className="menu-list">
                        <div onClick={() => { updatecurrentMenu("suggestion"); }}>Suggestion </div>
                        <div onClick={() => { updatecurrentMenu("request"); }}>Request </div>
                        <div onClick={() => { updatecurrentMenu("followers"); }}>Followers</div>
                        <div onClick={() => { updatecurrentMenu("following"); }}>Following`</div>
                    </div>
                </div>
            </div>
            {/* <p>{title} </p> */}
        </React.Fragment>);
    }
}

export default Profile;