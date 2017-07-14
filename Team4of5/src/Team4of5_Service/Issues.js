

import * as firebase from 'firebase';
import * as Config from './Config.js';


var ref = firebase.app().database().ref();
var issueRef = ref.child('issues');
var usersRef = ref.child('users');


export const addNewIssue = function(
    completionDate, details,
    expComDate, owner, project,
       issue_status, type, priority, severity){

  var cnt_projs = 1

    issueRef.once('value', function(snapshot) {
      const keys = Object.keys(snapshot.val())
      for (var i = 0; i< keys.length; i++){
        const k = keys[i]
        if (snapshot.val()[k].project == project){
          cnt_projs = cnt_projs+1
        }
      }

    });

    var surrogate_id = project.concat("-", cnt_projs)

	    issueRef.push({
              surrogate_id: surrogate_id,
              owner: owner,
              completionDate: completionDate,
              details: details,
              expComDate: expComDate,
              issuedate: Date.now(),
              type: type,
              project: project,
              status: issue_status,
              priority:priority,
              severity:severity,
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
export const issueUpdate = function (issueID, completionDate, status,priority,severity) {

    var issue_id;
    var exists = false;
    var comp, pri, stat, sev;

    issueRef.once('value', function(snapshot) {
      const keys = Object.keys(snapshot.val())
      for (var i = 0; i< keys.length; i++){
        const k = keys[i]
        if (snapshot.val()[k].surrogate_id == issueID){
          issue_id = k
        }
      }

    });

    issueRef.child(issue_id).once('value', function(snapshot) {
      exists = (snapshot.val() !== null);
      comp = snapshot.val().completionDate;
      stat = snapshot.val().status;
      pri  = snapshot.val().priority;
      sev = snapshot.val().severity;
    });
    completionDate = completionDate ? completionDate : comp;
    status = status ? status : stat;
    priority = priority ? priority : pri;
    severity = severity ? severity : sev;

    if (exists){
    var thisIssueRef = issueRef.child(issue_id);

    if (completionDate  ||  status || priority || severity) {
        return thisIssueRef.update({
            completionDate: completionDate,
             status: status,
             priority:priority,
             severity:severity,
              issue_last_edited_dtm: Date.now()
        });
    }

}
else {
  alert("Issue not found; please enter a valid issue ID")
}
}
