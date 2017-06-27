import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


const projectIssueSummary=[
    {
        id:1,
      projectName: "A",
      new: 20,
      open: 11,
      assigned: 12,
      fixed: 22,
      verified: 17,
      closed:11,
    },
    {
        id:2,
        projectName: "B",
        new: 11,
        open: 12,
        assigned: 21,
        fixed: 31,
        verified: 10,
        closed:11,
    },
    {
        id:3,
        projectName: "C",
        new: 20,
        open: 11,
        assigned: 12,
        fixed: 22,
        verified: 19,
        closed:11,
    },
    {
        id:4,
        projectName: "D",
        new: 20,
        open: 11,
        assigned: 12,
        fixed: 22,
        verified: 21,
        closed:11,
    },
    {
        id:5,
        projectName: "E",
        new: 20,
        open: 11,
        assigned: 12,
        fixed: 22,
        verified: 19,
        closed:11,
    },
]
class IssueReportProject extends React.Component {
  render() {
    return (

      <div>
          <BootstrapTable
          data={ projectIssueSummary }
          exportCSV = {false}
          striped
          >
            <TableHeaderColumn isKey={true} dataField='id' hidden={true} >ID</TableHeaderColumn>
            <TableHeaderColumn dataField='projectName' width='30'>projectName</TableHeaderColumn>
            <TableHeaderColumn dataField='new' width='30'>New</TableHeaderColumn>
            <TableHeaderColumn dataField='open' width='30'>Open</TableHeaderColumn>
            <TableHeaderColumn dataField='assigned' width='30'>Assigned</TableHeaderColumn>
            <TableHeaderColumn dataField='fixed' width='30'>Fixed</TableHeaderColumn>
            <TableHeaderColumn dataField='verified' width='30'>Verified</TableHeaderColumn>
            <TableHeaderColumn dataField='closed' width='30'>Closed</TableHeaderColumn>
          </BootstrapTable>

      </div>
    );
  }
}
export default IssueReportProject;
