import React from 'react';
import ReactDOM from 'react-dom';
import * as ChatProj from '../../Team4of5_Service/ChatProject.js';
import * as Users from '../../Team4of5_Service/Users.js';

class ProjectSummary extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            projdata: [],
            thisUser: ''
        };

        this.getData = this.getData.bind(this);
    }
        componentDidMount() {
        let self = this;
        this.state.thisUser = Users.getCurrentUser().email;

        ChatProj.getMyProjects().then(function (data) {

            self.getData(data);

        },
            function (err) {
                //Error occur
                console.log("Promise Error");
                console.log(err);
            }
        );

    }

    getData(data) {
        const projdata = data.val();
        var projArray = []
        const keys = Object.keys(projdata);
        projArray.push({status: 'Project Status', title:'Project Owner',desc:'Project Description', id:'0'})
        for (var i = 0; i< keys.length; i++){
            var xstatus = projdata[i].id
            var projLength = projdata[i].cards.length
            const projKeys = Object.keys(projdata[i].cards)
            for (var x = 0; x<projLength; x++){
                projArray.push({status: xstatus, title: projdata[i].cards[x].title, desc: projdata[i].cards[x].description, id: projdata[i].cards[x].id});
            }
        }
        this.setState({projdata: projArray});


      }
  render() {
              let listproj = this.state.projdata.map(p =>{
               return (
                    <tr className="grey2" key={p.id}>
                         {Object.keys(p).filter(k => k !== 'id').map(k => {
                               return (<td className="grey1" key={p.id+''+k}><div suppressContentEditableWarning="true" contentEditable="false"
                              value={k} >{p[k]}</div></td>);
                         })}
                    </tr>
               );
          });
    return (
                       <fieldset className="step-4">
                       <h2> Projects for {this.state.thisUser} </h2>
                    <div className="heading">
                    </div>
                    <div className=" padd-lr">
                         <table  width="1000" cellSpacing="50" id="mytable">
                              <tbody>{listproj}</tbody>
                         </table>

                    </div>

               </fieldset>


    );
  }
}

export default ProjectSummary;
