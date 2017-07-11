
import * as firebase from 'firebase';
import * as Config from './Config.js';
import * as Tools from '../Team4of5_App/Tools.js';

let ref = firebase.app().database().ref();
let usersRef = ref.child('users');
let chatProject = ref.child('chatProject');


export const getProjectData = function () {


    return chatProject.orderByKey().once("value");


}