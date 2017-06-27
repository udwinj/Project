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
      <Navbar>
         <Navbar.Collapse>
        <Nav >
          <NavItem>
            <Button><NavLink activeClassName='active' to='/menu/BugTracking'>Issue</NavLink></Button>
          </NavItem>
          <NavItem>
            <Button><NavLink activeClassName='active' to='/menu/IssueReports'>Reports</NavLink></Button>
          </NavItem>
        </Nav>
        </Navbar.Collapse>
     </Navbar>
 );
}
}

export default IssueTrackerNav;
