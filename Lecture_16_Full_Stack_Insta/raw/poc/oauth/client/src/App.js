import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect, Link } from "react-router-dom";
import axios from "axios";
class App extends Component {
  state = {
    isAuth: false
  }
  setAuth = () => {
    // this.setState({
    //   isAuth: true
    // })
    window.location = "/auth/google";
  }
  removeAuth = () => {
    this.setState({
      isAuth: false
    })
  }
  componentDidMount = () => {
    axios.get("/confirmLogin").then((res) => {
      let { data } = res;
      if (data.status) {
        this.setState({ isAuth: true });
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  render() {
    let { isAuth } = this.state;
    return (
      <React.Fragment>
        {/* <a href="/auth/google"></a> */}
        <h1>Oauth Example</h1>

        <Route path="/"
          render={(props) => {
            return <MenuBar isAuth={isAuth} setAuth={this.setAuth} {...props}></MenuBar>
          }}
        >
        </Route>
        <Switch>
          {/* profile */}
          <Route path="/profile" exact isAuth={isAuth}
            render={(props) => {
              return (
                isAuth == true ? < Profile  {...props} removeAuth={this.removeAuth}></Profile> : <Redirect to="/"></Redirect>)
            }}>
          </Route>
          {/* settings page */}
          <Route path="/Setting" exact
            render={(props) => {
              return (
                isAuth == true ?
                  < Setting {...props}></Setting> : <Redirect to="/"></Redirect>)
            }}>

          </Route>
          {/* login Page */}
          <Route path="/">
            <h2>Login Page</h2>
          </Route>
        </Switch >
      </React.Fragment >
    );
  }
}
const MenuBar = (props) => {
  const goToProfile = () => {
    // sate 
    props.setAuth();
    props.history.push("/profile");
  }
  return (
    <React.Fragment>
      <div>```````````````````````````````````````````````````````````</div>
      <button onClick={goToProfile}>Login</button>
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/setting">Setting</Link>
        </li>
        <li>
          <Link to="/https://www.google.com">GO to google</Link>
          {/*  */}
          {/* <a href="https://www.google.com"> GO to google</a> */}

        </li>
      </ul>
      <div>```````````````````````````````````````````````````````````</div>
    </React.Fragment>
  );
}

const Profile = (props) => {
  const goToHome = () => {
    props.removeAuth();
    props.history.push("/");
  }
  return (
    <React.Fragment>
      <h2>Profile Page</h2>

      <button onClick={goToHome}>Logout </button>
    </React.Fragment>
  );
}

const Setting = () => {
  return (
    <React.Fragment>
      <h2>Setting Page</h2>
    </React.Fragment>
  );
}
export default App;
