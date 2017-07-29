import React from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as firebase from 'firebase';
import * as Config from '../../Team4of5_Service/Config.js';



export default class BugNotification extends React.Component {
  constructor(props) {
        super(props);

     this.state = {
      bugInfo:[],
      bugNotificationTypes: [{
            id: "1",
            name: "Unread Bugs",
            number: 9
          },
          {
            id:"2",
            name: "Incomplete Bugs",
            number: 9
          },
          ]
    };
    this.bugRef = firebase.database().ref().child('issues');
  }
    componentDidMount() {

          this.bugRef.on('value', this.gotData, this.errData);
        }

    gotData = (data) => {
      var unread = 0;
      var incomplete = 0;
      let newBug = []
      const bugdata = data.val();
      const keys = Object.keys(bugdata);
      for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (bugdata[k].Status == "Unread"){
            unread = unread+1;
        }
      else if (bugdata[k].Status == "Incomplete") {
            incomplete = incomplete +1;
      }
      }
      newBug.push(unread);
      newBug.push(incomplete);
      this.setState({bugInfo: newBug});
      //alert("there are " + this.state.bugInfo[0] + " unread bugs")


  }

  render() {
    return (
      <BootstrapTable
      data={ this.state.bugNotificationTypes }
      exportCSV = {false}
      striped={ true }
      tableHeaderClass='flakes-table'
      tableBodyClass='flakes-table'
      containerClass='flakes-table'
      tableContainerClass='flakes-table'
      headerContainerClass='flakes-table'
      bodyContainerClass='flakes-table'
      >
        <TableHeaderColumn isKey={true} dataField='id' hidden={true}>ID</TableHeaderColumn>
        <TableHeaderColumn dataField='name'>Summary</TableHeaderColumn>
        <TableHeaderColumn dataField='number'>No.</TableHeaderColumn>

      </BootstrapTable>
    );
  }
}
