import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
const IssueTypeData=[
    {
        id:1,
        type: "Blocker - Reserved for catastrophic failures - exceptions, crashes, corrupt data, etc.",
    },
    {
        id:2,
        type: "Critical - These may refer to unhandled exceptions or to other serious bugs that only happen under certain specific conditions. ",
    },
    {
        id:3,
        type: "Usually reserved for perf issues. Anything that seriously hampers productivity but does not actually prevent work from being done. ",
    },
    {
        id:4,
        type: "Minor - These are 'nuisance' bugs. A default setting not being applied, a read-only field showing as editable, a race condition in the UI, a misleading error message, etc.",
    },
    {
        id:5,
        type: "Trivial - Cosmetic issues. Scroll bars appearing where they should not, window does not remember saved size/location, typos, last character of a label being cut off, that sort of thing. ",
    },
]

export default class IssueType extends React.Component {

  render() {
    return (
      <BootstrapTable
      data={ IssueTypeData}
      exportCSV = {false}
      striped={ true }
      hover={ true }

      >
        <TableHeaderColumn isKey={true} dataField='id' hidden={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='type' tdStyle={ { whiteSpace: 'normal' } }>Issue Type</TableHeaderColumn>

      </BootstrapTable>
    );
  }
}
