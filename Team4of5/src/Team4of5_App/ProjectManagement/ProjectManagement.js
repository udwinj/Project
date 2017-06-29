import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/Nav.js';
import ProjectManagementTable from './ProjectManagementTable.js';
import './ProjectManagementTables.css';
import * as Users from '../../Team4of5_Service/Users.js';

class ProjectManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: [],
        }
        this.getData = this.getData.bind(this);

    }
    componentDidMount() {
          let self = this;
          if(Users.userExist() == true){
            Users.getUserData().then(function (data) {
                      self.getData(data);
                    }, function (err) {
                        //Error occur
                        console.log("Promise Error");
                        console.log(err);
                    })
          }
          }

        getData(data) {
                let newUser = []
                const userdata = data.val();
                //const keys = Object.keys(userdata);

                newUser.push(userdata.role);
                this.setState({ userInfo: newUser });
            }

    render() {
        return (
        <div>
            <h1>Project Management {this.state.userInfo[0]} Page</h1>
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
