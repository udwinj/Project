import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../../registerServiceWorker.js';


import Navbar from '../Navbar/Nav.js';
import Menu from '../Menu.js';
import * as Users from '../../Team4of5_Service/Users.js';
import * as firebase from 'firebase';
import * as Config from '../../Team4of5_Service/Config.js';

import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

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
            // company:'',
            email: '',
            value: [],
            curUserCompany: '',
            redirectToMenu: false,
            //userInfo: [],
            formBtnTxt: 'Update User'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.gotData = this.gotData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSendEmail = this.handleSendEmail.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }
    componentDidMount() {
        //
        let self = this;
        Users.getCurUserCompany().then(function (company) {
            self.setState({ curUserCompany: company.val() })
            console.log(self.state.curUserCompany)
        }).catch(function (err) {
            console.log("Error:" + err)
        })
    }

    handleChange(name, event) {
        let items = this.state;
        items[name] = event.target.value;
        this.setState(items);
    }


    handleEmailChange(value) {
        console.log("change happening")
        console.log(value)
        this.setState({
            value: value,
        });
    }
    handleSendEmail(event) {
        let self = this;
        event.preventDefault();
        // check if user already exists, if so and company is blank, set to this user's company
        Users.getAllUsersData().then(function (data) {

            self.gotData(data);
        }, function (err) {
            //Error occur
            console.log("Promise Error");
            console.log(err);
        })

    }


    gotData(data) {
        const userdata = data.val();
        const keys = Object.keys(userdata);
        var matched = false

        for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            if (userdata[k].email == this.state.email) {
                matched = true;
                if (userdata[k].company == '' || userdata[k].company == null) {
                    alert(userdata[k].email + " company has been set to " + this.state.curUserCompany)
                    Users.updateCompany(this.state.email, this.state.curUserCompany)
                }
                else {
                    alert("User already belongs to a company")

                }
            }
        }
        if (matched == false) {
            var generator = require('generate-password');

            var password = generator.generate({
                length: 10,
                numbers: true
            });
            Users.create_user(this.state.email, password).then((Users) => {
                Users.resetPwd(this.state.email)
            })
            alert("User has been created")


        }
    }
    handleSubmit(event) {

        event.preventDefault();
        if (this.state.value.email) {

            Users.updateToAdmin(this.state.value.email, this.state.company)
                .then((Users) => {
                    //handle redirect
                    this.setState({ redirectToMenu: true });


                })
        } else {
            alert("Please select a user ");
        }

        this.state.value = [];
    }
    getUsers(input) {

        let self = this;

        if (!input) {
            console.log('here');
            return Promise.resolve({ options: [] });
        }

        let contactEmails = []
        return fetch('https://team4of5-8d52e.firebaseio.com/users.json?&orderBy=%22email%22&startAt=%22'
            + input + '%22&endAt=%22' + input + '\uf8ff%22')

            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                for (let key in json) {
                    //console.log(self.state.curUserCompany) self.state.curUserCompany
                    if (json[key].company == self.state.curUserCompany) {
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
        //const { from } = this.props.location.state || {
        //    from: {
        //        pathname: '/menu'
         //   }
        //}
        const { redirectToMenu } = this.state

        //if (redirectToMenu) {
       //     return (<Redirect to={from} />)
        //}

        return (
            <div className='AlignerSeting'>
                <div className='adminSetingPanel'>
                    <div className="panel panel-primary">
                        <div className="panel-heading clearfix">
                            <h1 className="panel-title pull-left">Admin Settings</h1>
                            <div className="pull-right">
                            </div>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={this.handleSendEmail}>
                            <div className="panel panel-info" id="restRole">
                                <div className="panel-heading clearfix">
                                    <h1 className="panel-title pull-left">
                                        Invite User</h1>

                                    <div className="pull-right">
                                        <p>Please enter the email address of the user you want to invite</p>
                                    </div>
                                </div>
                            </div>
                            <div className='panel-body'>
                                <FormGroup controlId="formControlsText">
                                    <ControlLabel>Invitee Email</ControlLabel>
                                    <FormControl type="text" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
                                </FormGroup>
                                {/* <FormControl componentClass="text" value={this.state.email} onChange={this.handleChange.bind(this, 'email')}/> */}

                            </div>
                            <button type="submit" id="setingBtn" className="btn btn-primary"> Invite User </button>
                            <Link to='/menu' className='btn btn-danger'>Cancel</Link>
                        </form>
                        <p></p>
                        <form onSubmit={this.handleSubmit}>

                            <div className="panel panel-info" id="restRole">
                                <div className="panel-heading clearfix">
                                    <h1 className="panel-title pull-left">
                                        Reset Role</h1>

                                    <div className="pull-right">
                                        <p>Please enter the user who want to make an admin</p>
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
                                            ignoreCase={false}
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
            </div>


        );
    }
}

export default AdminSettings
