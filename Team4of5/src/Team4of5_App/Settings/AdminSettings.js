import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../../registerServiceWorker.js';

import Navbar from '../Navbar/Nav.js';
import Menu from '../Menu.js';
import * as Users from '../../Team4of5_Service/Users.js';
import * as firebase from 'firebase';
import * as Config from '../../Team4of5_Service/Config.js';

import {BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom';

// import fetch from 'isomorphic-fetch';
// //reference: https://github.com/JedWatson/react-select
// import Select from 'react-select';


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
            redirectToMenu: false,
            userInfo: [],
            formBtnTxt: 'Update User'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.gotData = this.gotData.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(name, event) {
        let items = this.state;
        items[name] = event.target.value;
        this.setState(items);
    }
    handleSubmit(event) {

        event.preventDefault();
        if (this.state.email) {

            Users.updateToAdmin(this.state.email,this.state.company)
             .then((Users)=>{
                     //handle redirect
                this.setState({redirectToMenu: true});


            })
        } else {
            alert("Please select a user ");
        }

        this.state.email = '';
    }


    render() {

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
                                    <FormControl componentClass="input" value={this.state.email} onChange={this.handleChange.bind(this, 'email')}/>

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
