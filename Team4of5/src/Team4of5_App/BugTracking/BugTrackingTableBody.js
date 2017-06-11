import React, {Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import BugTrackTableSearch from './BugTrackingToolBar.js';

// const bugData = [{
//   id: "1",
//   Type: "A",
//   Reporter: "Admin",
//   Role: "CFO",
//   Assignee: "Tome",
//   IssueDate: "",
//   Details:"Bugs occur ASAP~~~~~",
//   Status: "Improgress",
//   ExpComDate: "",
//   ActComDate: "",
// },
// {
//   id: "2",
//   Type: "B",
//   Reporter: "Claire",
//   Role: "Frontend",
//   Assignee: "Kara",
//   IssueDate: "",
//   Details:"Bugs adding functions~~~~~",
//   Status: "Completed",
//   ExpComDate: "",
//   ActComDate: "",
// },
// {
//   id: "3",
//   Type: "C",
//   Reporter: "Tom",
//   Role: "Backend",
//   Assignee: "Bill",
//   IssueDate: "",
//   Details:"Bugs not urgent~~~~~",
//   Status: "unread",
//   ExpComDate: "",
//   ActComDate: "",
// }];

const bugData = []
const bugDataTypes = [ {
  value: 'A',
  text: 'A'
}, {
  value: 'B',
  text: 'B'
}, {
  value: 'C',
  text: 'C'
}];

const bugDataStatus =[{
  value: 'A',
  text: 'Completed'
}, {
  value: 'B',
  text: 'Inprogress'
}, {
  value: 'C',
  text: 'Unread'
}, {
  value: 'D',
  text: 'Unassigned'
}]

function addBugs(quantity) {
  const startId = bugData.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    bugData.push({
      id: id,
      Type: 'A',
      Reporter: 'Tom',
      Assignee: 'Bill',
      IssueDate: '200' + i + '-12-28T14:57:00',
      Details: 'Bugs!! Run! Tick is comming',
      Status: 'unread',
      ExpComDate: '200' + i + '-12-28T14:57:00',
      ActComDate: '200' + i + '-12-28T14:57:00'
    });
  }
}


addBugs(5);

const cellEditProp = {
  mode: 'click',
  blurToSave: true
};

class BugTrackingTableBody extends React.Component{
  constructor(props) {
  super(props);
  this.formatType = this.formatType.bind(this);
}

  formatType(cell) {
    return `${cell}`;
  }

  render(){
    const selectRowProp = {
     mode: 'checkbox'
   };


return (
      <BootstrapTable
        data={ bugData }
        cellEdit={ cellEditProp }
        selectRow={ selectRowProp }
        exportCSV={ true }
        pagination
        insertRow
        search>

        <TableHeaderColumn dataField='id' isKey={true} >ID</TableHeaderColumn>
        <TableHeaderColumn dataField='Type' dataFormat={ this.formatType } editable={ { type: 'select', options: { values: bugDataTypes }, defaultValue: 'C' } }>Type</TableHeaderColumn>
        <TableHeaderColumn dataField='Reporter' >Reporter</TableHeaderColumn>
        <TableHeaderColumn dataField='Assignee'>Assignee</TableHeaderColumn>
        <TableHeaderColumn dataField='IssueDate' editable={ { type: 'datetime' }}>IssueDate</TableHeaderColumn>
        <TableHeaderColumn dataField='Details' editable={ { type: 'textarea', defaultValue: 'Default Name'} }>Details</TableHeaderColumn>
        <TableHeaderColumn dataField='Status' dataFormat={ this.formatType } editable={ { type: 'select', options: { values: bugDataStatus }, defaultValue: 'C' }}>Status</TableHeaderColumn>
        <TableHeaderColumn dataField='ExpComDate' editable={ { type: 'datetime' }}>Expected Completion Date</TableHeaderColumn>
        <TableHeaderColumn dataField='ActComDate' editable={ { type: 'datetime' }}>Actual Completion Date</TableHeaderColumn>
      </BootstrapTable>
    );

  }
}
export default BugTrackingTableBody
