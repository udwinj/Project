import React from 'react';

import { Navbar, NavItem, Nav,  NavDropdown, MenuItem } from 'react-bootstrap';
import './Nav.css';

//load the firebase
import * as firebase from 'firebase';
import * as Config from '../../Team4of5_Service/Config.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  NavLink
} from 'react-router-dom';

class NavbarHeaderC extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      role: '',
      displayname: '',
      redirectToMenu: false,
      userInfo: [],
    };
    this.userRef = firebase.database().ref().child('users');
  }
  componentDidMount() {

    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      uid = user.uid;


      var thisUser = firebase.database().ref().child('users/' + uid);
      thisUser.on('value', this.gotData, this.errData);
    }

  }
  gotData = (data) => {
    let newUser = []
    const userdata = data.val();
    firebase.auth().currentUser.updateProfile({
      displayName: userdata.display_name
    }).then(function () {
      // Update successful.
    }, function (error) {
      // An error happened.
    });
    //const keys = Object.keys(userdata);

    newUser.push(userdata.role);
    newUser.push(userdata.display_name);
    newUser.push(userdata.company);
    this.setState({ userInfo: newUser });
  }
  render() {


    return (
      <Navbar  collapseOnSelect activeKey="5" className="navbar navbar-default">
        <Navbar.Header>
          <Navbar.Brand >
            <a>Team 4 of 5</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem id="chat1" eventKey={1}>
              <Link id="chat" to='/menu/Chat'>Chat</Link>
            </NavItem>
            <NavItem id="pm1" eventKey={2}>
              <Link id="pm" to='/menu/ProjectManagement'>Project Management</Link>
            </NavItem>
            <NavItem id="issue1" eventKey={3}>
              <Link id="issue" to='/menu/IssueTracker'>Issue Tracker</Link>
            </NavItem>
            <NavItem id="setting1" eventKey={4}>
              <Link id="setting" to='/menu/Settings'>Settings</Link>
            </NavItem>


        </Nav>
         <Nav pullRight>
             <NavDropdown eventKey={5}>
                <MenuItem id="menu1" eventKey={5.1}>
              <Link id="menu" to='/menu'>Menu</Link>
             </MenuItem>
            <MenuItem id="logout1" eventKey={5.2}>
              <Link id="logout" to='/login'>Logout</Link>
               </MenuItem>
            </NavDropdown>
            <MenuItem>Welcome, {this.state.userInfo[1]}</MenuItem>
            <MenuItem>Company {this.state.userInfo[2]}</MenuItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    );
  }
}

export default NavbarHeaderC;
