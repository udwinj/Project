import React from 'react';
import Navbar from '../Navbar/Nav.js';
import ProjectManagementTable from './ProjectManagementTable.js';
import './ProjectManagementTables.css';
import * as ChatProj from '../../Team4of5_Service/ChatProject.js';
import { Board } from 'react-trello'
import ReactModal from 'react-modal';
import { forms } from 'pure-css';



class ProjectManagement extends React.Component {
     constructor(props){
          super(props);
     this.state = {
      projects: []
     };

      this.getData = this.getData.bind(this);
}

 componentDidMount() {
          let self = this;

          ChatProj.getProjectData().then(function (data) {

                self.getData(data);
            }, function (err) {
                //Error occur
                console.log("Promise Error");
                console.log(err);
            })

    }


    getData(data) {
        const projdata = data.val();
        var projArray = []
        const keys = Object.keys(projdata);

        projArray.push(projdata[keys].data.Backlog.Card1.description)

        this.setState({projects: projArray});


    
  }

     render(){

          let list = this.state.projects.map(p =>{
               return (          
                    <tr className="grey2" key={p.id}>
                         {Object.keys(p).filter(k => k !== 'id').map(k => {
                               return (<td className="grey1" key={p.id+''+k}><div suppressContentEditableWarning="true" contentEditable="true"
                              value={k} >{p[k]}</div></td>);
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
                      </div>

          );
     }
}

export default ProjectManagement;
