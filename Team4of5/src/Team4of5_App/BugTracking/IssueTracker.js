import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/Nav.js';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import IssueTrackerNav from './IssueTrackerNav.js';
import IssueTrackerBody from './IssueTrackerBody.js';
import IssueType from './IssueType.js';
import IssuePriority from './IssuePriority.js';
import IssueSeverity from './IssueSeverity.js';


class IssueTracker extends React.Component {
  constructor(props){
		super(props);
  }


  render() {

    return (
      <div className='container-fluid'>
        <IssueTrackerNav />
      <div className ='row'>
        <IssueType />
      </div>
      <div>
          <IssueSeverity />
          <IssuePriority />
      </div>
      <div>

        <h1>All Issues Summary</h1>
        <br/>
        <br/>
        <div className='tableBody'>
            {/* <BugTrackingTableBody /> */}
            <IssueTrackerBody />
        </div>

      </div>
</div>
    );
  }
}

export default IssueTracker;
