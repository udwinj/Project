import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import IssueTrackerNav from './IssueTrackerNav.js';
import Navbar from '../Navbar/Nav.js';
import IssueReportStaff from './IssueReportStaff.js';
import IssueReportProject from './IssueReportProject.js';

class IssueReports extends React.Component {
  render() {
    return (
    <div>
            <IssueTrackerNav />
            
      <div>
            <IssueReportStaff />
      </div>
      <br/>
      <br/>
      <div>
            <IssueReportProject />
      </div>
      </div>
    );
  }
}
export default IssueReports;
