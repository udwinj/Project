import React from 'react';
import ReactDOM from 'react-dom';
import * as ChatProj from '../../Team4of5_Service/ChatProject.js';
import * as Users from '../../Team4of5_Service/Users.js';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from 'react-router-dom';

class ProjectSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projdata: [],
            thisUser: '',
            projectList: []
        };

        this.getData = this.getData.bind(this);
    }
    componentDidMount() {
        
        let self = this;
        this.state.thisUser = Users.getCurrentUser().uid;

        ChatProj.getProjects().then(function (data) {

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
        var listProjArray = []
        projArray.push({ name: 'Project Name', id: '0' })
        for (var i = 0; i < keys.length; i++) {
            var members = []
            var projname = ''
            var user_in_proj = false
            const k = keys[i];

            projname = projdata[k].name

            for (var x = 0; x < projdata[k].members.length; x++) {
                if (projdata[k].members[x] == this.state.thisUser) {
                    user_in_proj = true
                }
            }

            if (user_in_proj == true) {
                projArray.push({ name: projname, id: k });
                projdata[k].key = k;
                listProjArray.push(projdata[k]);
            }

        }
        this.setState({ projdata: projArray });
        this.setState({ projectList: listProjArray });
        console.log("ProjectData");
        console.log(keys);
        //this.displayedCards(this.state.projectList[0])


    }


    render() {
        // let listproj = this.state.projdata.map(p => {
        //     return (
        //         <tr className="grey2" key={p.id}>
        //             {Object.keys(p).filter(k => k !== 'id').map(k => {
        //                 return (<td className="grey1" key={p.id + '' + k}><div suppressContentEditableWarning="true" contentEditable="false"
        //                     value={k} >{p[k]}</div></td>);
        //             })}
        //         </tr>
        //     );
        // });
        return (
            // <fieldset className="step-4">
            //     <h2> My Projects </h2>
            //     <div className="heading">
            //     </div>
            //     <div className=" padd-lr">
            //         <table width="500" cellSpacing="50" id="mytable">
            //             <tbody>{listproj}</tbody>
            //         </table>

            //     </div>

            // </fieldset>

            <div>
                <ul className="projectList">
                    {this.state.projectList.map(item => <li className="projects" onClick={() => { /*this.displayedCards(item);*/ console.log(item); console.log("MY ITEMS") }}>
                        <Link to={{
                            pathname: '/menu/ProjectManagement',
                            state: { startingProject: item }
                        }}>
                        {item.name}
                        {console.log("info")}
                        {console.log(item)}
                        </Link>

                    </li>)}
                </ul>
            </div>


        );
    }
}

export default ProjectSummary;
