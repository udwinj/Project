import React from 'react';
import ReactDOM from 'react-dom';
import './ChatRoom.css'
import { ChatFeed, Message } from 'react-chat-ui'
import { connect } from 'react-redux'
//Reference: https://github.com/brandonmowat/react-chat-ui/

class ChatRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            
            messages: [
                (new Message({ id: 1, message: "Hey guys!!!!!!" })),
                (new Message({id: 2, message: "Hey! Johny here."}))
            ],
            curr_user: 0
        }
    }

    _onPress(user) {
        console.log("onPress: ",{user});
        this.setState({ curr_user: user });
    }

    _pushMessage(recipient, message) {
        var prevState = this.state
        prevState.messages.push(new Message({ id: recipient, message: message }));
        this.setState(this.state)
    }

    _onMessageSubmit(e) {
        var input = this.refs.message;
        e.preventDefault();
        if (!input.value) { return false; }
        this._pushMessage(this.state.curr_user, input.value)
        input.value = '';
    }

    render() {
        console.log(this.props.extraData)
        return (
            
            <div>
                <div>
                    <h3>{this.props.extraData.Title}</h3>
                </div>
                <div id="ChatMian">
                    <ChatFeed
                        messages={this.state.messages} // Boolean: list of message objects
                        isTyping={this.state.is_typing} // Boolean: is the recipient typing
                        hasInputField={false} // Boolean: use our input, or use your own
                        bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
                        // JSON: Custom bubble styles
                        bubbleStyles={
                            {
                                text: {
                                    fontSize: 20
                                },
                                chatbubble: {
                                    borderRadius: 30,
                                    padding: 10
                                }
                            }
                        }
                    />
                </div>
                <div id="ChatInput">
                    <form onSubmit={this._onMessageSubmit.bind(this)}>
                        <input type="chatInput" ref="message" placeholder="Type a message..." className="message-input" />
                    </form>
                </div>
            </div>

        )
    }

}

export default ChatRoom;
// const mapStateToProps = (state) => {
//     console.log("mapStateToProps", state.default[0])
//     return {
//         switchName: state.default[0]
//     }
// };

//export default connect(mapStateToProps, null)(ChatRoom);