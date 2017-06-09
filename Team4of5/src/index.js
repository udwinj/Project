/**
 * Kyle, this is the starting point of the the program
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import * as Users from './Team4of5_Service/Users.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';
import RouteMap from './Team4of5_App/RouteMap.js';
import UserLoginSignup from './Team4of5_App/UserLoginSignup/UserLoginSignup.js';
//
// class UserLoginSignup extends React.Component {
//
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       email: '',
//       password: '',
//       formBtnTxt: 'Login',
//       redirectToMenu: false
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.switchLoginSignup = this.switchLoginSignup.bind(this);
//   }
//
//
//   handleChange(name, event) {
//     let items = this.state;
//     items[name] = event.target.value;
//     this.setState(items);
//   }
//
//   handleSubmit(event) {
//     if (document.getElementById("submitBtn").value == "Login") {
//
//       Users.sign_in_user(this.state.email, this.state.password)
//       .then((User) => {
//         console.log(User);
//         alert("Login Succeed!!");
//           console.log('User Confirm!!');
//           this.setState({redirectToMenu: true});
//
//       }).catch((error) => {
//         console.log(error);
//         alert(error.message);
//       });
//     } else {
//       Users.create_user(this.state.email, this.state.password)
//         .then((User) => {
//           console.log(User);
//           alert('Sign Up Succeed!!');
//         })
//         .catch((error) => {
//           console.log(error);
//           alert(error.message);
//         });
//     }
//     event.preventDefault();
//
//   }
//
//   switchLoginSignup(event) {
//     let submitBtn = document.getElementById("submitBtn");
//     if (submitBtn.value == "Login"){
//       this.state.formBtnTxt = "SignUp";
//       submitBtn.value = "SignUp";
//     } else{
//       submitBtn.value = "Login";
//       this.state.formBtnTxt = "Login";
//     }
//   }
//
//   render() {
//     const { from } = { from: { pathname: '/Menu' } }
//     const { redirectToMenu } = this.state
//
//     if (redirectToMenu) {
//       console.log(from);
//       return (
//         <Redirect to="/Menu" push />
//         //<Redirect to={from}/>
//       )
//     }
//
//     return (
//       <form onSubmit={this.handleSubmit}>
//
//         <button type="button"
//           id="switchBtn"
//           onClick={this.switchLoginSignup}>Login | SignUp</button>
//
//         <div>
//           <label>
//             <div>
//               Email:
//                     </div>
//             <input type="text" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
//           </label>
//         </div>
//         <div>
//           <label>
//             <div>
//               Password(at least 6 digits):
//                     </div>
//             <input type="text" value={this.state.first_name} onChange={this.handleChange.bind(this, 'password')} />
//           </label>
//         </div>
//         <input type="submit"
//           id="submitBtn"
//           value={this.state.formBtnTxt} />
//       </form>
//     );
//   }
// }


ReactDOM.render(
  <RouteMap />,


  // <Router>
  //   <Switch>
  //     <Route exact path='/' component={UserLoginSignup}/>
  //     <Route path='/RouteMap' component={RouteMap}/>
  //   </Switch>
  // </Router>,
  document.getElementById('root')
);
