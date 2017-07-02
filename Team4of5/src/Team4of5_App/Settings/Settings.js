import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/Nav.js';
import registerServiceWorker from '../../registerServiceWorker.js';
import * as Users from '../../Team4of5_Service/Users.js';
import Menu from '../Menu.js';
import './Settings.css';
import * as firebase from 'firebase';
import * as Config from '../../Team4of5_Service/Config.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'


class Settings extends React.Component {
    constructor(props) {
        super(props);

     this.state = {
      role: '',
      displayname: '',
      redirectToMenu: false,
      userInfo:[],
      formBtnTxt: 'Update Settings',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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


  handleChange(name, event) {
    let items = this.state;
    items[name] = event.target.value;
    this.setState(items);
  }

   handlePasswordChange(event){
    if (this.state.email != ''){
      Users.resetPwdWhenLoggedOn()
    }
  }

  handleSubmit(event) {
     if (this.state.displayname || this.state.role) {

    Users.updateSettings(this.state.displayname, this.state.role)
         .then((User) => {
    //         //handle redirect
             this.setState({redirectToMenu: false});
     })
     };

     this.state.displayname = '';
     this.state.role = '';

    event.preventDefault();

  }

    render() {

    const { from } = this.props.location.state ||{ from: { pathname: '/menu' }}
    const { redirectToMenu } = this.state

    if (redirectToMenu) {
          return (
           <Redirect to={from}/>
          )
        }

    return (
      <form className="submitform" onSubmit={this.handleSubmit}>
        <div className="title">
            <h1>Settings</h1>
            <p>Please enter any user information that you want to reset</p>
        </div>

        <div>
          <label>
            <div className="emailLabel">
              Reset Display Name
              <small><br/>Your current display name is {this.state.userInfo[1]}</small>
                    </div>
            <input type="text" value={this.state.displayname} onChange={this.handleChange.bind(this, 'displayname')} />
          </label>
        </div>

        <div>
          <label>
            <div className="emailLabel">
              Reset Role
                <small><br/>Your current role is {this.state.userInfo[0]}</small>
                    </div>
                <select value={this.state.role} onChange={this.handleChange.bind(this, 'role')}>
                <option value=""></option>
                <option value="Customer">Customer</option>
                <option value="Administrator">Administrator</option>
                <option value="Project Contributor">Project Contributor</option>
              </select>
              </label>
        </div>
        <div>
          <label>
            <div>
                  <a
                    onClick={this.handlePasswordChange} href="javascript:void(0);">Reset Password</a>
                    <p><small>This will send a reset password email to your associated email</small></p>
            </div>
          </label>
        </div>

        <input type="submit" id="submitBtn" value={this.state.formBtnTxt}/>

      </form>
        );
    }
}

export default Settings
