import React, {Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


const bugData = []
const tableTypes = [ {
  value: 'Current',
  text: 'Current'
}, {
  value: 'Backlog',
  text: 'Backlog'
}, {
  value: 'History',
  text: 'History'
}];


function addBugs(quantity) {
  const startId = bugData.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    bugData.push({
      id: id,
      Type: 'Current',
      Descrip: 'This is a story',
    });
  }
}


addBugs(5);

const cellEditProp = {
  mode: 'click',
  blurToSave: true
};

class ProjectManagementTable extends React.Component{
  constructor(props) {
  super(props);
  this.formatType = this.formatType.bind(this);
}

  formatType(cell) {
    return `${cell}`;
  }

  render(){
    const selectRowProp = {
     mode: 'checkbox',
     hideSelectColumn: true
   };


return (
      <BootstrapTable
        data={ bugData }
        cellEdit={ cellEditProp }
        selectRow={ selectRowProp }
        exportCSV={ false }
        pagination
        insertRow
        >

        <TableHeaderColumn dataField='id' isKey={true} hidden={true} >ID</TableHeaderColumn>
        <TableHeaderColumn dataField='Type' width='20%' dataFormat={ this.formatType } editable={ { type: 'select', options: { values: tableTypes }, defaultValue: 'C' } }>Type</TableHeaderColumn>
        <TableHeaderColumn dataField='Descrip' >Objective Description</TableHeaderColumn>
        
      </BootstrapTable>
    );

  }
}
export default ProjectManagementTable
