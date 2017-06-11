import React from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


const bugNotificationTypes = [{
  id: "1",
  name: "Unread Bugs",
  number: 20
},
{
  id:"2",
  name: "Imcomplete Bugs",
  number: 8
},
];

export default class BugNotification extends React.Component {
  render() {
    return (
      <BootstrapTable
      data={ bugNotificationTypes }
      exportCSV = {false}
      striped={ true }
      tableHeaderClass='flakes-table'
      tableBodyClass='flakes-table'
      containerClass='flakes-table'
      tableContainerClass='flakes-table'
      headerContainerClass='flakes-table'
      bodyContainerClass='flakes-table'
      >
        <TableHeaderColumn isKey={true} dataField='id' hidden={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name'>Summary</TableHeaderColumn>
        <TableHeaderColumn dataField='number'>No.</TableHeaderColumn>

      </BootstrapTable>
    );
  }
}
