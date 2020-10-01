import React, { Component } from 'react';
import "font-awesome/css/font-awesome.css";
import { Link } from "react-router-dom";
class Header extends Component {
    state = {
        
    }


    render() {
        let { MainState } = this.state;
        return (
            <div className="header">
                {/* feed /POST */}
                <div className="feed">
                    {MainState == "feed" ? <div>Post</div> : <div>Feed</div>}
                </div>
                {/* search */}
                <div className="search">search</div>
                {/* create post */}
                <Link to="/home/create">
                    <i className="fa fa-plus" aria-hidden="true">
                    </i>
                </Link>
            </div>
        );
    }
}

export default Header;