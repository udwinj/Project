

import * as firebase from 'firebase';
import * as Config from './Config.js';


var ref = firebase.app().database().ref();
var bugRef = ref.child('issues');


export const addNewBug = function(bug_id,date_completed, bug_details, expected_completion_date,
       bug_issue_date,bug_owner,bug_project,bug_status){
		var thisBugRef = bugRef.child(bug_id);
              thisBugRef.update({
              id: bug_id,
              completiondate: date_completed,
              details: bug_details,
              expcomdate: expected_completion_date,
              issuedate: bug_issue_date,
              owner: bug_owner,
              project: bug_project,
              status: bug_status,
              bug_last_edited_dtm: Date.now()
              });
}

export const updateBugStatus = function(bug_id,status){
              var thisBugRef = bugRef.child(bug_id);
              thisBugRef.update({
              status: status,
              bug_last_edited_dtm: Date.now()
              });
}

export const updateAssignee = function(bug_id,bug_assignee){
              var thisBugRef = bugRef.child(bug_id);
              thisBugRef.update({
              assignee: bug_assignee,
              bug_last_edited_dtm: Date.now()
              });
}

export const update_completion_dt = function(bug_id,actcompletiondt){
              var thisBugRef = bugRef.child(bug_id);
              thisBugRef.update({
              actual_completion_dt: actcompletiondt,
              bug_last_edited_dtm: Date.now()
              });
}