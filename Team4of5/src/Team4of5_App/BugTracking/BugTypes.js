import React from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


const bugTyes = [{
  id: "1",
  name: "A",
  description: "Bugs would cause system crash, need to fix ASAP"
},
{
  id:"2",
  name: "B",
  description: "Bugs occur adding functions"
},
{
  id:"3",
  name: "C",
  description: "Bugs are minor issues, not urgent"
}];

export default class BugTypeTable extends React.Component {
  render() {
    return (
      <BootstrapTable
      data={ bugTyes }
      exportCSV = {true}
      striped={ true }
      tableHeaderClass='flakes-table'
      tableBodyClass='flakes-table'
      containerClass='flakes-table'
      tableContainerClass='flakes-table'
      headerContainerClass='flakes-table'
      bodyContainerClass='flakes-table'
      >
        <TableHeaderColumn isKey={true} dataField='id' hidden={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name'>Type</TableHeaderColumn>
        <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>

      </BootstrapTable>
    );
  }
}
