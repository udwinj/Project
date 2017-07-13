

import * as firebase from 'firebase';
import * as Config from './Config.js';


firebase.initializeApp(Config.firebase_config);
var ref = firebase.app().database().ref();
var usersRef = ref.child('users');
var issueRef = ref.child('issues');

const issueStatus = ['New', 'Open', 'Assiged', 'Fixed', 'Verified', 'Closed'];


export const create_user = function (user_email, user_pass) {
    return firebase.auth().createUserWithEmailAndPassword(user_email, user_pass);
}

export const sign_in_user = function (user_email, user_pass) {
    return firebase.auth().signInWithEmailAndPassword(user_email, user_pass);
}

export const saveUserinfo = function () {
    return firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // alert("user " + user.uid + " logged in");
            var user_uid = user.uid;
            var user_email = user.email;


            var thisUserRef = usersRef.child(user_uid);
            thisUserRef.update({
                last_login_dtm: Date.now(),
                email: user_email
            });
            thisUserRef.on("value", function (snapshot) {
                var displayname = snapshot.val().display_name;
                var role = snapshot.val().role;
                if (role == null || displayname == null) {
                    alert("Please go to the settings page to complete your profile")
                }
            });
        }
    });
}


// this is reset password if email in manually given
export const resetPwd = function (user_email) {
    return firebase.auth().sendPasswordResetEmail(user_email);
}

// this function resets the password if the user is logged in
export const resetPwdWhenLoggedOn = function () {
    return firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // alert("user " + user.email + " wants to reset their passwords");
            var user_email = user.email;
            var user_uid = user.uid;
            var thisUserRef = usersRef.child(user_uid);
            firebase.auth().sendPasswordResetEmail(user_email);
        } // end if
    }) // end function
}

// this allows a user to update their display name in the settings tab
export const updateSettings = function (user_display_name, user_role) {
    var user = firebase.auth().currentUser;
    var user_uid = user.uid;
    var thisUserRef = usersRef.child(user_uid);


    if (user_display_name && user_role) {
        return thisUserRef.update({
            display_name: user_display_name,
            role: user_role
        });
    }
    else if (user_display_name) {
        //Kyle: Update display_name to current user profile(firebase build-in) as well
        user.updateProfile({
            displayName: user_display_name
        }).then(function () {
            // Update successful.
        }, function (error) {
            // An error happened.
        });
        return thisUserRef.update({
            display_name: user_display_name
        });
    }
    else if (user_role) {
        return thisUserRef.update({
            role: user_role
        });
    }

}


// this allows a user to logout
// it shouldn't need any parameters if the user is logged in
export const logoutUser = function () {
    firebase.database().ref("presence/" + firebase.auth().currentUser.uid).set(false);
    return firebase.auth().signOut();
}

export const userExist = function () {
    if (firebase.auth().currentUser != null) {
        return true;
    } else {
        return false;
    }
}

//Must check current user exist before calling this function!!!!!
export const getUserData = function () {
    let user = firebase.auth().currentUser;
    return firebase.database().ref().child('users/' + user.uid).once('value')
}

export const getCurrentUser = function () {
    return firebase.auth().currentUser;
}

export const getAllUserData = function () {

    return issueRef.orderByKey().once("value");

}


