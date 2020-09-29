import React from 'react';
// import logo from './logo.svg';
import './App.css';
import UserView from './component/Home/userComponent/UserView';
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./component/Home/Home";
import Setting from "./component/setting/Setting";
import LoginPage from "./component/LandingPage";
import PageNotFound from "./component/PageNotFound";


function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/home" exact>
          <Home></Home>
        </Route>
        <Route path="/setting" exact>
          <Setting></Setting>
        </Route>
        <Route path="/" exact >
          <LoginPage></LoginPage>
        </Route>
        <Redirect from="/login" to="/"></Redirect>
        <Route >
          <PageNotFound></PageNotFound>
        </Route>
      </Switch>


    </React.Fragment >
  );
}

export default App;
