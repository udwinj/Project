

import * as firebase from 'firebase';
import * as Config from '/Users/yd/React/Project/Project/Team4of5/src/Team4of5_Service/Config.js';


firebase.initializeApp(Config.firebase_config);



export const create_user = function (user_email, user_pass) {
    return firebase.auth().createUserWithEmailAndPassword(user_email, user_pass);
}

export const sign_in_user = function (user_email, user_pass) {
    return firebase.auth().signInWithEmailAndPassword(user_email, user_pass);
}

// this reset password applies to when the user is signed in, not when the user is logged out 
export const resetPwd = function(user_email){
    return firebase.auth().sendPasswordResetEmail(user_email);
}

export const updateUserDisplayName = function(user_display_name, user_uid){
        var thisUserRef = firebase.child(user_uid);
              thisUserRef.update({
              display_name: user_display_name,  
              last_login_dtm: Date.now(),
        })
}


    // .then(function (user) {
    //     // user signed in
    //     return null;
    // }).catch(function (error) {
    //     console.log(error);
    //     //var errorCode = error.code;
    //     //var errorMessage = error.message;
    //     console.log(error.message);
    //     return error.message;
    // });

    // firebase.auth().onAuthStateChanged(function (user) {
    //     if (user) {
    //         console.log("user " + user.uid + " logged in");
    //         let user_uid = user.uid;
    //         let thisUserRef = firebase.app().database().ref().child('users').child(user_uid);

    //         thisUserRef.update({
    //             display_name: user.displayName,
    //             last_login_dtm: Date.now(),
    //         });
    //         return;
    //     }
    // });
    // return;
