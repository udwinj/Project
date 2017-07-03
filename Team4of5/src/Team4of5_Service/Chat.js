
import * as firebase from 'firebase';
import * as Config from './Config.js';
import * as Tools from '../Team4of5_App/Tools.js';

let ref = firebase.app().database().ref();
let usersRef = ref.child('users');
let contactRef = ref.child('chatContact');
let chatroomRef = ref.child('chatRoom');


export const checkSenderIsCurrentUser = function(senderUid){
    return (senderUid==firebase.auth().currentUser.uid)
}

export const listenChatRoomChange = function (chatRoomUid) {

    return chatroomRef.child(chatRoomUid).child('messages').orderByKey().limitToLast(1)

}


export const pushMsg = function (msg, chatRoomUid) {
    return new Promise(function (resolve, reject) {
        console.log(chatRoomUid)
        try {
            let timestamp = Date.now();
            chatroomRef.child(chatRoomUid).child('messages').update({
                [timestamp]: {
                    senderUid: firebase.auth().currentUser.uid,
                    content: msg,
                    senderName: firebase.auth().currentUser.displayName
                }
            });
            return resolve();
        } catch (err) {
            return reject(err);
        }


    });
}


//Pass the members other than the current user
export const getChatroomMsg = function (memberList, chatRoomUid) {
    return new Promise(function (resolve, reject) {
        try {

            let thisContactRef = chatroomRef.child(chatRoomUid);

            thisContactRef.once('value').then(function (data) {
                //create chat room
                if (data.val() == null) {

                    let membersUpdate = {}
                    let currentUserUid = firebase.auth().currentUser.uid;



                    membersUpdate['/members/' + currentUserUid] = {
                        name: firebase.auth().currentUser.displayName,
                        status: 'online'
                    }

                    for (let index in memberList) {
                        membersUpdate['/members/' + memberList[index].uid] = {
                            name: memberList[index].name,
                            status: memberList[index].status
                        }
                    }
                    thisContactRef.update(membersUpdate);
                    return resolve('');
                } else {
                    return thisContactRef.child('messages').orderByKey().once('value')
                }
            }).then(function (data) {
                let value;
                data == undefined ? value = '' : value = data.val()
                return resolve(value);
            })

                , (err) => {
                    return reject(err);
                }

        } catch (err) {
            return reject(err);
        }
    });
}

export const updateChatMsg = function () {

}

export const addContact = function (contactUid, type) {
    return new Promise(function (resolve, reject) {
        let user = firebase.auth().currentUser;

        contactRef.child(user.uid).child(contactUid).once('value').then(function (data) {
            console.log(data.val());
            if (data.val() == null) {
                return usersRef.child(contactUid).once('value')
            } else {
                return reject("User already exists")
            }
        }).then((snapshot) => {
            try {
                //Assign chatRoom Uid first
                let chatRoomUid = Tools.guid();
                const updateContact = (selfUid, contactUid, type, name) => {
                    console.log(selfUid, contactUid, type, name)
                    let thisContactRef = contactRef.child(selfUid);
                    thisContactRef.update({
                        [contactUid]: {
                            type: type,
                            name: name,
                            chatroomUid: chatRoomUid,
                        }

                    });
                }

                console.log(snapshot.val())
                console.log(user)
                updateContact(user.uid, contactUid, type, snapshot.val().display_name);
                updateContact(contactUid, user.uid, type, user.displayName);
                return resolve();
            } catch (err) {
                return reject(err)
            }

        }, (err) => {
            // The Promise was rejected.
            return reject(err)
        }).catch(function (err) {
            return reject(err)
        })


    });
}

export const getUserContacts = function () {
    console.log(firebase.auth().currentUser)
    return new Promise(function (resolve, reject) {
        console.log(firebase.auth().currentUser.uid)
        contactRef.child(firebase.auth().currentUser.uid).once('value').then(function (data) {
            console.log(data.val());
            return resolve(data.val())
        }, (err) => {
            return reject(err)
        })
    });
}





export const findUser = function (user_email) {
    ;
    return new Promise(function (resolve, reject) {
        usersRef.on("child_added", function (snapshot) {

            if (snapshot.val().email == user_email) {
                //console.log(snapshot.key);
                return resolve(snapshot.key);
            }

        });

        setTimeout(function () {
            return reject("User not found!! Promise timed out after 500 ms");
        }, 500);
    });
}

