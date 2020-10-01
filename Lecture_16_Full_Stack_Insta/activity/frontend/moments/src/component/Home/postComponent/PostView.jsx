import React, { Component } from 'react';
import Header from "./Header";
import Main from "./Main";
import CreatPost from "./CreatePost";
import { Route } from "react-router-dom";
class PostView extends Component {
    state = {
        MainState: "feed"
    }
    render() {
        return (
            <div className="post-view">
                <Header changeMain >
                </Header>
                <Main>

                </Main>
                <Route path="/home/create" exact>
                    <CreatPost></CreatPost>
                </Route>
            </div>
        );
    }
}

export default PostView;