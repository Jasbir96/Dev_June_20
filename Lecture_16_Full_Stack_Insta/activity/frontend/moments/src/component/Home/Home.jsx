import React, { Component } from 'react';
import UserView from "./userComponent/UserView";
import PostView from "./postComponent/PostView";
class Home extends Component {
    state = {}
    render() {
        console.log(this.props);
        return (
            <div className="app">
                <UserView></UserView>
                <PostView ></PostView>
            </div>
        );
    }
}

export default Home;