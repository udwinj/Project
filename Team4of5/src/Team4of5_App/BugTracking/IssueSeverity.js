import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
const IssueSeverityData=[
    {
        id:1,
        name:"Critical",
        type:  "The issue causes a failure of the complete software system, subsystem or a program within the system.",
    },
    {
        id:2,
        name:"High",
        type: "The issue does not cause a failure, but causes the system to produce incorrect, incomplete, inconsistent results or impairs the system usability.",
    },
    {
        id:3,
        name:"Medium",
        type: "The issue does not cause a failure, does not impair usability, and does not interfere in the fluent work of the system and programs.",
    },
    {
        id:4,
        name:"Low",
        type: "The issue is an aesthetic, is an enhancement or is a result of non-conformance to a standard.",
    },
    {
        id:5,
        name:"None",
        type: "The issue is at the level of severity.",
    },
]

export default class IssueSeverity extends React.Component {

  render() {
    return (
      <BootstrapTable
      data={ IssueSeverityData}
      exportCSV = {false}
      striped={ true }
      hover={ true }

      >
        <TableHeaderColumn isKey={true} dataField='id' hidden={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name' width='150px'>Issue Severity</TableHeaderColumn>
        <TableHeaderColumn dataField='type' tdStyle={ { whiteSpace: 'normal' } }>Details</TableHeaderColumn>

      </BootstrapTable>
    );
  }
}
