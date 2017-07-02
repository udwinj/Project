// import React from 'react';
// import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//
// const staffIssueSummary=[
//     {
//       id: 1,
//       staffName: "Admin",
//       new: 20,
//       open: 11,
//       assigned: 12,
//       fixed: 22,
//       verified: 17,
//       closed:11,
//     },
//     {
//         id: 2,
//         staffName: "Jim",
//         new: 11,
//         open: 12,
//         assigned: 21,
//         fixed: 31,
//         verified: 10,
//         closed:11,
//     },
//     {
//         id: 3,
//         staffName: "Bill",
//         new: 20,
//         open: 11,
//         assigned: 12,
//         fixed: 22,
//         verified: 19,
//         closed:11,
//     },
//     {
//         id: 4,
//         staffName: "Clarie",
//         new: 20,
//         open: 11,
//         assigned: 12,
//         fixed: 22,
//         verified: 21,
//         closed:11,
//     },
//     {
//         id: 5,
//         staffName: "Kara",
//         new: 20,
//         open: 11,
//         assigned: 12,
//         fixed: 22,
//         verified: 19,
//         closed:11,
//     },
// ]
//
// class IssueReportStaff extends React.Component {
//   render() {
//     return (
//
//
//       <div>
//           <BootstrapTable
//           data={ staffIssueSummary }
//           exportCSV = {false}
//           striped
//           >
//             <TableHeaderColumn isKey={true} dataField='id' hidden={true} >ID</TableHeaderColumn>
//             <TableHeaderColumn dataField='staffName' width='30'>Staff</TableHeaderColumn>
//             <TableHeaderColumn dataField='new' width='30'>New</TableHeaderColumn>
//             <TableHeaderColumn dataField='open' width='30'>Open</TableHeaderColumn>
//             <TableHeaderColumn dataField='assigned' width='30'>Assigned</TableHeaderColumn>
//             <TableHeaderColumn dataField='fixed' width='30'>Fixed</TableHeaderColumn>
//             <TableHeaderColumn dataField='verified' width='30'>Verified</TableHeaderColumn>
//             <TableHeaderColumn dataField='closed' width='30'>Closed</TableHeaderColumn>
//           </BootstrapTable>
//       </div>
//
//     );
//   }
// }
// export default IssueReportStaff;
import React, {Component} from 'react';
import './IssueTracker.css';

class IssueReportStaff extends React.Component {
     constructor(props){
          super(props);
     this.state = {
          data: [
              {'id':1,1:'staffName',2:'new',3:'open',4:'assigned',5:'fixed',6:'verified',7:'closed'},
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
     //  this.editColumn = this.editColumn.bind(this);
}

     staffIssueForm(id,value){
          console.log(this.props,'issues reports with staff');
            let newArray = this.state.data.slice();
            newArray.push({'id':id,'value':value});
          this.setState({col : newArray});
     }

     // append column to the HTML table
      appendColumn() {
               let obj =  this.state.data.map((p) => {
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
                         <h3>Issue Report Per Staff</h3>
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
