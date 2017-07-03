import React from 'react';
import ReactDOM from 'react-dom';
import './ChatRoom.css'
import { ChatFeed, Message } from 'react-chat-ui'
import { connect } from 'react-redux'
import * as ChatService from '../../Team4of5_Service/Chat.js';
import * as UserService from '../../Team4of5_Service/Users.js';

//Reference: https://github.com/brandonmowat/react-chat-ui/

class ChatRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

            messages: [
                //(new Message({ id: 1, message: "Hey guys!!!!!!" })),
                //(new Message({ id: 2, message: "Hey! Johny here." }))
            ],
            curr_user: 0
        }
    }

    componentDidMount() {

        let contactData = this.props.extraData.ContactData;
        let self = this;
        let memberList = [];
        memberList.push({ uid: this.props.extraData.ContactUid, name: contactData.name, status: 'online' });
        ChatService.getChatroomMsg(memberList, contactData.chatroomUid).then(function (messages) {
            console.log(messages)

            for (let index in messages) {
                self.addMsgToRoom(messages[index]);

            }
        }).catch(function (err) {
            alert("Error occur" + err)
        })
        let isInit = true;
        ChatService.listenChatRoomChange(this.props.extraData.ContactData.chatroomUid).on('child_added', function (data) {
            console.log('Listen msg changing:');
            // console.log(data.val().senderUid);
            // console.log(data.key);
            if (isInit) {
                isInit = false;
            } else if (UserService.getCurrentUser().uid != data.val().senderUid) {
                self.addMsgToRoom(data.val())
            }

            //console.log(data.val());
            //return resolve(data.val());
        })
    }
    addMsgToRoom(msgData) {
        let prevState = this.state
        let recipient;
        let msg = msgData.content
        if (ChatService.checkSenderIsCurrentUser(msgData.senderUid)) {
            recipient = 0
        } else {
            recipient = 1
            //TODO, if it is project, need to add name
            //msg = msgData.senderName+":"+ msgData.content
        }
        prevState.messages.push(new Message({ id: recipient, message: msg }));
        this.setState(this.state)
    }

    _onPress(user) {
        console.log("onPress: ", { user });
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
        let self = this;
        ChatService.pushMsg(input.value, this.props.extraData.ContactData.chatroomUid).then(function () {
            self._pushMessage(self.state.curr_user, input.value)
            input.value = '';
        }).catch(function (err) {
            alert("Error:" + err)
        })

    }

    render() {
        return (

            <div>
                <div>
                    <h3>{this.props.extraData.ContactData.name}</h3>
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