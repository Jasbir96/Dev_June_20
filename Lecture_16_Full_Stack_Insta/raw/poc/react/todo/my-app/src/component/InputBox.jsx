import React, { Component } from 'react';
class InputBox extends Component {
    state = { value: "" }
    handleChange = (val) => {
        this.setState({ value: val });

    }
    handleSubmit = () => {
        // 

        this.props.getDataFromInput(this.state.value);
        this.setState({value:""});
    }
    render() {
        return (<React.Fragment>
            <form onSubmit={(e) => {
                e.preventDefault();
                this.handleSubmit();
            }}>
                <input type="text"
                    value={this.state.value}
                    onChange={(e) => {

                        let val = e.currentTarget.value;
                        this.handleChange(val);
                    }} />
                <button type="submit">Add Task</button>
            </form>
        </React.Fragment>);
    }
}

export default InputBox;