import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import React from 'react';
import ReactDOM from 'react-dom';
import BugTracking from './BugTracking/BugTracking.js';
import Chat from './Chat/Chat.js';
import ProjectManagement from './ProjectManagement/ProjectManagement.js';
import Setting from './Setting/Setting.js';
import Navbar from './Navbar/Nav.js';
import Menu from './Menu.js';


import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from 'react-router-dom';

import PropTypes from "prop-types";

class Protected extends React.Component {
  render() {
    return(
      <li>
        <NavLink exact activeClassName='active' to='/setting'>Setting</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/chat'>Chat</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/bugtrack'>Bug Tracking</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/projectmanage'>Project Management</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/menu'>Menu</NavLink>
      </li>

    )

  }
}


export default Protected
