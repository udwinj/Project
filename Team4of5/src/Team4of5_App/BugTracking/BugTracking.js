import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/Nav.js';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import BugTypeTable from './BugTypes.js';
import BugNotification from './BugNotification.js';
import BugTrackTableSearch from './BugTrackingToolBar.js';
import BugTrackingTableBody from './BugTrackingTableBody.js';

import IssueTrackerNav from './IssueTrackerNav.js';
import IssueTrackerBody from './IssueTrackerBody.js';
//import './BugTracking.css';

class BugTracking extends React.Component {
  constructor(props){
		super(props);
  }


  render() {

    return (
      <div className='container-fluid'>
        <IssueTrackerNav />
      <div className ='row'>

            <div id='notification' className='col-xs-6 col-md-4'>
                <BugNotification />
            </div>
      </div>
      <div>

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

export default BugTracking;
