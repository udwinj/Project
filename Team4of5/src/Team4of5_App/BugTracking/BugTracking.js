import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/Nav.js';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import BugTypeTable from './BugTypes.js';

class BugTracking extends React.Component {
  constructor(props){
		super(props);
  }


  render() {

    return (
  <BugTypeTable />
    );
  }
}

export default BugTracking;
