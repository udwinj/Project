import React from 'react';

import { Navbar, NavItem, Nav, Jumbotron, Button, Input} from 'react-bootstrap';

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

class  NavbarHeaderC extends React.Component {
    constructor(props) {
        super(props);

     this.state = {
      role: '',
      displayname: '',
      redirectToMenu: false,
      userInfo:[],
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
    //const keys = Object.keys(userdata);

          newUser.push(userdata.role);
          newUser.push(userdata.display_name);
          this.setState({userInfo: newUser});
    }
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
              <Button><NavLink activeStyle={{fontWeight: 'bold',color: 'black'}} activeClassName='active' to='/menu/BugTracking'>Issue Tracker</NavLink></Button>
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
          <NavItem>Welcome, {this.state.userInfo[1]}</NavItem>
        </Nav>
        </Navbar.Collapse>
     </Navbar>

 );
}
}

export default NavbarHeaderC;
