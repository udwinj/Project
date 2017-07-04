import React, {Component} from 'react';
import './IssueTracker.css';
import * as User from '../../Team4of5_Service/Users.js';

class IssueReportStaff extends React.Component {
     constructor(props){
          super(props);
     this.state = {
      reportIssue: [],  
          data: [],
          projdata: [],
     errorInput:''
     };
      this.staffIssueForm = this.staffIssueForm.bind(this);
      this.appendColumn = this.appendColumn.bind(this);
      this.getData = this.getData.bind(this);
}

 componentDidMount() {
          let self = this;

          User.getAllUserData().then(function (data) {

                self.getData(data);
            }, function (err) {
                //Error occur
                console.log("Promise Error");
                console.log(err);
            })

    }

    getData(data) {
        const issuedata = data.val();
        const keys = Object.keys(issuedata);

        var userArray = [{1:'Bug Owner',2:'New',3:'Open',4:'Assigned',6:'Verified',7:'Closed'}];
        var projectArray = [{1:'Bug Owner',2:'New',3:'Open',4:'Assigned',6:'Verified',7:'Closed'}];
        var x = 0;

        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          var project = issuedata[k].project
          var owner = issuedata[k].owner
          var status = issuedata[k].status
          var exists = 0
          var new_cnt = 0

        for (var m = 0; m < userArray.length; m++) {
          var datum = userArray[m];
          if (datum.key == owner) {
              exists = 1

            if (status == 'Open'){
            if (userArray[m].open_cnt){
              userArray[m].open_cnt = userArray[m].open_cnt + 1;
            }
            else {
              userArray[m].open_cnt  = 1
            }
          }

          if (status == 'Verified'){
            if (userArray[m].ver_cnt){
              userArray[m].ver_cnt = userArray[m].ver_cnt + 1;
            }
            else {
              userArray[m].ver_cnt  = 1
            }
          }

          if (status == 'Assigned'){
            if (userArray[m].assign_cnt){
              userArray[m].assign_cnt = userArray[m].assign_cnt + 1;
            }
            else {
              userArray[m].assign_cnt  = 1
            }
          }

          if (status == 'New'){
            if (userArray[m].new_cnt){
              userArray[m].new_cnt = userArray[m].new_cnt + 1;
            }
            else {
              userArray[m].new_cnt  = 1
            }
          }


          if (status == 'Closed'){
            if (userArray[m].closed_cnt){
              userArray[m].closed_cnt = userArray[m].closed_cnt + 1;
            }
            else {
              userArray[m].closed_cnt  = 1
            }
          }

        } //if
        } // for 
        if (exists == 0) {
          if (status == 'Open'){
            userArray.push({ key: owner, open_cnt: 1, ver_cnt: 0, assign_cnt: 0, new_cnt: 0, closed_cnt: 0});
          }
          else if (status == 'Verified'){
            userArray.push({ key: owner, open_cnt: 0, ver_cnt: 1, assign_cnt: 0, new_cnt: 0, closed_cnt: 0});
          }
          else if (status == 'Assigned'){
            userArray.push({ key: owner, open_cnt: 0, ver_cnt: 0, assign_cnt: 1, new_cnt: 0, closed_cnt: 0});
          }
          else if (status == 'New'){
            userArray.push({ key: owner, open_cnt: 0, ver_cnt: 0, assign_cnt: 0, new_cnt: 1, closed_cnt: 0});
          }          
          else if (status == 'Closed'){
            userArray.push({ key: owner, open_cnt: 0, ver_cnt: 0, assign_cnt: 0, new_cnt: 0, closed_cnt: 1});
          }

        } //if
        exists = 0
        for (var p = 0; p < projectArray.length; p++) {
          var datum = projectArray[p];
          if (datum.key == project) {
              exists = 1

            if (status == 'Open'){
            if (projectArray[p].open_cnt){
              projectArray[p].open_cnt = projectArray[p].open_cnt + 1;
            }
            else {
              projectArray[p].open_cnt  = 1
            }
          }

          if (status == 'Verified'){
            if (projectArray[p].ver_cnt){
              projectArray[p].ver_cnt = projectArray[p].ver_cnt + 1;
            }
            else {
              projectArray[p].ver_cnt  = 1
            }
          }

          if (status == 'Assigned'){
            if (projectArray[p].assign_cnt){
              projectArray[p].assign_cnt = projectArray[p].assign_cnt + 1;
            }
            else {
              projectArray[p].assign_cnt  = 1
            }
          }

          if (status == 'New'){
            if (projectArray[p].new_cnt){
              projectArray[p].new_cnt = projectArray[p].new_cnt + 1;
            }
            else {
              projectArray[p].new_cnt  = 1
            }
          }


          if (status == 'Closed'){
            if (projectArray[p].closed_cnt){
              projectArray[p].closed_cnt = projectArray[p].closed_cnt + 1;
            }
            else {
              projectArray[p].closed_cnt  = 1
            }
          }

        } //if
        } // for 
        if (exists == 0) {
          if (status == 'Open'){
            projectArray.push({ key: project, open_cnt: 1, ver_cnt: 0, assign_cnt: 0, new_cnt: 0, closed_cnt: 0});
          }
          else if (status == 'Verified'){
            projectArray.push({ key: project, open_cnt: 0, ver_cnt: 1, assign_cnt: 0, new_cnt: 0, closed_cnt: 0});
          }
          else if (status == 'Assigned'){
            projectArray.push({ key: project, open_cnt: 0, ver_cnt: 0, assign_cnt: 1, new_cnt: 0, closed_cnt: 0});
          }
          else if (status == 'New'){
            projectArray.push({ key: project, open_cnt: 0, ver_cnt: 0, assign_cnt: 0, new_cnt: 1, closed_cnt: 0});
          }          
          else if (status == 'Closed'){
            projectArray.push({ key: project, open_cnt: 0, ver_cnt: 0, assign_cnt: 0, new_cnt: 0, closed_cnt: 1});
          }

        } //if
      }

        // for (var i = 0; i < userArray.length; i++) {
        //     var datum = userArray[i];
        //     alert([datum.key, datum.ver_cnt, datum.open_cnt])
        // } //for 
        this.setState({data: userArray});
        this.setState({projdata: projectArray})


    }


     staffIssueForm(id,value){
          console.log(this.props,'issues reports with staff');
            let newArray = this.state.data.slice();
            newArray.push({'id':id,'value':value});
          this.setState({col : newArray});
     }

     // append column to the HTML table
      appendColumn() {
               let obj =  this.state.dataf.map((p) => {
                    let size = Object.keys(p).length;
                    p[size+1] = '-';
                    return p;
               });
               this.setState({data:obj});
           }
     // edit Column
      editColumn(p,k,e) {
         let inputValue = e.target.innerText;
           let obj = p.p;
          let objId = obj.id;
          let position = k.k;
          let values = Object.values(obj);
          if(values.indexOf(inputValue) == -1){
               obj[position] = inputValue;
               let stateCopy = this.state.data;
               stateCopy.map((object,index) =>{
                    if(object.id == objId){
                         object = obj[position];
                    }
               })
               this.setState(stateCopy);
               this.setState({errorInput:''});
               console.log(stateCopy,'stateCopystateCopy');
          }else{
               this.setState({errorInput:'This period is also available in your list'});
               return false;
          }
           }


     render(){

          let list = this.state.data.map(p =>{
               return (          
                    <tr className="grey2" key={p.id}>
                         {Object.keys(p).filter(k => k !== 'id').map(k => {
                               return (<td className="grey1" key={p.id+''+k}><div suppressContentEditableWarning="true" contentEditable="true"
                              value={k} onInput={this.editColumn.bind(this,{p},{k})}>{p[k]}</div></td>);
                         })}
                    </tr>
               );
          });

          let listproj = this.state.projdata.map(p =>{
               return (          
                    <tr className="grey2" key={p.id}>
                         {Object.keys(p).filter(k => k !== 'id').map(k => {
                               return (<td className="grey1" key={p.id+''+k}><div suppressContentEditableWarning="true" contentEditable="true"
                              value={k} onInput={this.editColumn.bind(this,{p},{k})}>{p[k]}</div></td>);
                         })}
                    </tr>
               );
          });

          return (
          <div>
            <h1> Issue Reports </h1>
               <fieldset className="step-4">
                    <div className="heading">
                         <h3>Issue Status by Owner</h3>
                    </div>
                    <div className=" padd-lr">
                         <table cellSpacing="50" id="mytable">
                              <tbody>{list}</tbody>
                         </table>

                    </div>

               </fieldset>

                <fieldset className="step-4">
                    <div className="heading">
                         <h3>Issue Status by Project</h3>
                    </div>
                    <div className=" padd-lr">
                         <table cellSpacing="50" id="mytable">
                              <tbody>{listproj}</tbody>
                         </table>

                    </div>

               </fieldset>
               </div>
          );
     }
}

export default IssueReportStaff;
