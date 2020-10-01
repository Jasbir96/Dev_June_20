import React, { Component } from 'react';
import "font-awesome/css/font-awesome.css";
import axios from "axios";
class Main extends Component {
    state = {
        allPost: [],
        userInfo: "",
        contentArrived: false
    }
    deletePost = (id) => {
        console.log(id);
        // remove request
        // 
        // req to backend 
        // filter 

        let { allPost } = this.state;
        allPost = allPost.filter(post => post.id !== id);
        this.setState({ allPost })

    }
    async componentDidMount() {
        let res = await axios.get("/api/v1/user/mypost/038b49c0-1169-4bbf-81e7-18180a7789f9")
        let userResp = await axios.get("/api/v1/user/038b49c0-1169-4bbf-81e7-18180a7789f9");
        let list = res.data.message;
        let user = userResp.data.user;
        console.log(list);
        console.log(user);
        this.setState({
            contentArrived: true,
            allPost: list,
            userInfo: user
        })
    }
    render() {
        let { contentArrived, allPost, userInfo }
            = this.state;
        return (
            <div className="main">
                {contentArrived == false ?
                    <div>Loading</div> : <PostList
                        allPost={allPost}
                        userInfo={userInfo}
                        deletePost={this.deletePost}
                    ></PostList>}

            </div>
        );
    }
}

export default Main;

function PostList(props) {
    let { allPost, userInfo, deletePost } = props;

    return (
        <React.Fragment>
            { allPost.map((post) => {
                return <div className="post" key={post.id}>
                    {/*user data& timings */}
                    <div className="user-data-container">
                        <div className="user___image--container">
                            <img src={userInfo.pimg_url} alt="" className="user__image" />
                        </div>
                        <div className="user__name">
                            {userInfo.name}
                        </div>
                        <div className="isverfied">
                            <i className="fa fa-check" aria-hidden="true"></i>
                        </div>
                        <div className="delete">
                            <i className="fa fa-trash" onClick={() => {
                                deletePost(post.id)
                            }} aria-hidden="true"></i>
                        </div>
                    </div>
                    {/*post Image */}
                    <div className="posted-time">{post.created_at}</div>
                    <div className="post__img-container">
                        <img src={post.p_img_url} alt="post img" className="post__img" />
                    </div>

                    <div className="description">
                        {/* like button */}

                        <i className="fa fa-heart-o" aria-hidden="true"></i>
                        {/* comment */}
                        <i className="fa fa-comment-o" aria-hidden="true"></i>
                        {/* user name */}
                        {/* descp */}
                        <div className="descp">
                            {post.descp}
                        </div>
                    </div>
                </div>
            })
            }

        </React.Fragment>
    )
}