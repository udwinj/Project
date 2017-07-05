

import * as firebase from 'firebase';
import * as Config from './Config.js';


var ref = firebase.app().database().ref();
var issueRef = ref.child('issues');
var usersRef = ref.child('users');


export const addNewIssue = function(
    completionDate, details,
    expComDate, owner, project,
       issue_status){

	    issueRef.push({
              owner: owner,
              completionDate: completionDate,
              details: details,
              expComDate: expComDate,
              issuedate: Date.now(),
              project: project,
              status: issue_status,
              issue_last_edited_dtm: Date.now()
              });
}

export const updateIssueStatus = function(issue_id,status){
              var thisIssueRef = issueRef.child(issue_id);
              thisIssueRef.update({
              status: status,
              issue_last_edited_dtm: Date.now()
              });
}

// export const updateOwner = function(issue_id,owner){
//               var thisIssueRef = issueRef.child(issue_id);
//               thisIssueRef.update({
//               owner: owner,
//               issue_last_edited_dtm: Date.now()
//               });
// }

export const update_completion_dt = function(issue_id,completionDate){
              var thisIssueRef = issueRef.child(issue_id);
              thisIssueRef.update({
              completiondate: completionDate,
              bug_last_edited_dtm: Date.now()
              });
}
// this allows a user to update their display name in the settings tab
export const issueUpdate = function (completionDate, status) {
    var ref = firebase.app().database().ref();
    var issueRef = ref.child('issues');
    var issue_id = issue_id;
    var thisIssueRef = issueRef.child(issue_id);


    if (completionDate  &&  status) {
        return thisIssueRef.update({
            completiondate: completionDate,
             status: status,
              issue_last_edited_dtm: Date.now()
        });
    }
    else if (completionDate) {
        return thisIssueRef.update({
            completiondate: completionDate,
            issue_last_edited_dtm: Date.now()
        });
    }
    else if (status) {
        return thisIssueRef.update({
             status: status,
             issue_last_edited_dtm: Date.now()
        });
    }

}
