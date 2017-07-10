import React from 'react';
import Navbar from '../Navbar/Nav.js';
import ProjectManagementTable from './ProjectManagementTable.js';
import './ProjectManagementTables.css';
import * as Users from '../../Team4of5_Service/Users.js';
import { Board } from 'react-trello'
import ReactModal from 'react-modal';
import { forms } from 'pure-css';



//Connect Firebase
import * as firebase from 'firebase';
import * as Config from '../../Team4of5_Service/Config.js';
import * as Issues from '../../Team4of5_Service/Issues.js';

const issueData = []



/*var data = {
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
}*/



let eventBus = undefined

let setEventBus = (handle) => {
    eventBus = handle
}

const completeMilkEvent = () => {
    eventBus.publish({ type: 'ADD_CARD', laneId: 'COMPLETED', card: { id: "Milk", title: "Buy Milk", label: "15 mins", description: "Use Headspace app" } })
    eventBus.publish({ type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: "Milk" })
}

const addCard = (laneID, id, title, description) => {
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
        this.props.handleSaveModal(this.state.stage, 5, "title", this.state.description);
    }

    render() {
        return (
            <div className="warning">

                <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <div className="pure-control-group">
                            <label for="descrip">Description:</label>
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





function MakeNewCard(props) {
    addCard;
}

class ProjectManagement extends React.Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
            modalID: null,
            lanes: []
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSaveModal = this.handleSaveModal.bind(this);

        this.issueRef = firebase.database().ref().child('chatProject/0be3f584-33ce-11e2-7b8c-72fe4d59dc4f/data');
        //

    }
    //After the connect, what the state will do--gotdata
    componentDidMount() {
        this.issueRef.on('value', this.getData, this.errData);
    }

    //get the data from the firebase and push them out
    getData = (fire_data) => {
        let newIssue = []
        const issuedata = fire_data.val();
        const keys = Object.keys(issuedata);

        for (let i = 0; i < keys.length; i++) {
            const k = keys[i];

            /*newIssue.push({
                id: k, status: issuedata[k].status,
                issueDate: issuedate_reformat,
                owner: issuedata[k].owner,
                expComDate: issuedata[k].expComDate,
                details: issuedata[k].details,
                completionDate: completionDate_reformat,
                project: issuedata[k].project
            });*/
            newIssue.push({ lanes: issuedata[k] })

        }
        this.setState({lanes: newIssue});

    }


    errData = (err) => {
        console.log(err);
    }


    handleOpenModal(cardId) {
        console.log(cardId);
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

    handleCelsiusChange(temperature) {
        this.setState({ scale: 'c', temperature });
    }

    //<button onClick={completeMilkEvent} style={{ margin: 5 }}>Complete Buy Milk</button>
    render() {
        return (
            <div>

                <button onClick={() => { this.handleOpenModal(0) }} style={{ margin: 5 }}>Add New Card</button>
                <Board
                    data={this.state.lanes}
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
