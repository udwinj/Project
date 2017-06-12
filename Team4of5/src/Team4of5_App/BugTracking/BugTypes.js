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
      exportCSV = {false}
      striped
      >
        <TableHeaderColumn isKey={true} dataField='id' hidden={true} >ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name' width='50'>Type</TableHeaderColumn>
        <TableHeaderColumn dataField='description' width='80'>Description</TableHeaderColumn>

      </BootstrapTable>
    );
  }
}
