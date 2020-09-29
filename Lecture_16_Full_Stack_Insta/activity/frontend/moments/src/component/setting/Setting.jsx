import "./settings.css";
import React, { Component } from 'react';
import axios from "axios";

class Setting extends Component {
    state = {
        name: "",
        src: "",
        disabled: true,
        handle: ""
    }
    // pointer declare 
    fileRef = React.createRef();
    componentDidMount() {
        axios.get("/api/v1/user/038b49c0-1169-4bbf-81e7-18180a7789f9")
            .then((res) => {
                let { handle, name, pimg_url } = res.data.user;
                this.setState({ handle: handle, name, src: pimg_url });
            })
    }
    updateInput = (event) => {
        let prop = event.target.name;
        let val = event.target.value;
        this.setState({
            [prop]: val
        })
    }

    handleUpdate = (event) => {
        event.preventDefault()
        this.setState({
            disabled: !this.state.disabled
        })
    }
    updateUser = async (event) => {
        event.preventDefault();
        // to send file with text 
        const formData = new FormData();
        let img = this.fileRef.current.files[0];
        formData.append("photo", img);
        formData.append("name", this.state.name);
        formData.append("handle", this.state.handleUpdate);
        let { data } = await axios
            .patch
            ("/api/v1/user/038b49c0-1169-4bbf-81e7-18180a7789f9", 
            formData)
        console.log(data);
        this.setState({
            disabled: true
        })
    }
    render() {
        return (
            <React.Fragment >
                <h1>Settings Page</h1>
                <form onSubmit={this.updateUser}>
                    <img src={this.state.src} alt="" />
                    {/* refrenece is readonly */}
                    <input type="file" ref={this.fileRef} />
                    <label htmlFor="name"
                    >Name</label>
                    <input type="text" id="name" name="name"
                        value={this.state.name}
                        onChange={this.updateInput}
                        // point
                        disabled={this.state.disabled} />
                    <label htmlFor="handle"
                    >Handle</label>
                    <input type="text" id="handle" name="handle"
                        value={this.state.handle}
                        onChange={this.updateInput}
                        // point
                        disabled={this.state.disabled} />
                    <button type="submit">Submit</button>
                    <button className="edit" onClick={this.handleUpdate}>
                        edit </button>
                </form>
            </React.Fragment >
        );
    }
}



export default Setting;