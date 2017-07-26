import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../../registerServiceWorker.js';

import Navbar from '../Navbar/Nav.js';
import Menu from '../Menu.js';
import * as Users from '../../Team4of5_Service/Users.js';
import * as firebase from 'firebase';
import * as Config from '../../Team4of5_Service/Config.js';

import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom';

import fetch from 'isomorphic-fetch';
//reference: https://github.com/JedWatson/react-select
import Select from 'react-select';


// style
import './Settings.css';
//import react-bootstrap
import {
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
    Button
} from 'react-bootstrap';



class AdminSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company:'',
            email:'',
            value: [],
            redirectToMenu: false,
            userInfo: [],
            formBtnTxt: 'Update User'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.gotData = this.gotData.bind(this);
        //this.handleChange = this.handleChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    componentDidMount() {
    var user = firebase.auth().currentUser;
    var uid;

        if (user != null) {
            uid = user.uid;

            var thisUser = firebase.database().ref().child('users/' + uid);
            thisUser.on('value', this.gotData, this.errData);
        }
    }

    gotData = (data) => {
        let newUser = []
        const userdata = data.val();
        //const keys = Object.keys(userdata);
        this.state.company = userdata.company;
    }

    // handleChange(name, event) {
    //     let items = this.state;
    //     items[name] = event.target.value;
    //     this.setState(items);
    // }
    handleEmailChange(value) {
        console.log("change happening")
        console.log(value)
        this.setState({
            value: value,
        });
    }
    handleSubmit(event) {

        event.preventDefault();
        if (this.state.value.email) {

            Users.updateToAdmin(this.state.value.email,this.state.company)
             .then((Users)=>{
                     //handle redirect
                this.setState({redirectToMenu: true});


            })
        } else {
            alert("Please select a user ");
        }

        this.state.value = [];
    }
    getUsers(input) {

        let self = this;

        if (!input) {
            console.log('here')
            return Promise.resolve({ options: [] });
        }

        let contactEmails = []
        return fetch('https://team4of5-8d52e.firebaseio.com/users.json?&orderBy=%22email%22&startAt=%22'
            + input + '%22&endAt=%22' + input + '\uf8ff%22')

            .then((response) => response.json())
            .then((json) => {
                for (let key in json) {
                    //console.log(self.state.curUserCompany) self.state.curUserCompany
                    if (json[key].company == 'A') {
                        contactEmails.push({ email: json[key].email, label: json[key].email })
                    }
                }
                self.setState({ options: contactEmails })
                return {
                    options: contactEmails,
                    complete: true
                };
            });
    }

    render() {
const AsyncComponent = Select.Async
        const {from} = this.props.location.state || {
            from: {
                pathname: '/menu'
            }
        }
        const {redirectToMenu} = this.state

        if (redirectToMenu) {
            return (<Redirect to={from}/>)
        }

        return (
            <div className='AlignerSeting'>
                <div className='setingPanel'>
                    <div className="panel panel-primary">
                        <div className="panel-heading clearfix">
                            <h1 className="panel-title pull-left">Admin Settings</h1>
                            <div className="pull-right">
                                <p>Please enter the user who want to make an admin</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={this.handleSubmit}>

                        <div className="panel panel-info" id="restRole">
                            <div className="panel-heading clearfix">
                                <h1 className="panel-title pull-left">
                                    Reset Role</h1>
                                <div className="pull-right">
                                </div>
                            </div>
                            <div className='panel-body'>
                                <FormGroup controlId="formControlsSelect">
                                    <ControlLabel>User Email</ControlLabel>
                                    {/* <FormControl componentClass="input" value={this.state.email} onChange={this.handleChange.bind(this, 'email')}/> */}
                                    <AsyncComponent
                                        multi={false}
                                        value={this.state.value}
                                        onChange={this.handleEmailChange}
                                        //onValueClick={this.gotoUser}
                                        //Options={this.state.options}
                                        valueKey="value"
                                        labelKey="label"
                                        loadOptions={this.getUsers}
                                        backspaceRemoves={true} />
                                </FormGroup>
                            </div>


                        </div>
                        <button type="submit" id="setingBtn" className="btn btn-primary"> Update to Admin </button>
                        <Link to='/menu' className='btn btn-danger'>Cancel</Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default AdminSettings
