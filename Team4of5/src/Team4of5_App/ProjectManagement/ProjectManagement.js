import React from 'react';
import Navbar from '../Navbar/Nav.js';
import ProjectManagementTable from './ProjectManagementTable.js';
import './ProjectManagementTables.css';
import * as Users from '../../Team4of5_Service/Users.js';
import { Board } from 'react-trello'
import ReactModal from 'react-modal';
import { forms } from 'pure-css';
import * as ChatProj from '../../Team4of5_Service/ChatProject.js';
import * as Tools from '../Tools.js';




//Connect Firebase
import * as firebase from 'firebase';
import * as Config from '../../Team4of5_Service/Config.js';
import * as Issues from '../../Team4of5_Service/Issues.js';

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

const completeMilkEvent = () => {
    eventBus.publish({ type: 'ADD_CARD', laneId: 'COMPLETED', card: { id: "Milk", title: "Buy Milk", label: "15 mins", description: "Use Headspace app" } })
    eventBus.publish({ type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: "Milk" })
}

const addCard = (laneID, id, title, description) => {
    ChatProj.addNewCard(laneID, id, title, description);
    eventBus.publish({ type: 'ADD_CARD', laneId: laneID, card: { id: id, title: "", label: title, description: description } });
}

const renderCard = (laneID, id, title, description) => {
    eventBus.publish({ type: 'ADD_CARD', laneId: laneID, card: { id: id, title: "", label: title, description: description } });
}

const deleteCard = (laneID, id, title, description) => {
    ChatProj.removeCard(laneID, id);
    eventBus.publish({ type: 'REMOVE_CARD', laneId: laneID, card: { id: id, title: "", label: title, description: description } });
}

const updateLaneCard = (cardId, sourceLaneId, targetLaneId) => {
    ChatProj.updateCard(cardId, sourceLaneId, targetLaneId);
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
    updateLaneCard(cardId, sourceLaneId, targetLaneId);
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
            assignment: 'Kevin',
            stage: 'Backlog'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log("change happening");
        //console.log(laneID);

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.handleSaveModal(this.props.isNew, this.state.stage, this.props.cardID, this.state.assignment, this.state.description);
    }
    handleDelete(e) {
        e.preventDefault();
        this.props.handleDeleteModal(this.state.stage, this.props.cardID, this.state.assignment, this.state.description);
    }

    render() {
        return (
            <div className="warning">

                <form className="pure-form pure-form-aligned" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <div className="pure-control-group">
                            <label htmlFor="descrip">Description:</label>
                            <textarea id="descrip" name="description" rows="5" cols="50" placeholder="Description" onChange={this.handleChange}>

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
                            <select id="assign" name="assignment" onChange={this.handleChange}>
                                <option value="Kevin">Kevin</option>
                                <option value="Alisa">Alisa</option>
                                <option value="Kyle">Kyle</option>
                                <option value="Yin">Yin</option>
                                <option value="Joel">Joel</option>
                            </select>

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
                            <input className="pure-button pure-button-primary" type="submit" value="Submit" />
                            <button className="pure-button pure-button-primary" onClick={this.handleDelete}>Delete</button>
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
            isNew: false,
            projects: "",
            lanes: [],
            projArray: []
        };

        this.getData = this.getData.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.handleSaveModal = this.handleSaveModal.bind(this);
        this.handleDeleteModal = this.handleDeleteModal.bind(this);
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

        projArray.push(projdata[keys[0]].data.lanes);

        //console.log("Next count:");
        //console.log(projArray[0].count);

        this.state.lanes = projArray[0];

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


    handleOpenModal(cardId, isNewCard) {
        this.setState({ showModal: true });
        this.setState({ modalID: cardId });
        this.setState({ isNew: isNewCard });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    handleSaveModal(isNew, laneId, id, title, description) {
        if (isNew) {
            var newId = Tools.guid();
            addCard(laneId, newId, title, description);
        }
        else {
            deleteCard(laneId, id, title, description);
            addCard(laneId, id, title, description);
        }

        this.setState({ showModal: false });
    }


    handleDeleteModal(laneId, id, title, description) {
        deleteCard(laneId, id, title, description)
        this.setState({ showModal: false });
    }

    //<button onClick={completeMilkEvent} style={{ margin: 5 }}>Complete Buy Milk</button>
    render() {
        return (
            <div>
                <div style={div_style}>
                    <button onClick={() => { this.handleOpenModal(null, true) }} style={{ margin: 5 }}>Add New Card</button>
                </div>
                <Board
                    data={mydata}
                    draggable={true}
                    onDataChange={shouldReceiveNewData}
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                    tagStyle={{ fontSize: '80%' }}
                    onCardClick={(cardId, title, metadata) => this.handleOpenModal(cardId, false)}
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
                        isNew={this.state.isNew}
                        handleSaveModal={this.handleSaveModal}
                        handleDeleteModal={this.handleDeleteModal}
                    />
                    <button className="pure-button pure-button-primary" onClick={this.handleCloseModal}>Cancel</button>
                </ReactModal>
            </div>);
    }
}

//this.handleToggleClick()

export default ProjectManagement;
