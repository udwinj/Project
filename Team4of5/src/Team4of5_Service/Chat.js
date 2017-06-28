
import * as firebase from 'firebase';
import * as Config from './Config.js';


var ref = firebase.app().database().ref();
var usersRef = ref.child('users');


export const findUser = function (user_email) {

    usersRef.on("child_added", function(snapshot) {
        if (snapshot.val().email == user_email) {
            alert(snapshot.val().email + " with the name " + snapshot.val().display_name)
            return snapshot.val().email;
        }
    });
    return "not found";
}