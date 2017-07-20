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
import { Button } from 'react-bootstrap';

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
        // var input = this.refs.message;
        e.preventDefault();
        // if (!input.value) { return false; }
        console.log(this.state.value);



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
            <div>
                <div>
                    <h1>Add Contact</h1>
                    <p>Search Email</p>
                </div>
                <div id="ChatInput">
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
                    <Button bsStyle="default"
                        style={{
                            marginBottom: 20,
                            marginTop: 20
                        }}
                        onClick={this.onMessageSubmit}>Confirm</Button>
                </div>

            </div>

        )
    }
}





// class Add extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             messages: ''
//         }
//         //dispatch(this.props.actions.switchContent())
//     }

//     // componentDidMount() {
//     //   this.props.IncomeList("Yoo")
//     // }

//     _onMessageSubmit(e) {
//         var input = this.refs.message;
//         e.preventDefault();
//         if (!input.value) { return false; }
//         console.log(input.value);



//         alert("User: " + input.value + " (Searching...)");
//         let value = input.value

//         return fetch('https://team4of5-8d52e.firebaseio.com/users.json?&orderBy=%22email%22&startAt=%22'
//                 +value+'%22&endAt=%22'+value+'\uf8ff%22')

//             .then((response) => response.json())
//             .then((json) => {
//                 console.log(json)

//                 for(let key in json){
//                     console.log(json[key])
//                     console.log(json[key].display_name)
//                 }
//                 //return { options: json.items };
//             });

//         //this._pushMessage(this.state.curr_user, input.value)
//         // ChatService.findUser(input.value)
//         //     .then((data) => {
//         //         // alert(input.value + " Succeed!!");
//         //         //alert(data.email + " with the name " + data.display_name)

//         //         //return snapshot.val().email;
//         //         return ChatService.addContact(data, "Individual")

//         //     }).then(function () {
//         //         alert("Successfully added!!!")
//         //     }).catch(function (err) {
//         //         //console.log("error occur!!" + err)
//         //         alert(err)
//         //     });
//         // input.value = '';
//     }

//     render() {
//         return (
//             <div>
//                 <div>
//                     <h1>Add Contact</h1>
//                     <p>Search Email</p>
//                 </div>
//                 <div id="ChatInput">
//                     <form onSubmit={this._onMessageSubmit.bind(this)}>
//                         <input type="chatInput" ref="message" placeholder="Search..." className="message-input" />
//                     </form>
//                 </div>
//             </div>

//         )
//     }
// }


export default Add;