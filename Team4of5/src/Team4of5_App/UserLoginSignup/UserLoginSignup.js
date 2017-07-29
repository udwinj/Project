import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../../registerServiceWorker.js';
import * as Users from '../../Team4of5_Service/Users.js';
import Menu from '../Menu.js';
import * as ChatService from '../../Team4of5_Service/Chat.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
// style
import './UserLoginSignup.css';
//import react-bootstrap
import {
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
    Button,
    Col,
    InputGroup,
    Glyphicon
} from 'react-bootstrap';

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
          ChatService.listenCurUserOnOffline();
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

    if (redirectToMenu) {
          return (
           <Redirect to={from}/>
          )
        }

    return (
    <div className="AlignerLogin">
            <div className='setingPanel'>
                <div className="panel panel-info">
                    <div className="panel-heading clearfix">
                        <h1 className="panel-title text-center"><strong>Please enter Login or Signup information</strong></h1>
                    </div>
    <div className='panel-body text-center'>
      <Form horizontal onSubmit={this.handleSubmit} >
        <button type="button"
          id="switchBtn"
          onClick={this.switchLoginSignup}>Login &nbsp;&nbsp;|&nbsp;&nbsp; Signup</button>

            <FormGroup controlId="formHorizontalEmail">
     <Col componentClass={ControlLabel} sm={2}>
       Email
     </Col>
     <Col sm={10}>
         <InputGroup>
         <InputGroup.Addon>
         <Glyphicon glyph="user" />
         </InputGroup.Addon>
       <FormControl type="text" placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this, 'email')}/>
</InputGroup>
     </Col>
   </FormGroup>

   <FormGroup controlId="formHorizontalPassword">
     <Col componentClass={ControlLabel} sm={2}>
       Password
       <small> at least 6 digits</small>
     </Col>
     <Col sm={10}>
         <InputGroup>
         <InputGroup.Addon>
         <Glyphicon glyph="lock" />
         </InputGroup.Addon>
       <FormControl type="password" placeholder="Password" value={this.state.first_name} onChange={this.handleChange.bind(this, 'password')}/>
</InputGroup>
     </Col>
   </FormGroup>
   <FormGroup>

             <a onClick={this.handlePasswordChange} href="javascript:void(0);">Forgot Password?</a>

      </FormGroup>
      <FormGroup>

                <input type="submit"
                 id = "submitBtn"
                  value={this.state.formBtnTxt}/>

          </FormGroup>

      </Form>
      </div>
          </div>
      </div>
    </div>
    );
  }
}
export default UserLoginSignup
