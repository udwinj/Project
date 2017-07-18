import React from 'react';
import { Navbar, NavItem, Nav, Jumbotron, Button, Input} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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
         <Navbar  activeKey="1" >
        <Nav bsStyle="pills">
            <LinkContainer  to='/menu/IssueTracker'>
                  <NavItem  eventKey={1}>Issue</NavItem>
              </LinkContainer>


                <LinkContainer  to='/menu/IssueReports'>
                  <NavItem  eventKey={2}>Reports</NavItem>
              </LinkContainer>


                  <LinkContainer  to='/menu/NewIssue'>
                  <NavItem  eventKey={4}>Create New Issue</NavItem>
              </LinkContainer>

        </Nav>
        <Nav pullRight bsStyle="pills">
            <LinkContainer  to="/menu/IssueWiki">
                  <NavItem  eventKey={3}>Issue Wiki</NavItem>
            </LinkContainer>
        </Nav>
        </Navbar>
    </div>
 );
}
}

export default IssueTrackerNav;
