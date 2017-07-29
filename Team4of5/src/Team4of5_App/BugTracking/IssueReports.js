import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import IssueTrackerNav from './IssueTrackerNav.js';
import Navbar from '../Navbar/Nav.js';
import IssueReportStaff from './IssueReportStaff.js';

class IssueReports extends React.Component {
  render() {
    return (
    <div>
        <div>
            <IssueTrackerNav />
        </div>

      <div>
            <IssueReportStaff />
      </div>
      <br/>
      </div>
    );
  }
}
export default IssueReports;
