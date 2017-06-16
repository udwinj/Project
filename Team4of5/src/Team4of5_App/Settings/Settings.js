import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/Nav.js';
import registerServiceWorker from '../../registerServiceWorker.js';
import * as Users from '../../Team4of5_Service/Users.js';
import Menu from '../Menu.js';
import './Settings.css';

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
      redirectToMenu: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
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
    if (this.state.displayname) {

    Users.updateUserDisplayName(this.state.displayname)
        .then((User) => {
    });
    }

    if (this.state.role) {
        Users.updateRole(this.state.role)
        .then((User) => {
    });
    };  

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
                    </div>
            <input type="text" value={this.state.displayname} onChange={this.handleChange.bind(this, 'displayname')} />
          </label>
        </div>
        
        <div>
          <label>
            <div className="emailLabel">
              Reset Role
                    </div>
            <input type="text" value={this.state.role} onChange={this.handleChange.bind(this, 'role')} />
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
        <input type="submit"
          id="submitBtn"
          value={this.state.formBtnTxt} />
      </form>
        );
    }
}

export default Settings
