import React, {Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { Navbar, Jumbotron, Button, Input, Nav } from 'react-bootstrap';

//Connect Firebase
import * as firebase from 'firebase';
import * as Config from '../../Team4of5_Service/Config.js';
import * as Issues from '../../Team4of5_Service/Issues.js';


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


const cellEditProp = {
  mode: 'click',
  blurToSave: true
};


class IssueTrackerBody extends React.Component{
  constructor(props) {
  super(props);

  this.state = {
    issues:[]
  };


    this.issueRef = firebase.database().ref().child('issues');
    //Click the save button; then the data will save to firebase

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
        issuedate_reformat =  (issuedate_reformat.getMonth() + 1) + '/' + issuedate_reformat.getDate() + '/'+ issuedate_reformat.getFullYear();

        var completionDate_reformat = new Date(issuedata[k].completionDate);
        completionDate_reformat =  (completionDate_reformat.getMonth() + 1) + '/' + completionDate_reformat.getDate() + '/'+ completionDate_reformat.getFullYear();


        newIssue.push({
          id: k, status: issuedata[k].status,
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
      <BootstrapTable
        ref='table'
        remote={ false }
        data={ this.state.issues }
        cellEdit={ cellEditProp }
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
            >Status</TableHeaderColumn>
        <TableHeaderColumn dataField='owner' tdStyle={ { whiteSpace: 'nowrap' } }>Owner</TableHeaderColumn>
        <TableHeaderColumn dataField='issueDate'>IssueDate</TableHeaderColumn>
        <TableHeaderColumn dataField='expComDate' >Expected Completed in Days</TableHeaderColumn>
        <TableHeaderColumn dataField='details' editable={ { type: 'textarea', defaultValue: 'Please write something'} } tdStyle={ { whiteSpace: 'normal' } } width='250'>Details</TableHeaderColumn>
        <TableHeaderColumn dataField='completionDate' editable={ { type: 'textarea', defaultValue: 'Not yet complete'} }>Actual Completion Date</TableHeaderColumn>
        <TableHeaderColumn dataField='project' tdStyle={ { whiteSpace: 'nowrap' } }>Project</TableHeaderColumn>

      </BootstrapTable>
    );

  }
}
export default IssueTrackerBody
