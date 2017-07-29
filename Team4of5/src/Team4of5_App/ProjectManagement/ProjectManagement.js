import React from 'react';
import Navbar from '../Navbar/Nav.js';
import ProjectManagementTable from './ProjectManagementTable.js';
import './ProjectManagementTables.css';
import * as Users from '../../Team4of5_Service/Users.js';
//import { Board } from 'react-trello'
import { Board } from './trello-board/index.js';
import ReactModal from 'react-modal';
import { forms } from 'pure-css';
import * as ChatProj from '../../Team4of5_Service/ChatProject.js';
import * as Tools from '../Tools.js';

import { Input } from 'react-bootstrap';

import fetch from 'isomorphic-fetch';
//reference: https://github.com/JedWatson/react-select
import Select from 'react-select';

import {
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
    Button,
    Col
} from 'react-bootstrap';

import './pm_style.css';


//Connect Firebase
import * as firebase from 'firebase';
import * as Config from '../../Team4of5_Service/Config.js';
import * as Issues from '../../Team4of5_Service/Issues.js';

const options = {
    "USA": ["New York", "San Francisco"],
    "Germany": ["Berlin", "Munich"]
}

var mydata = {
    lanes: [
        {
            id: 'Backlog',
            title: 'Backlog',
            label: '',
            cards: []
        },
        {
            id: 'Next',
            title: 'Next (Ready for Development)',
            label: '',
            cards: []
        },
        {
            id: 'InProgress',
            title: 'In Progress',
            label: '',
            cards: []
        },
        {
            id: 'Staged',
            title: 'Staged',
            label: '',
            cards: []
        },
        {
            id: 'QA',
            title: 'QAed',
            label: '',
            cards: []
        },
        {
            id: 'Live',
            title: 'Live',
            label: '',
            cards: []
        }
    ]
}

var div_style = {
    background: '#23719F'
}



let eventBus = undefined

let setEventBus = (handle) => {
    eventBus = handle
}

const addCard = (laneID, id, title, description, project) => {
    //console.log("adding: " + laneID + id + title + description)
    ChatProj.addNewCard(laneID, id, title, description, project);
    eventBus.publish({ type: 'ADD_CARD', laneId: laneID, card: { id: id, title: "", label: title, description: description } });
}

const renderCard = (laneID, id, title, description) => {
    eventBus.publish({ type: 'REMOVE_CARD', laneId: laneID, cardId: id });
    eventBus.publish({ type: 'ADD_CARD', laneId: laneID, card: { id: id, title: "", label: title, description: description } });
}

const deleteCard = (laneID, id, title, description, project) => {
    ChatProj.removeCard(laneID, id, project);
    eventBus.publish({ type: 'REMOVE_CARD', laneId: laneID, cardId: id });
}

const updateLaneCard = (cardId, sourceLaneId, targetLaneId, project) => {
    ChatProj.updateCard(cardId, sourceLaneId, targetLaneId, project);
}

const removeCard = (laneID, id) => {
    eventBus.publish({ type: 'REMOVE_CARD', laneId: laneID, cardId: id });
}



const handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
}



const shouldReceiveNewData = (nextData) => {
    //console.log('data has changed')
    //console.log(nextData)
    //console.log(mydata)
}





class GetCardInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: this.props.description,
            label: this.props.assignment,
            assignment: "Unassigned",
            stage: this.props.lane,
            value: [],
            curUserCompany: this.props.curUserCompany
        };
        //this.props.assignment
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //console.log("change happening");
        //console.log(laneID);

        this.setState({
            [name]: value
        });
        //console.log(this.state.assignment);
    }

    handleSubmit(e) {
        e.preventDefault();
        //console.log("adding: " + laneId + id + title + description)
        // problem is also here, props isn't defined for new card
        //this.state.stage
        this.props.handleSaveModal(this.props.isNew, this.state.stage, this.props.cardID, this.state.assignment, this.state.description);
    }
    handleDelete(e) {
        e.preventDefault();
        //console.log("Removing Here");
        //console.log(lane);
        //console.log(id);
        this.props.handleDeleteModal(this.props.lane, this.props.cardID, this.state.assignment, this.state.description);
    }

    handleOwnerChange(value) {
        console.log("change happening")
        console.log(value)
        this.setState({
            assignment: value.owner,
        });
    }

    getUsers(input) {

        let self = this;
        console.log(self);
        if (!input) {
            console.log('here')
            return Promise.resolve({ options: [] });
        }

        let contactEmails = []
        return fetch('https://team4of5-8d52e.firebaseio.com/users.json?&orderBy=%22email%22&startAt=%22'
            + input + '%22&endAt=%22' + input + '\uf8ff%22')

            .then((response) => response.json())
            .then((json) => {
                for (let key in json) {
                    //console.log(self.state.curUserCompany) self.state.curUserCompany
                    if (json[key].company == self.state.curUserCompany) {
                        contactEmails.push({ owner: json[key].display_name, label: json[key].email })
                    }
                }
                self.setState({ options: contactEmails })
                return {
                    options: contactEmails,
                    complete: true
                };
            });
    }



    render() {
        const AsyncComponent = Select.Async;

        return (
            <div className="warning">

                <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>

                    <fieldset>
                        <div className="pure-control-group">
                            <label htmlFor="descrip">Description:</label>
                            <textarea id="descrip" name="description" rows="5" cols="50" placeholder="Description" onChange={this.handleChange}>
                                {this.state.description}
                            </textarea>
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="label"> Label: </label>
                            <select id="label" name="label" onChange={this.handleChange}>
                                <option value="login">Login & User Roles</option>
                                <option value="chat">Chat</option>
                                <option value="homepage">Homepage</option>
                                <option value="defect">Defect</option>
                                <option value="kanban">Kanban Board</option>
                                <option value="issue">Issue Tracking</option>
                                <option value="multitenant">Multi-Tenant Management</option>
                            </select>
                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="assign">Assignment:</label>
                            {/* <select id="assign" name="assignment" onChange={this.handleChange} >
                                <option value="Unassigned">Unassigned</option>
                                <option value="Kevin">Kevin</option>
                                <option value="Alisa">Alisa</option>
                                <option value="Kyle">Kyle</option>
                                <option value="Yin">Yin</option>
                                <option value="Joel">Joel</option>
                            </select> */}

                            <AsyncComponent
                                multi={false}
                                value={this.state.assignment}
                                onChange={this.handleOwnerChange}
                                //onValueClick={this.gotoUser}
                                //Options={this.state.options}
                                valueKey="value"
                                labelKey="label"
                                loadOptions={this.getUsers}
                                backspaceRemoves={true}
                                id="assign"
                                name="assignment"
                                ignoreCase={false}
                            />

                        </div>
                        <div className="pure-control-group">
                            <label htmlFor="stage">Stage:</label>
                            <select id="stage" name="stage" onChange={this.handleChange}>
                                <option value="Backlog">Backlog</option>
                                <option value="Next">Next</option>
                                <option value="InProgress">In Progress</option>
                                <option value="Staged">Staged</option>
                                <option value="QA">QA</option>
                                <option value="Live">Live</option>
                            </select>
                        </div>
                        <div className="pure-controls">
                            <input className="pure-button pure-button-primary submit pmbutton" type="submit" value="Submit" />
                            <button className="pure-button pure-button-primary delete pmbutton" onClick={this.handleDelete}>Delete</button>
                            <button className="pure-button pure-button-primary cancel pmbutton" onClick={this.props.handleCloseModal}>Cancel</button>
                        </div>

                    </fieldset>
                </form>
            </div>
        );
    }
}




class ProjectTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                {this.props.data[0]}
            </div>
        );
    }
}










class ProjectManagement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            modalID: null,
            modalDescription: null,
            modalAssignment: "Unassigned",
            modalTitle: null,
            modalLabel: null,
            modalLane: "Backlog",
            isNew: false,
            projects: "",
            lanes: [],
            projArray: [],
            projects: [],
            thisUser: '',
            projectList: [],
            curUserCompany: '',
            curProject: '',
            startingProject: undefined

        };

        this.getData = this.getData.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSaveModal = this.handleSaveModal.bind(this);
        this.handleDeleteModal = this.handleDeleteModal.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.displayedCards = this.displayedCards.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.removeAllCards = this.removeAllCards.bind(this);
        //

    }

    handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
        console.log('drag ended')
        console.log(`cardId: ${cardId}`)
        console.log(`sourceLaneId: ${sourceLaneId}`)
        console.log(`targetLaneId: ${targetLaneId}`)
        updateLaneCard(cardId, sourceLaneId, targetLaneId, this.state.curProject);
    }
    //After the connect, what the state will do--gotdata
    componentDidMount() {
        let self = this;
        if (this.props.location.state != undefined) {
            this.state.startingProject = this.props.location.state.startingProject;
        }
        this.state.thisUser = Users.getCurrentUser().uid;

        ChatProj.getProjectData().then(function (data) {

            self.getData(data);
            console.log(self.state.projects);
            mydata.lanes = self.state.lanes;
        },
            function (err) {
                //Error occur
                console.log("Promise Error");
                console.log(err);
            }
        );

        Users.getCurUserCompany().then(function (company) {
            self.setState({ curUserCompany: company.val() })
            console.log("MY COMPANY")
            console.log(self.state.curUserCompany)
        }).catch(function (err) {
            console.log("Error:" + err)
        })



    }


    getData(data) {
        const projdata = data.val();
        var projArray = []
        const keys = Object.keys(projdata);

        //Get list of projects

        var listProjArray = []
        for (var i = 0; i < keys.length; i++) {
            var members = [];
            var projname = '';
            var user_in_proj = false;
            const k = keys[i];

            projname = projdata[k].name

            for (var x = 0; x < projdata[k].members.length; x++) {
                if (projdata[k].members[x] == this.state.thisUser) {
                    user_in_proj = true
                }
            }

            if (user_in_proj == true) {
                //listProjArray.push({ name: projname, id: k });
                projdata[k].key = k;
                listProjArray.push(projdata[k]);
            }

        }
        this.setState({ projectList: listProjArray });
        console.log("ProjectData");
        console.log(keys);
        if (this.state.startingProject != undefined) {
            this.displayedCards(this.state.startingProject);
        }
        else {
            this.displayedCards(this.state.projectList[0])
        }

        /*
        projArray.push(projdata[keys[0]].data.lanes);

        this.state.lanes = projArray[0];

        for (let i = 0; i < this.state.lanes.length; i++) {
            for (let j = 0; j < this.state.lanes[i].cards.length; j++) {
                renderCard(this.state.lanes[i].id, this.state.lanes[i].cards[j].id, this.state.lanes[i].cards[j].title, this.state.lanes[i].cards[j].description);
            }
        }
        this.setState({ projects: projArray });
        mydata.lanes = this.state.lanes;
        */

    }

    displayedCards(project) {
        this.removeAllCards();
        var projArray = [];
        if (project.data != undefined) {
            projArray.push(project.data.lanes);
            this.state.lanes = projArray[0];
            for (let i = 0; i < this.state.lanes.length; i++) {
                if (this.state.lanes[i].cards != undefined) {
                    for (let j = 0; j < this.state.lanes[i].cards.length; j++) {
                        //renderCard(this.state.lanes[i].id, this.state.lanes[i].cards[j].id, this.state.lanes[i].cards[j].title, this.state.lanes[i].cards[j].description);
                        renderCard(this.state.lanes[i].id, this.state.lanes[i].cards[j].id, this.state.lanes[i].cards[j].title, this.state.lanes[i].cards[j].description);

                    }
                }
                else {
                    this.state.lanes[i].cards = [];
                }
            }


        }
        console.log(this.state.projects);
        mydata.lanes = this.state.lanes;
        this.setState({ projects: projArray });
        this.setState({ curProject: project.key });
        console.log(mydata.lanes);
        console.log("HERE");
    }

    removeAllCards() {
        if (this.state.lanes != undefined) {
            for (let i = 0; i < this.state.lanes.length; i++) {
                if (this.state.lanes[i].cards != undefined) {
                    for (let j = 0; j < this.state.lanes[i].cards.length; j++) {
                        removeCard(this.state.lanes[i].id, this.state.lanes[i].cards[j].id);
                    }
                }
            }
        }
    }


    errData = (err) => {
        console.log(err);
    }


    handleOpenModal(card, isNewCard, laneId) {
        this.setState({ showModal: true });
        this.setState({ isNew: isNewCard });
        if (card != null) {

            this.setState({ modalID: card.id });
            this.setState({ modalDescription: card.description });
            this.setState({ modalAssignment: card.label });
            //this.setState({ modal: card.description });
            this.setState({ modalLane: laneId })

        }

    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleSaveModal(isNew, laneId, id, title, description) {
        if (isNew) {
            var newId = Tools.guid();
            addCard(laneId, newId, title, description, this.state.curProject);
        }
        else {
            let myFirstPromise = new Promise((resolve, reject) => {
                // We call resolve(...) when what we were doing made async successful, and reject(...) when it failed.
                // In this example, we use setTimeout(...) to simulate async code. 
                // In reality, you will probably be using something like XHR or an HTML5 API.
                deleteCard(laneId, id, title, description, this.state.curProject);
                setTimeout(function () {
                    resolve(); // Yay! Everything went well!
                }, 250);
            });

            myFirstPromise.then(() => {
                // successMessage is whatever we passed in the resolve(...) function above.
                // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
                //console.log("Yay! ");
                addCard(laneId, id, title, description, this.state.curProject);
            });

            //deleteCard(laneId, id, title, description);
            //addCard(laneId, id, title, description);
        }

        this.setState({ showModal: false });
    }


    handleDeleteModal(laneId, id, title, description) {
        deleteCard(laneId, id, title, description, this.state.curProject)
        this.setState({ showModal: false });
    }

    createSelectItems() {
        return this.state.projects;
    }

    onDropdownSelected(e) {
        console.log("THE VAL", e.target.value);
        //here you will see the current selected value of the select input
    }

    //<button onClick={completeMilkEvent} style={{ margin: 5 }}>Complete Buy Milk</button>
    render() {

        return (

            <div>
                <div style={div_style}>
                    <button className="pure-button pure-button-primary newCard pmbutton" onClick={() => { this.handleOpenModal(null, true, null) }} style={{ margin: 5 }}>Add New Card</button>
                    <div>
                        <ul className="projectList">
                            {this.state.projectList.map(item => <li className="projects" onClick={() => { this.displayedCards(item); console.log(item); console.log("MY ITEMS") }}>
                                {item.name}
                            </li>)}
                        </ul>
                    </div>
                </div>
                <Board
                    data={mydata}
                    draggable={true}
                    onDataChange={shouldReceiveNewData}
                    handleDragStart={handleDragStart}
                    handleDragEnd={this.handleDragEnd}
                    tagStyle={{ fontSize: '80%' }}
                    onCardClick={(card, laneId) => this.handleOpenModal(card, false, laneId)}
                    eventBusHandle={setEventBus}
                />
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <GetCardInfo
                        cardID={this.state.modalID}
                        description={this.state.modalDescription}
                        assignment={this.state.modalAssignment}
                        title={this.state.modalTitle}
                        label={this.state.modalLabel}
                        lane={this.state.modalLane}
                        isNew={this.state.isNew}
                        handleSaveModal={this.handleSaveModal}
                        handleDeleteModal={this.handleDeleteModal}
                        curUserCompany={this.state.curUserCompany}
                        handleCloseModal={this.handleCloseModal}
                    />

                </ReactModal>
            </div>);
    }
}

//this.handleToggleClick()

export default ProjectManagement;
