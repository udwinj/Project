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

class  NavbarHeaderC extends React.Component {
render(){
  return (
      <Navbar inverse>
         <Navbar.Header>
           <Navbar.Brand>
                 <a>Team 4 Of 5</a>
            </Navbar.Brand>
         </Navbar.Header>
         <Navbar.Collapse>
        <Nav >
          <NavItem>
            <Button><NavLink activeStyle={{fontWeight: 'bold',color: 'black'}} activeClassName='active' to='/menu/Chat'>Chat</NavLink></Button>
          </NavItem>
          <NavItem>
            <Button><NavLink activeStyle={{fontWeight: 'bold',color: 'black'}} exact activeClassName='active' to='/menu/Settings'>Settings</NavLink></Button>
          </NavItem>
          <NavItem>
              <Button><NavLink activeStyle={{fontWeight: 'bold',color: 'black'}} activeClassName='active' to='/menu/BugTracking'>Bug Tracking</NavLink></Button>
          </NavItem>
          <NavItem>
            <Button><NavLink activeStyle={{fontWeight: 'bold', color: 'black'}} activeClassName='active' to='/menu/ProjectManagement'>Project Management</NavLink></Button>
          </NavItem>
          <NavItem>
            <Button><NavLink activeStyle={{fontWeight: 'bold',color: 'black'}} activeClassName='active' to='/menu'>Menu</NavLink></Button>
          </NavItem>
          <NavItem>
            <Button><NavLink activeStyle={{fontWeight: 'bold', color: 'black'}} activeClassName='active' to='/login'>LogOut</NavLink></Button>
          </NavItem>
        </Nav>
        </Navbar.Collapse>
     </Navbar>

 );
}
}

export default NavbarHeaderC;
