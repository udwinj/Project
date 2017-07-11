
import * as firebase from 'firebase';
import * as Config from './Config.js';
import * as Tools from '../Team4of5_App/Tools.js';

let ref = firebase.app().database().ref();
let usersRef = ref.child('users');
let chatProject = ref.child('chatProject');


export const getProjectData = function () {


    return chatProject.orderByKey().once("value");


}


export const addNewCard = function (
) {

    //var card {
    //          id: 'dummy', title: 'dummy', description: 'dummy card'
    //     }
    getProjectData().then(function (data) {

        const projdata = data.val();
        var projArray = [];
        var lanes = [];
        var cards = [];
        const keys = Object.keys(projdata);
        projArray.push(projdata[keys].data.lanes);
        lanes = projArray[0];
        console.log("add new card");
        console.log(lanes[0].cards[0]);
        cards = lanes[0].cards;
        cards.push({ id: 'dummy', title: 'dummy', description: 'dummy card' });
        chatProject.push(lanes);
    },
        function (err) {
            //Error occur
            console.log("Promise Error");
            console.log(err);
        }
    );

    /*chatProject.push({
        owner: owner,
        completionDate: completionDate,
        details: details,
        expComDate: expComDate,
        issuedate: Date.now(),
        type: type,
        project: project,
        status: issue_status,
        priority: priority,
        severity: severity,
        issue_last_edited_dtm: Date.now()
    });
    */
}