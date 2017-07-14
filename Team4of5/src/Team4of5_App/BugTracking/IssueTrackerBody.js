import React, {Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { Navbar, Jumbotron, Button, Input, Nav } from 'react-bootstrap';

//Connect Firebase
import * as firebase from 'firebase';
import * as Config from '../../Team4of5_Service/Config.js';
import * as Issues from '../../Team4of5_Service/Issues.js';
import IssueUpdate from './IssueUpdate.js';

const issueData = []
const issueStatus = [{
  value: 'New',
  text: 'New'
}, {
  value: 'Open',
  text: 'Open'
}, {
  value: 'Assigned',
  text: 'Assigned'
}, {
  value: 'Fixed',
  text: 'Fixed'
},
{
  value: 'Verified',
  text: 'Verified'
},
{
  value: 'Closed',
  text: 'Closed'
}]
const issueType = [{
  value: 'Blocker',
  text: 'Blocker'
}, {
  value: 'Critical',
  text: 'Critical'
}, {
  value: 'Major',
  text: 'Major'
}, {
  value: 'Minor',
  text: 'Minor'
},
{
  value: 'Trivial',
  text: 'Trivial'
}]
const issuePriority = [{
  value: 'Immediate',
  text: 'Immediate'
}, {
  value: 'High',
  text: 'High'
}, {
  value: 'Medium',
  text: 'Medium'
}, {
  value: 'Low',
  text: 'Low'
},
{
  value: 'Verified',
  text: 'Verified'
},
{
  value: 'Fix if time',
  text: 'Fix if time'
}]
const issueSeverity = [{
  value: 'Critical',
  text: 'Critical'
}, {
  value: 'High',
  text: 'High'
}, {
  value: 'Medium',
  text: 'Medium'
}, {
  value: 'Low',
  text: 'Low'
},
{
  value: 'None',
  text: 'None'
}]
const issueFilterStyle = {
  width:150,
  height:20,
  fontSize: 12,

};

class IssueTrackerBody extends React.Component{
  constructor(props) {
  super(props);

  this.state = {
    issues:[]
  };

    this.issueRef = firebase.database().ref().child('issues');

}
//After the connect, what the state will do--gotdata
componentDidMount() {
  this.issueRef.on('value', this.gotData, this.errData);

}

//get the data from the firebase and push them out
 gotData = (data) => {
      let newIssue = []
      const issuedata = data.val();
      const keys = Object.keys(issuedata);

      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];

        //reformat the dates
        var issuedate_reformat = new Date(issuedata[k].issuedate);
        issuedate_reformat =  (issuedate_reformat.getMonth() + 1) + '/' + (issuedate_reformat.getDate() +1) + '/'+ issuedate_reformat.getFullYear();

        var completionDate_reformat = new Date(issuedata[k].completionDate);
        completionDate_reformat =  (completionDate_reformat.getMonth() + 1) + '/' + (completionDate_reformat.getDate()+1) + '/'+ completionDate_reformat.getFullYear();


        newIssue.push({
          id: issuedata[k].surrogate_id, status: issuedata[k].status,
          type:issuedata[k].type,
          priority:issuedata[k].priority,
          severity: issuedata[k].severity,
          issueDate: issuedate_reformat,
          owner: issuedata[k].owner,
          expComDate: issuedata[k].expComDate,
          details: issuedata[k].details,
         completionDate: completionDate_reformat,
         project: issuedata[k].project
        });

      }
      this.setState({issues: newIssue});
    }


errData = (err) => {
    console.log(err);
    }

formatType(cell) {
    return `${cell}`;
  }

handleClick = (rowKey) => {
  alert(this.refs.table.getPageByRowKey(rowKey));
}


render(){

return (

    <div>
        <div>
            <h3>Update Issue</h3>
            <IssueUpdate />
        </div>
        <div>

    <h3>Issue Summary</h3>
      <BootstrapTable
        ref='table'
        data={ this.state.issues }
        exportCSV={ true }
        pagination={true}
        insertRow={false}
        search={true}
        strictSearch={ false }
        multiColumnSearch={ true }
        >

        <TableHeaderColumn dataField='id' isKey={true} width='200'>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='status'
            editable={ { type: 'select', options: { values: issueStatus },
            defaultValue: 'C' }}
            dataSort={true}
            >Status</TableHeaderColumn>
        <TableHeaderColumn dataField='type'
            editable={ { type: 'select', options: { values: issueType },
            defaultValue: 'A' }}
            dataSort={true}
            >Type</TableHeaderColumn>
        <TableHeaderColumn dataField='priority'
            editable={ { type: 'select', options: { values: issuePriority },
            defaultValue: 'A' }}
            dataSort={true}
            >Priority</TableHeaderColumn>
        <TableHeaderColumn dataField='severity'
            editable={ { type: 'select', options: { values: issueSeverity },
            defaultValue: 'A' }}
            dataSort={true}
            >Severity</TableHeaderColumn>
        <TableHeaderColumn dataField='owner' dataSort={true} tdStyle={ { whiteSpace: 'nowrap' } }>Owner</TableHeaderColumn>
        <TableHeaderColumn dataField='issueDate' dataSort={true}>IssueDate</TableHeaderColumn>
        <TableHeaderColumn dataField='expComDate' dataSort={true}>Expected Completed in Days</TableHeaderColumn>
        <TableHeaderColumn dataField='details' filter={ { type: 'TextFilter', style: issueFilterStyle} } tdStyle={ { whiteSpace: 'normal' } } width='250'>Details</TableHeaderColumn>
        <TableHeaderColumn dataField='completionDate' dataSort={true} >Actual Completion Date</TableHeaderColumn>
        <TableHeaderColumn dataField='project' filter={ { type: 'TextFilter', style: issueFilterStyle} } tdStyle={ { whiteSpace: 'nowrap' } } width='200'>Project</TableHeaderColumn>

      </BootstrapTable>
</div>
      </div>
    );

  }
}
export default IssueTrackerBody
