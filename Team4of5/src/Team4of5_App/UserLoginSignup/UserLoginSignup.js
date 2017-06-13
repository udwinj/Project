import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../../registerServiceWorker.js';
import * as Users from '../../Team4of5_Service/Users.js';
import Menu from '../Menu.js';
import './style.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class UserLoginSignup extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      formBtnTxt: 'Login',
      redirectToMenu: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchLoginSignup = this.switchLoginSignup.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }


  handleChange(name, event) {
    let items = this.state;
    items[name] = event.target.value;
    this.setState(items);
  }

   handlePasswordChange(event){
    if (this.state.email != ''){
      Users.resetPwd(this.state.email)
    }
    else {
      alert("Please enter your email")
    }
  }

  handleSubmit(event) {
    if (document.getElementById("submitBtn").value == "Login") {

      Users.sign_in_user(this.state.email, this.state.password)
      .then((User) => {
        console.log(User);
        alert("Login Succeed!!");
          console.log('User Confirm!!');
          //handle redirect
          this.setState({redirectToMenu: true});
      }).then((User) => {
        Users.saveUserinfo();
      }).catch((error) => {
        console.log(error);
        alert(error.message);
      });
    } else {
      Users.create_user(this.state.email, this.state.password)
        .then((User) => {
          console.log(User);
          alert('Sign Up Succeed!!');
        }).then((User) => {
        Users.saveUserinfo();
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    }
    event.preventDefault();

  }

  switchLoginSignup(event) {
    let submitBtn = document.getElementById("submitBtn");
    if (submitBtn.value == "Login"){
      this.state.formBtnTxt = "SignUp";
      submitBtn.value = "SignUp";
    } else{
      submitBtn.value = "Login";
      this.state.formBtnTxt = "Login";
    }
  }

  render() {
    const { from } = this.props.location.state ||{ from: { pathname: '/menu' }}
    const { redirectToMenu } = this.state

    // // if (redirectToMenu) {
    // //   console.log(from);
    // //   return (
    // //     <Redirect to="/Menu" push />
    // //     //<Redirect to={from}/>
    // //   )
    // // }
    if (redirectToMenu) {
          return (
           <Redirect to={from}/>
          )
        }

    return (
      <div className="container">
      <form onSubmit={this.handleSubmit} className="loginForm">

        <div className="title">
            <h1>Login | Signup</h1>
            <p>Please enter your login informations.</p>
        </div>
        <button type="button"
          id="switchBtn" className="btn btn-primary lg"
          onClick={this.switchLoginSignup}>Login | SignUp</button>

        <div>
          <label>
            <div id="email">
              Email:
            </div>
            <input type="text" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
          </label>
        </div>
        <div>
          <label>
            <div id="password">
              Password(at least 6 digits):
                    </div>
            <input type="password" value={this.state.first_name} onChange={this.handleChange.bind(this, 'password')} />
          </label>
        </div>
        <div>
          <label>
            <div>
                  <a
                    onClick={this.handlePasswordChange} href="javascript:void(0);">Forgot Password?</a>
            </div>
          </label>
        </div>
        <input type="submit"
          id="submitBtn"
          value={this.state.formBtnTxt} />

      </form>

</div>


    );
  }
}
export default UserLoginSignup
