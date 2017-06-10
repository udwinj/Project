import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../../registerServiceWorker.js';
import * as Users from '../../Team4of5_Service/Users.js';
import Menu from '../Menu.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'


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
  }


  handleChange(name, event) {
    let items = this.state;
    items[name] = event.target.value;
    this.setState(items);
  }

   handlePasswordChange(event){
    if (this.state.email != null){
      Users.resetPwd(this.state.email)
    }
    else {
    console.log("Please enter your email")
    }
  }

  handleSubmit(event) {
    if (document.getElementById("submitBtn").value == "Login") {

      Users.sign_in_user(this.state.email, this.state.password)
      .then((User) => {
        console.log(User);
        alert("Login Succeed!!");
          console.log('User Confirm!!');
          //handle redire
          this.setState({redirectToMenu: true});

      }).catch((error) => {
        console.log(error);
        alert(error.message);
      });
    } else {
      Users.create_user(this.state.email, this.state.password)
        .then((User) => {
          console.log(User);
          alert('Sign Up Succeed!!');
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
      <form onSubmit={this.handleSubmit}>
        <div className="title">
            <h2>Login | Sinup</h2>
            <p>Please enter your login informations.</p>
        </div>
        <button type="button"
          id="switchBtn"
          onClick={this.switchLoginSignup}>Login | SignUp</button>

        <div>
          <label>
            <div>
              Email:
                    </div>
            <input type="text" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
          </label>
        </div>
        <div>
          <label>
            <div>
              Password(at least 6 digits):
                    </div>
            <input type="password" value={this.state.first_name} onChange={this.handleChange.bind(this, 'password')} />
          </label>
        </div>
        <div>
          <label>
            <div>
                <a id="forgotpassword" href="#" onclick="handlePasswordChange(this);">Forgot Password?</a>
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
export default UserLoginSignup
