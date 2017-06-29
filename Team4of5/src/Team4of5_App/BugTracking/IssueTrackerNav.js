import React from 'react';
import { Navbar, NavItem, Nav, Jumbotron, Button, Input} from 'react-bootstrap';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    NavLink
} from 'react-router-dom';
import IssueReports from './IssueReports.js';

class  IssueTrackerNav extends React.Component {
    constructor(props) {
        super(props);

     this.state = {
      redirectToMenu: false,
    };
  }

render(){


  return (
      <div>
         <Navbar>
        <Nav >
          <NavItem>
            <NavLink activeClassName='active' to='/menu/BugTracking'>Issue</NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeClassName='active' to='/menu/IssueReports'>Reports</NavLink>
          </NavItem>
          <NavItem>
            <NavLink activeClassName='active' to='/menu/NewIssue'>Create New Issue</NavLink>
          </NavItem>
        </Nav>
        </Navbar>
    </div>
 );
}
}

export default IssueTrackerNav;
