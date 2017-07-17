import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker.js';
import * as Users from './Team4of5_Service/Users.js';

import './App.css';

import Menu from './Team4of5_App/Menu.js';
import Public from './Team4of5_App/Public/Public.js'
import UserLoginSignup from './Team4of5_App/UserLoginSignup/UserLoginSignup.js'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'


class App extends React.Component {

    render(){
        return(

            <Router>
              <div>
                <ul>
                  <li><Link to="/public">Public Page</Link></li>
                  <li><Link to="/login">Login Page</Link></li>

                </ul>
                <Route path="/public" component={Public}/>
                <Route path="/login" component={UserLoginSignup}/>
                <Route path="/menu" component={Menu}/>
              </div>
            </Router>

        );
    }

}

export default App;
