import React, {Component} from 'react';
import './IssueTracker.css';
import * as User from '../../Team4of5_Service/Users.js';

class IssueReportStaff extends React.Component {
     constructor(props){
          super(props);
     this.state = {
      reportIssue: [],  
          data: [
              {'id':1,1:'Bug Owner',2:'New',3:'Open',4:'Assigned',5:'Fixed',6:'Verified',7:'Closed'},
              {
                   id: 2,
                   staffName: "Admin",
                   new: 20,
                   open: 11,
                   assigned: 12,
                   fixed: 22,
                   verified: 17,
                   closed:11,
                 },
                 {
                     id: 3,
                     staffName: "Jim",
                     new: 11,
                     open: 12,
                     assigned: 21,
                     fixed: 31,
                     verified: 10,
                     closed:11,
                 },
                 {
                     id: 4,
                     staffName: "Bill",
                     new: 20,
                     open: 11,
                     assigned: 12,
                     fixed: 22,
                     verified: 19,
                     closed:11,
                 },
                 {
                     id: 5,
                     staffName: "Clarie",
                     new: 20,
                     open: 11,
                     assigned: 12,
                     fixed: 22,
                     verified: 21,
                     closed:11,
                 },
                 {
                     id: 6,
                     staffName: "Kara",
                     new: 20,
                     open: 11,
                     assigned: 12,
                     fixed: 22,
                     verified: 19,
                     closed:11,
                 }
     ],
     errorInput:''
     };
      this.staffIssueForm = this.staffIssueForm.bind(this);
      this.appendColumn = this.appendColumn.bind(this);
      this.getData = this.getData.bind(this);
}

 componentDidMount() {
          let self = this;

          User.getAllUserData().then(function (data) {
                //Update UI, 
                // const userdata = data.val();
                // console.log("get data");
                // console.log(userdata);
                // //  getData(data).bind(this);

                // let newUser = [];
                // newUser.push(userdata.display_name);
                // self.setState({ userInfo: newUser });
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

        var userArray = [];
        var x = 0;

        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          var owner = issuedata[k].owner
          var status = issuedata[k].status
          var exists = 0
          var new_cnt = 0

        for (var m = 0; m < userArray.length; m++) {
          var datum = userArray[m];
          if (datum.key == owner && datum.value == status) {
            exists = 1;
            new_cnt = datum.cnt + 1;
            userArray[m].cnt = new_cnt;
          } //if
        } // for 
        if (exists == 0) {
          userArray.push({ key: owner, value: status, cnt: 1 });
        } //if
      }

        for (var i = 0; i < userArray.length; i++) {
            var datum = userArray[i];
            //alert([datum.key, datum.value, datum.cnt])
        } //for 
        this.setState({reportIssue: userArray});

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
          return (
               <fieldset className="step-4">
                    <div className="heading">
                         <h3>Issue Count per Staff</h3>
                    </div>
                    <div className=" padd-lr">
                         <table cellSpacing="50" id="mytable">
                              <tbody>{list}</tbody>
                         </table>

                    </div>

               </fieldset>
          );
     }
}

export default IssueReportStaff;
