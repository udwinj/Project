import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux'
import * as actions from '../App_Redux/ActionCreator'
import { bindActionCreators } from 'redux';
import * as Users from '../../Team4of5_Service/Users.js';
import * as Chat from '../../Team4of5_Service/Chat.js';

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
        


        alert("User: "+ input.value+ " (Searching...)");
        //this._pushMessage(this.state.curr_user, input.value)
        Chat.findUser(input.value)
        .then((Data) =>  {       
            alert(input.value + " Succeed!!");
        });
        input.value = '';
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Add Contact</h1>
                    <p>Search Email</p>
                </div>
                <div id="ChatInput">
                    <form onSubmit={this._onMessageSubmit.bind(this)}>
                        <input type="chatInput" ref="message" placeholder="Search..." className="message-input" />
                </form>
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