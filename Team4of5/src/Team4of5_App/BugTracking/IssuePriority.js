import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
const IssuePriorityData=[
    {
        id:1,
        name:"Immediate",
        type:  "All work stops except for this item, we release the fix as soon as it is tested.",
    },
    {
        id:2,
        name:"High",
        type: "The next release will not go out without this item resolved.",
    },
    {
        id:3,
        name:"Medium",
        type: "Really desired in this release, but if we run out of time we will push it.",
    },
    {
        id:4,
        name:"Low",
        type: "We really don't expect to get to this in this release, but if you run out of tasks, work on it.",
    },
    {
        id:5,
        name:"Fix if time",
        type: " Don't work on it now.",
    },
]

export default class IssuePriority extends React.Component {

  render() {
    return (
      <BootstrapTable
      data={ IssuePriorityData}
      exportCSV = {false}
      striped={ true }
      hover={ true }
      >
        <TableHeaderColumn isKey={true} dataField='id' hidden={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name' width='150px' >Issue Priority</TableHeaderColumn>
        <TableHeaderColumn dataField='type' tdStyle={ { whiteSpace: 'normal' } }>Details</TableHeaderColumn>

      </BootstrapTable>
    );
  }
}
