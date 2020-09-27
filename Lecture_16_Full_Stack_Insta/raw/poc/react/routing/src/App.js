import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from "./component/home";
import Profile from "./component/profile";
import Page404 from "./component/pageNotFound";
import About from "./component/about";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from './component/NavBar';
function App() {
  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Switch>
        <Route path="/profile/new">
          <Profile></Profile>
        </Route>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/profile" exact>
          <Profile></Profile>
        </Route>
        <Route path="/about">
          <About></About>
        </Route>
        <Route path="/" exact >
          <Home></Home>
        </Route>
        <Route path="/404">
          <Page404></Page404>
        </Route>
        {/* 404 */}
        <Redirect to="/404"></Redirect>
      </Switch>
    </React.Fragment>

  );
}

export default App;
