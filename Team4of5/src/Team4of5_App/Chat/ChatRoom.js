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
        console.log(2)
        super(props)
        this.state = {
            hasInit: false,
            messages: [
                //(new Message({ id: 1, message: "Hey guys!!!!!!" })),
                //(new Message({ id: 2, message: "Hey! Johny here." }))
            ],
            curr_user: 0
        }
        console.log("Initialize: " + UserService.getCurrentUser().uid)
        this.initialize = this.initialize.bind(this);
    }

    componentDidMount() {
        if (this.state.hasInit == false) {
            this.initialize();
        }
    }

    componentWillMount() {
        console.log(4)
    }
    initialize() {
        if (this.state.hasInit == false) {
            this.state.hasInit = true
        }
        let self = this;
        let contactData = { uid: this.props.extraData.ContactUid, data: this.props.extraData.ContactData };
        console.log(this.props.extraData);
        console.log(contactData);
        // if (contactData.type == 'Project') {



        // } else {
        let isInit = true;
        ChatService.getChatroomMsg(contactData, this.props.extraData.ContactData.chatroomUid).
            then(function (messages) {
                console.log(messages)

                for (let index in messages) {
                    self.addMsgToRoom(messages[index]);
                }
            }).then(() => {
                ChatService.listenChatRoomChange(this.props.extraData.ContactData.chatroomUid).on('child_added', function (data) {
                    console.log('Listen msg changing:');
                    console.log(data.val());
                    // console.log(data.val().senderUid);
                    // console.log(data.key);

                    if (self.state.messages.length == 0 &&
                        UserService.getCurrentUser().uid != data.val().senderUid) {
                        self.addMsgToRoom(data.val())
                        ChatService.updateHistory(self.props.extraData.ContactData.chatroomUid, data.val().content)
                    } else if (isInit == false && UserService.getCurrentUser().uid != data.val().senderUid) {
                        self.addMsgToRoom(data.val())
                        ChatService.updateHistory(self.props.extraData.ContactData.chatroomUid, data.val().content)
                    }
                    if (isInit) {
                        isInit = false;
                    }

                    //console.log(data.val());
                    //return resolve(data.val());
                })
            }).catch(function (err) {
                alert("Error occur" + err)
            })
    }

    addMsgToRoom(msgData) {
        let prevState = this.state
        let recipient;
        let msg = msgData.content
        if (ChatService.checkSenderIsCurrentUser(msgData.senderUid) == false &&
            this.props.extraData.ContactData.type == "Project") {
            msg = msgData.senderName + ":" + msgData.content
            recipient = msgData.senderUid
        } else if (ChatService.checkSenderIsCurrentUser(msgData.senderUid) == false) {
            recipient = msgData.senderUid;
        } else {
            recipient = 0;
        }
        // else {
        //     recipient = "uuidtest"
        //     //TODO, if it is project, need to add name
        //     //msg = msgData.senderName+":"+ msgData.content
        // }
        console.log(msgData.senderUid)
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
            ChatService.updateHistory(self.props.extraData.ContactData.chatroomUid, input.value)
            input.value = '';

        }).catch(function (err) {
            alert("Error:" + err)
        })

    }

    render() {
        //this.componentDidMount()
        console.log('1!!!!!!!!!!!!')
        console.log(this.props.extraData.fromLeftHistory)
        console.log(this.props.extraData.fromLeftHistory == undefined)
        if (this.props.extraData.fromLeftHistory != undefined &&
            this.props.extraData.fromLeftHistory == true) {
            this.props.extraData.fromLeftHistory = false
            // this.setState({
            //     messages: []
            // })
            this.state.messages = []
            this.initialize();
            console.log('INNN')
        }
        return (
            console.log('return render !!!!!'),
            < div >
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
            </div >

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