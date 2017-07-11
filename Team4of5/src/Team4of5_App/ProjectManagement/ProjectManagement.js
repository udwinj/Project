import React from 'react';
import Navbar from '../Navbar/Nav.js';
import ProjectManagementTable from './ProjectManagementTable.js';
import './ProjectManagementTables.css';
import * as Users from '../../Team4of5_Service/Users.js';
import { Board } from 'react-trello'
import ReactModal from 'react-modal';
import { forms } from 'pure-css';
import * as ChatProj from '../../Team4of5_Service/ChatProject.js';




//Connect Firebase
import * as firebase from 'firebase';
import * as Config from '../../Team4of5_Service/Config.js';
import * as Issues from '../../Team4of5_Service/Issues.js';




const true_data = {
    lanes: [
        {
            id: 'Backlog',
            title: 'Backlog',
            label: '2/2',
            cards: [{
                id: 'Card1', title: 'Card1', description: 'As an administrator, I can login, add projects, & manage other users.',
                tags: [{ title: 'Login and User Roles', color: 'white', bgcolor: 'green' }]
            },
            { id: 'Card2', title: 'Card2', description: 'As a user, I can set myself as away to snooze notifications related to chat.', tags: [{ title: 'Chat', color: 'black', bgcolor: 'yellow' }] }]
        },
        {
            id: 'Next',
            title: 'Next (Ready for Development)',
            label: '0/0',
            cards: [{
                id: 'Card1', title: 'Card1', description: 'As an administrator, I can login, add projects, & manage other users.',
                tags: [{ title: 'Login and User Roles', color: 'white', bgcolor: 'green' }]
            },
            { id: 'Card2', title: 'Card2', description: 'As a user, I can set myself as away to snooze notifications related to chat.', tags: [{ title: 'Chat', color: 'black', bgcolor: 'yellow' }] }]
        },
        {
            id: 'InProgress',
            title: 'In Progress',
            label: '0/0',
            cards: [{
                id: 'Card1', title: 'Card1', description: 'As an administrator, I can login, add projects, & manage other users.',
                tags: [{ title: 'Login and User Roles', color: 'white', bgcolor: 'green' }]
            },
            { id: 'Card2', title: 'Card2', description: 'As a user, I can set myself as away to snooze notifications related to chat.', tags: [{ title: 'Chat', color: 'black', bgcolor: 'yellow' }] }]
        },
        {
            id: 'Staged',
            title: 'Staged',
            label: '0/0',
            cards: [{
                id: 'Card1', title: 'Card1', description: 'As an administrator, I can login, add projects, & manage other users.',
                tags: [{ title: 'Login and User Roles', color: 'white', bgcolor: 'green' }]
            },
            { id: 'Card2', title: 'Card2', description: 'As a user, I can set myself as away to snooze notifications related to chat.', tags: [{ title: 'Chat', color: 'black', bgcolor: 'yellow' }] }]
        },
        {
            id: 'QA',
            title: 'QAed',
            label: '0/0',
            cards: [{
                id: 'Card1', title: 'Card1', description: 'As an administrator, I can login, add projects, & manage other users.',
                tags: [{ title: 'Login and User Roles', color: 'white', bgcolor: 'green' }]
            },
            { id: 'Card2', title: 'Card2', description: 'As a user, I can set myself as away to snooze notifications related to chat.', tags: [{ title: 'Chat', color: 'black', bgcolor: 'yellow' }] }]
        },
        {
            id: 'Live',
            title: 'Live',
            label: '0/0',
            cards: [{
                id: 'Card1', title: 'Card1', description: 'As an administrator, I can login, add projects, & manage other users.',
                tags: [{ title: 'Login and User Roles', color: 'white', bgcolor: 'green' }]
            },
            { id: 'Card2', title: 'Card2', description: 'As a user, I can set myself as away to snooze notifications related to chat.', tags: [{ title: 'Chat', color: 'black', bgcolor: 'yellow' }] }]
        }
    ]
}

var mydata = {
    lanes: [
        {
            id: 'Backlog',
            title: 'Backlog',
            label: '2/2',
            cards: []
        },
        {
            id: 'Next',
            title: 'Next (Ready for Development)',
            label: '0/0',
            cards: []
        },
        {
            id: 'InProgress',
            title: 'In Progress',
            label: '0/0',
            cards: []
        },
        {
            id: 'Staged',
            title: 'Staged',
            label: '0/0',
            cards: []
        },
        {
            id: 'QA',
            title: 'QAed',
            label: '0/0',
            cards: []
        },
        {
            id: 'Live',
            title: 'Live',
            label: '0/0',
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

const completeMilkEvent = () => {
    eventBus.publish({ type: 'ADD_CARD', laneId: 'COMPLETED', card: { id: "Milk", title: "Buy Milk", label: "15 mins", description: "Use Headspace app" } })
    eventBus.publish({ type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: "Milk" })
}

const addCard = (laneID, id, title, description) => {
    ChatProj.addNewCard(laneID, id, title, description)
    eventBus.publish({ type: 'ADD_CARD', laneId: laneID, card: { id: id, title: title, label: "30 mins", description: description } });
}

const renderCard = (laneID, id, title, description) => {
    eventBus.publish({ type: 'ADD_CARD', laneId: laneID, card: { id: id, title: title, label: "30 mins", description: description } });
}



const handleDragStart = (cardId, laneId) => {
    console.log('drag started')
    console.log(`cardId: ${cardId}`)
    console.log(`laneId: ${laneId}`)
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
}

const shouldReceiveNewData = (nextData) => {
    console.log('data has changed')
    console.log(nextData)
    console.log(mydata)
}








class GetCardInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            label: '',
            assignment: '',
            stage: 'Backlog'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSaveModal(this.state.stage, "5", "title", this.state.description);
    }

    render() {
        return (
            <div className="warning">

                <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <div className="pure-control-group">
                            <label htmlfor="descrip">Description:</label>
                            <textarea id="descrip" name="description" rows="5" cols="50" placeholder="Description" onChange={this.handleChange}>

                            </textarea>
                        </div>
                        <div className="pure-control-group">
                            <label for="label"> Label: </label>
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
                            <label for="assign">Assignment:</label>
                            <select id="assign" name="assignment" onChange={this.handleChange}>
                                <option value="kevin">Kevin</option>
                                <option value="alisa">Alisa</option>
                                <option value="kyle">Kyle</option>
                                <option value="yin">Yin</option>
                                <option value="joel">Joel</option>
                            </select>

                        </div>
                        <div className="pure-control-group">
                            <label for="stage">Stage:</label>
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
                            <input className="pure-button pure-button-primary" type="submit" value="Submit" />
                        </div>

                    </fieldset>
                </form>
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
            projects: "",
            lanes: [],
            projArray: []
        };

        this.getData = this.getData.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSaveModal = this.handleSaveModal.bind(this);

        this.componentDidMount = this.componentDidMount.bind(this);
        //

    }
    //After the connect, what the state will do--gotdata
    componentDidMount() {
        let self = this;

        ChatProj.getProjectData().then(function (data) {

            self.getData(data);
            console.log(self.state.projects);
            mydata.lanes = self.state.lanes;
            console.log("Showing Data here");
            console.log(mydata);
            console.log("Showing True Data here");
            console.log(true_data);

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
        //console.log("key next");
        //console.log(keys);
        // const keys_backlog = Object.keys(projdata[keys].data.Backlog);
        //console.log("key_backlog next");
        //console.log(keys);

        projArray.push(projdata[keys].data.lanes);

        //console.log("Next count:");
        //console.log(projArray[0].count);
        console.log("Next stuff:");
        console.log(projArray[0]);

        this.state.lanes = projArray[0];
        console.log("Next lanes");
        console.log(this.state.lanes);
        console.log("Next my card");
        console.log(this.state.lanes[1].cards[0].id);
        console.log("Length Next");
        console.log(this.state.lanes.length);

        for (let i = 0; i < this.state.lanes.length; i++) {
            for (let j = 0; j < this.state.lanes[i].cards.length; j++) {
                renderCard(this.state.lanes[i].id, this.state.lanes[i].cards[j].id, this.state.lanes[i].cards[j].title, this.state.lanes[i].cards[j].description);
            }
        }

        // var count = projArray[0].count;
        // for (let i = 0; i < count; i++) {
        //     let curCard = "_" + i;
        //     console.log("Next stuff:");
        //     console.log(projArray[0].curCard);
        //     this.state.cards.push(projArray[0]._1);
        // }

        //this.state.cards.push(projArray[0]._1)
        this.setState({ projects: projArray });
        mydata.lanes = this.state.lanes;

        //{ id: 'Card2', title: 'Card2', description: 'descrip.', tags: [{ title: 'Chat', color: 'black', bgcolor: 'yellow' }] }

        //var count = projArray.count;
        //console.log("Next count:");
        //console.log(projArray[0].curCard);
        //console.log(projArray.count);
        //for (let i = 0; i < count; i++) {
        //    let curCard = "_" + i;
        //    console.log("Next stuff:");
        //    console.log(projArray[0].curCard);
        //    this.state.cards.push(projArray[0].curCard);
        //}
        //this.state.cards.push(projArray[0].Card1)
        //this.setState({ projects: projArray });


    }


    errData = (err) => {
        console.log(err);
    }


    handleOpenModal(cardId) {
        this.setState({ showModal: true });
        this.setState({ modalID: cardId });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleSaveModal(laneId, id, title, description) {
        addCard(laneId, id, title, description);
        this.setState({ showModal: false });
    }

    //<button onClick={completeMilkEvent} style={{ margin: 5 }}>Complete Buy Milk</button>
    render() {
        return (
            <div>
                <div style={div_style}>
                    <button onClick={() => { this.handleOpenModal(0) }} style={{ margin: 5 }}>Add New Card</button>
                </div>
                <Board
                    data={mydata}
                    draggable={true}
                    onDataChange={shouldReceiveNewData}
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                    tagStyle={{ fontSize: '80%' }}
                    onCardClick={(cardId, title, metadata) => this.handleOpenModal(cardId)}
                    eventBusHandle={setEventBus}
                />
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                    className="Modal"
                    overlayClassName="Overlay"
                >
                    <GetCardInfo warn={this.state.modalID} handleSaveModal={this.handleSaveModal} />
                    <button className="pure-button pure-button-primary" onClick={this.handleCloseModal}>Cancel</button>
                </ReactModal>
            </div>);
    }
}

//this.handleToggleClick()

export default ProjectManagement;
