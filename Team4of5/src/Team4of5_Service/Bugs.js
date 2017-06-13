

import * as firebase from 'firebase';
import * as Config from './Config.js';


firebase.initializeApp(Config.firebase_config);
var ref = firebase.app().database().ref();
var bugRef = ref.child('bugs');

export const addNewBug = function(bug_id,bug_type, bug_reporter, bug_reporter_role,bug_assignee,bug_issue_date,details,status,expcompdt){
		var thisBugRef = bugRef.child(bug_id);
              thisBugRef.update({
              id: bug_id,
              type: bug_type,
              reporter: bug_reporter,
              reporter_role: bug_reporter_role,
              assignee: bug_assignee,
              issue_date: bug_issue_date,
              details: details,
              status: status,
              expected_completion_dt: expcompdt,
              actual_completion_dt: '',
              });
}

export const updateBugStatus = function(bug_id,status){
              var thisBugRef = bugRef.child(bug_id);
              thisBugRef.update({
              status: status
              });
}