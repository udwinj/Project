import React, {Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import BugTrackTableSearch from './BugTrackingToolBar.js';

const bugData = [{
  id: "1",
  Type: "A",
  Reporter: "Admin",
  Role: "CFO",
  Assignee: "Tome",
  IssueDate: Date.now(),
  Details:"Bugs occur ASAP~~~~~",
  Status: "Improgress",
  ExpComDate: "DD/MM/YYYY",
  ActComDate: "DD/MM/YYYY"
},
{
  id: "2",
  Type: "B",
  Reporter: "Claire",
  Role: "Frontend",
  Assignee: "Kara",
  IssueDate: Date.now(),
  Details:"Bugs adding functions~~~~~",
  Status: "Completed",
  ExpComDate: "DD/MM/YYYY",
  ActComDate: "DD/MM/YYYY"
},
{
  id: "3",
  Type: "C",
  Reporter: "Tom",
  Role: "Backend",
  Assignee: "Bill",
  IssueDate: Date.now(),
  Details:"Bugs not urgent~~~~~",
  Status: "unread",
  ExpComDate: "DD/MM/YYYY",
  ActComDate: "DD/MM/YYYY"
}];

class BugTrackingTableBody extends React.Component{
  render(){
    const selectRowProp = {
     mode: 'checkbox'
   };
   const options = {
  clearSearch: false,
  searchPanel: (props) => (<BugTrackTableSearch { ...props }/>),
  page: 1,  // which page you want to show as default
  sizePerPage: 25,  // which size per page you want to locate as default
  pageStartIndex: 0, // where to start counting the pages
  paginationSize: 3,  // the pagination bar size.
  prePage: 'Prev', // Previous page button text
  nextPage: 'Next', // Next page button text
  firstPage: 'First', // First page button text
  lastPage: 'Last', // Last page button text
  sizePerPageList: [ {
  text: '5', value: 5
  }, {
  text: '10', value: 10
  }, {
  text: '15', value: 15
  }, {
  text: '25', value: 25
  }, {
  text: '50', value: 50
  }, {
  text: '100', value: 100
  }, {
  text: 'All', value: 150
  } ],
};

return (
      <BootstrapTable
        data={ bugData }
        options={ options }
        selectRow={ selectRowProp }
        exportCSV={ true }
        pagination={ true }
        tableHeaderClass='flakes-table'
        tableBodyClass='flakes-table'
        containerClass='flakes-table'
        tableContainerClass='flakes-table'
        headerContainerClass='flakes-table'
        bodyContainerClass='flakes-table'
        search>

        <TableHeaderColumn dataField='id' isKey={true} hidden={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='Type'>Type</TableHeaderColumn>
        <TableHeaderColumn dataField='Reporter'>Reporter</TableHeaderColumn>
        <TableHeaderColumn dataField='Assignee'>Assignee</TableHeaderColumn>
        <TableHeaderColumn dataField='IssueDate'>IssueDate</TableHeaderColumn>
        <TableHeaderColumn dataField='Details'>Details</TableHeaderColumn>
        <TableHeaderColumn dataField='Status'>Status</TableHeaderColumn>
        <TableHeaderColumn dataField='ExpComDate'>Expected Completion Date</TableHeaderColumn>
        <TableHeaderColumn dataField='ActComDate'>Actual Completion Date</TableHeaderColumn>
      </BootstrapTable>
    );

  }
}
export default BugTrackingTableBody
