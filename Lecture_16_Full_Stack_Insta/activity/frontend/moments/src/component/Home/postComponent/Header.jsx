import React, { Component } from 'react';
import "font-awesome/css/font-awesome.css";
import { Link } from "react-router-dom";
class Header extends Component {
    state = {}
    render() {
        return (
            <div className="header">
                {/* feed /POST */}
                <div className="feed">Feed</div>
                {/* search */}
                <div className="search">search</div>
                {/* create post */}

                <i className="fa fa-plus" aria-hidden="true">
                    <Link to="/home/create"></Link>
                </i>
            </div>
        );
    }
}

export default Header;