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

    <div>

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
        <TableHeaderColumn dataField='owner' dataSort={true} tdStyle={ { whiteSpace: 'nowrap' } }>Owner</TableHeaderColumn>
        <TableHeaderColumn dataField='issueDate' dataSort={true}>IssueDate</TableHeaderColumn>
        <TableHeaderColumn dataField='expComDate' dataSort={true}>Expected Completed in Days</TableHeaderColumn>
        <TableHeaderColumn dataField='details' filter={ { type: 'TextFilter'} } tdStyle={ { whiteSpace: 'normal' } } width='250'>Details</TableHeaderColumn>
        <TableHeaderColumn dataField='completionDate' dataSort={true} >Actual Completion Date</TableHeaderColumn>
        <TableHeaderColumn dataField='project' filter={ { type: 'TextFilter'} } tdStyle={ { whiteSpace: 'nowrap' } }>Project</TableHeaderColumn>

      </BootstrapTable>
      <div>
          <IssueUpdate />
      </div>
      </div>
    );

  }
}
export default IssueTrackerBody
