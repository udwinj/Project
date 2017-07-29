import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import * as actions from '../App_Redux/ActionCreator'
import { bindActionCreators } from 'redux';
import * as Users from '../../Team4of5_Service/Users.js';
import * as ChatService from '../../Team4of5_Service/Chat.js';

import fetch from 'isomorphic-fetch';
//reference: https://github.com/JedWatson/react-select
import Select from 'react-select';

//import react-bootstrap
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    ControlLabel
} from 'react-bootstrap';
//import './Add.css';


class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curUserCompany: '',
            //options:[],
            value: [],
            messages: ''
        }
        this.onChange = this.onChange.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.onMessageSubmit = this.onMessageSubmit.bind(this);
        //dispatch(this.props.actions.switchContent())
    }

    componentDidMount() {
        //
        let self = this;
        Users.getCurUserCompany().then(function (company) {
            self.setState({ curUserCompany: company.val() })
        }).catch(function (err) {
            console.log("Error:" + err)
        })
    }

    onMessageSubmit(e) {

        alert("User: " + this.state.value.value + " (Searching...)");
        //this._pushMessage(this.state.curr_user, input.value)
        ChatService.findUser(this.state.value.value)
            .then((data) => {
                return ChatService.addContact(data, "Individual")

            }).then(function () {
                alert("Successfully added!!!")
            }).catch(function (err) {
                //console.log("error occur!!" + err)
                alert(err)
            });
        this.onChange([])
    }
    onChange(value) {
        console.log(value)
        this.setState({
            value: value,
        });
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
                    console.log(json[key])
                    console.log(json[key].display_name)
                    if (json[key].company == self.state.curUserCompany) {
                        contactEmails.push({ value: json[key].email, label: json[key].email })
                    }
                }
                console.log(contactEmails);
                self.setState({ options: contactEmails })
                return {
                    options: contactEmails,
                    complete: true
                };
            });
    }

    render() {
        const AsyncComponent = Select.Async
        return (
            <div className="panel panel-info">
                <div className="panel-heading clearfix">
                    <h1 className="panel-title">Add Contact</h1>
                </div>
                <div className="panel-body">
                    <AsyncComponent
                        multi={false}
                        value={this.state.value}
                        onChange={this.onChange}
                        //onValueClick={this.gotoUser}
                        //Options={this.state.options}
                        valueKey="value"
                        labelKey="label"
                        loadOptions={this.getUsers}
                        backspaceRemoves={true} />
                    <Button bsStyle="primary"
                        style={{
                            marginBottom: 20,
                            marginTop: 20
                        }}
                        onClick={this.onMessageSubmit}>Confirm</Button>
                    {/*<Form onSubmit={this._onMessageSubmit.bind(this)}>
                        <FormGroup>
                            <ControlLabel>Search Email</ControlLabel>
                            <FormControl type="text" ref="message" placeholder="Search..." className="message-input" />
                        </FormGroup>
                    </Form>*/}

                </div>
            </div>
        )
    }
}


export default Add;


// onClick={(message) => this.props.addMessage(message)}
// actions = { addMessage }
// const mapDispatchToProps = (dispatch) => {
//   return {SwitchAction:bindActionCreators(actions.switchContent, dispatch)};
// };
// const mapStateToProps = (state) => {
//     console.log("mapStateToProps", state.default[state.default.length-1])
//     return {
//         switchName: state.default[state.default.length-1]
//     }
// };

// export default connect(mapStateToProps, null)(Add);

// const addContact = (contact) => ({
//     type: ADD_CONTACT,
//     payload: contact
// });

// const contactsReducer = (state = [], action) => {
//     switch(action.type) {
//         case ADD_CONTACT:
//             return [...state, action.payload];
//         default:
//             return state;
//     }
// }

// export default Add;
