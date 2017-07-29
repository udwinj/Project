import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/Nav.js';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './IssueTracker.css';

import IssueTrackerNav from './IssueTrackerNav.js';
import IssueTrackerBody from './IssueTrackerBody.js';



class IssueTracker extends React.Component {
  constructor(props){
		super(props);
  }


  render() {

    return (
      <div className='container-fluid'>
        <IssueTrackerNav />

      <div>
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
