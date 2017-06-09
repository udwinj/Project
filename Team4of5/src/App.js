import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker.js';
import * as Users from './Team4of5_Service/Users.js';

import logo from './logo.svg';
import './App.css';
import Menu from './Team4of5_App/Menu.js';
import Public from './Team4of5_App/Public/Public.js'
import UserLoginSignup from './Team4of5_App/UserLoginSignup/UserLoginSignup.js'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'


const AuthExample = () => (
  <Router>
    <div>

      <ul>
        <li><Link to="/public">Public Page</Link></li>
        <li><Link to="/login">Login Page</Link></li>

      </ul>
      <Route path="/public" component={Public}/>
      <Route path="/login" component={UserLoginSignup}/>
      <Route path="/menu" component={Menu}/>
    </div>
  </Router>
)
//  <li><Link to="/menu">menu Page</Link></li>

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
//           //redirect to menu if login is true
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
//     const { from } = this.props.location || { from: { pathname: '/' } }
//     const { redirectToMenu } = this.state;
//
//     // if (redirectToMenu) {
//     //   console.log(from);
//     //   return (
//     //     <Redirect to="/Menu" push />
//     //     //<Redirect to={from}/>
//     //   )
//     // }
//   //   if (redirectToMenu) {
//   //   return (
//   //     <Redirect to={from}/>
//   //   )
//   // }
//
//
//     return (
//       <div>
//     <Router>
//      <div>
//        <Route exact path="/" render={() =>(
//          redirectToMenu ? ( <Route  component={Menu} />)
//          : (<Route component={UserLoginSignup} />)
//        )} />
//
//        </div>
//      </Router>
//       <form onSubmit={this.handleSubmit}>
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
// </div>
//     );
//   }
// }

export default AuthExample

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
//
// export default App;
