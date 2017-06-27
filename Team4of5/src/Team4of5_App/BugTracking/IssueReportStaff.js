import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const staffIssueSummary=[
    {
      id: 1,
      staffName: "Admin",
      new: 20,
      open: 11,
      assigned: 12,
      fixed: 22,
      verified: 17,
      closed:11,
    },
    {
        id: 2,
        staffName: "Jim",
        new: 11,
        open: 12,
        assigned: 21,
        fixed: 31,
        verified: 10,
        closed:11,
    },
    {
        id: 3,
        staffName: "Bill",
        new: 20,
        open: 11,
        assigned: 12,
        fixed: 22,
        verified: 19,
        closed:11,
    },
    {
        id: 4,
        staffName: "Clarie",
        new: 20,
        open: 11,
        assigned: 12,
        fixed: 22,
        verified: 21,
        closed:11,
    },
    {
        id: 5,
        staffName: "Kara",
        new: 20,
        open: 11,
        assigned: 12,
        fixed: 22,
        verified: 19,
        closed:11,
    },
]

class IssueReportStaff extends React.Component {
  render() {
    return (


      <div>
          <BootstrapTable
          data={ staffIssueSummary }
          exportCSV = {false}
          striped
          >
            <TableHeaderColumn isKey={true} dataField='id' hidden={true} >ID</TableHeaderColumn>
            <TableHeaderColumn dataField='staffName' width='30'>Staff</TableHeaderColumn>
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
export default IssueReportStaff;
