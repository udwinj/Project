import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import * as actions from '../App_Redux/ActionCreator'
import { bindActionCreators } from 'redux';
import * as Users from '../../Team4of5_Service/Users.js';
import * as ChatService from '../../Team4of5_Service/Chat.js';
//import react-bootstrap
import {
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
            messages: ''
        }
        //dispatch(this.props.actions.switchContent())
    }

    // componentDidMount() {
    //   this.props.IncomeList("Yoo")
    // }

    _onMessageSubmit(e) {
        var input = this.refs.message;
        e.preventDefault();
        if (!input.value) { return false; }
        console.log(input.value);



        alert("User: " + input.value + " (Searching...)");
        //this._pushMessage(this.state.curr_user, input.value)
        ChatService.findUser(input.value)
            .then((data) => {
                // alert(input.value + " Succeed!!");
                //alert(data.email + " with the name " + data.display_name)

                //return snapshot.val().email;
                return ChatService.addContact(data, "Individual")

            }).then(function () {
                alert("Successfully added!!!")
            }).catch(function (err) {
                //console.log("error occur!!" + err)
                alert(err)
            });
        input.value = '';
    }

    render() {
        return (
            <div className="panel panel-info">
                <div className="panel-heading clearfix">
                    <h1 className="panel-title">Add Contact</h1>
                </div>
                <div className="panel-body">

                    <Form onSubmit={this._onMessageSubmit.bind(this)}>
                        <FormGroup>
                            <ControlLabel>Search Email</ControlLabel>
                        <FormControl type="text" ref="message" placeholder="Search..." className="message-input" />
                        </FormGroup>
                    </Form>

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
