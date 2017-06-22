import React from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const projectSummaryDate = [{
  id: 1,
  name: "React 101",
  progress: "completed"
},
{
  id: 2,
  name: "React 102",
  progress: "inprogress"
},
{
  id: 3,
  name: "Data Visulization 101",
  progress: "inprogress"
},
{
  id: 4,
  name: "Machine Learning 101",
  progress: "inprogress"

},
{
  id: 5,
  name: "Backend Development 105",
  progress: "Not start"
},
{
  id: 6,
  name: "React 105",
  progress: "Not start"
}]
class ProjectSummary extends React.Component {
  render() {
    return (
      <BootstrapTable data={ projectSummaryDate } striped hover condensed >
          <TableHeaderColumn dataField='id' isKey>Project ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='progress' editable={ { type: 'textarea', defaultValue: 'Please Update' }}>Product Progress</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default ProjectSummary;
