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

class RouteMap extends React.Component {
  render() {
    return(
      <Router>
        <div className = 'container'>
          <Navbar/>
          <Switch>
          <Route exact path='/menu' component={Menu} />
           <Route  path='/setting' component={Setting} />
           <Route  path='/bugtrack' component={BugTracking} />
           <Route  path='/chat' component={Chat} />
           <Route path='/projectmanage' component={ProjectManagement} />

          </Switch>
        </div>
      </Router>

    )

  }
}
export default RouteMap;
