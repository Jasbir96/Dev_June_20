import React, { Component } from 'react';
import Header from "./Header";
import Main from "./Main";
import CreatPost from "./CreatePost";
import { Route } from "react-router-dom";
class PostView extends Component {
    state = {}
    render() {
        return (
            <div className="post-view">
                <Header>
                </Header>
                <Main></Main>

                <CreatPost></CreatPost>
            </div>
        );
    }
}

export default PostView;