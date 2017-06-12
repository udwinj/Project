import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/Nav.js';
import ProjectManagementTable from './ProjectManagementTable.js';
import './ProjectManagementTables.css';

class ProjectManagement extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div>
            <h1>Project Management</h1>
          <div id="parent">

            <br/>
            <div id='table1'>
                <h3>Current Stories</h3>
                <ProjectManagementTable />
            </div>
            <br/>
            <div id='table2'>
                <h3>Backlog</h3>
            <ProjectManagementTable />
            </div>
            <br/>
            <div id='table3'>
                <h3>History</h3>
            <ProjectManagementTable />
            </div>
          </div>
          </div>

        )
    }
}

export default ProjectManagement;
