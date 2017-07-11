
import * as firebase from 'firebase';
import * as Config from './Config.js';
import * as Tools from '../Team4of5_App/Tools.js';

let ref = firebase.app().database().ref();
let usersRef = ref.child('users');
let chatProject = ref.child('chatProject');


export const getProjectData = function () {


    return chatProject.orderByKey().once("value");


}


export const addNewCard = function (laneID, id, title, description) {


    var card_lane;
    switch (laneID) {
        case "Backlog":
            card_lane = 0;
            break;
        case "Next":
            card_lane = 1;
            break;
        case "InProgress":
            card_lane = 2;
            break;
        case "Staged":
            card_lane = 3;
            break;
        case "QA":
            card_lane = 4;
            break;
        case "Live":
            card_lane = 5;
            break;
        default:
            card_lane = 0;
    }
    getProjectData().then(function (data) {

        var Project = '0be3f584-33ce-11e2-7b8c-72fe4d59dc4f';

        const projdata = data.val();
        var projArray = [];
        var lanes = [];
        var cards = [];
        const keys = Object.keys(projdata);
        projArray.push(projdata[keys].data.lanes);
        lanes = projArray[0];
        cards = lanes[card_lane].cards;
        cards.push({ id: id, title: title, description: description });
        //chatProject.push(lanes);

        var path = '0be3f584-33ce-11e2-7b8c-72fe4d59dc4f/data/lanes/' + card_lane;

        var thisRef = chatProject.child(path);
        console.log("Checking");
        console.log(thisRef);

        //f (user_display_name && user_role) {
        return thisRef.update({
            cards: cards
        });
        //}

    },
        function (err) {
            //Error occur
            console.log("Promise Error");
            console.log(err);
        }
    );
}