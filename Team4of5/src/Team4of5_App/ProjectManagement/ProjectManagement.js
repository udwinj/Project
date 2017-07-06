import React from 'react';
import Navbar from '../Navbar/Nav.js';
import ProjectManagementTable from './ProjectManagementTable.js';
import './ProjectManagementTables.css';
import * as Users from '../../Team4of5_Service/Users.js';
import { Board } from 'react-trello'
import ReactModal from 'react-modal';






const data = {
    lanes: [
        {
            id: 'lane1',
            title: 'Backlog',
            label: '2/2',
            cards: [{
                id: 'Card1', title: 'Card1', description: 'As an administrator, I can login, add projects, & manage other users.',
                tags: [{ title: 'Login and User Roles', color: 'white', bgcolor: 'green' }]
            },
            { id: 'Card2', title: 'Card2', description: 'As a user, I can set myself as away to snooze notifications related to chat.', tags: [{ title: 'Chat', color: 'black', bgcolor: 'yellow' }] }]
        },
        {
            id: 'lane2',
            title: 'Next (Ready for Development)',
            label: '0/0',
            cards: []
        },
        {
            id: 'lane3',
            title: 'Next (Ready for Development)',
            label: '0/0',
            cards: []
        },
        {
            id: 'lane4',
            title: 'Staged',
            label: '0/0',
            cards: []
        },
        {
            id: 'lane5',
            title: 'QAed',
            label: '0/0',
            cards: []
        },
        {
            id: 'lane6',
            title: 'Live',
            label: '0/0',
            cards: []
        }
    ]
}


let eventBus = undefined

let setEventBus = (handle) => {
    eventBus = handle
}

const completeMilkEvent = () => {
    eventBus.publish({ type: 'ADD_CARD', laneId: 'COMPLETED', card: { id: "Milk", title: "Buy Milk", label: "15 mins", description: "Use Headspace app" } })
    eventBus.publish({ type: 'REMOVE_CARD', laneId: 'PLANNED', cardId: "Milk" })
}

const addBlockedEvent = () => {
    eventBus.publish({ type: 'ADD_CARD', laneId: 'lane4', card: { id: "Ec2Error", title: "EC2 Instance Down", label: "30 mins", description: "Main EC2 instance down" } })
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

function GetCardInfo(props) {

    return (
        <div className="warning">
            This Card is {props.warn}
            <form>
                <div>
                <label>
                    Description:<input type="text" />
                </label>
                </div>
                <div> 
                <label>
                    Label:<input type="text" />
                </label>
                </div>
                <div>
                <label>
                    Assignment:<input type="text" />
                </label>
                </div>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}
function MakeNewCard(props) {

    return (
        <div className="warning">
            This Card is {props.warn}
        </div>
    );
}

class ProjectManagement extends React.Component {

    constructor() {
        super();
        this.state = {
            showModal: false,
            modalID: null
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal(cardId) {
        console.log(cardId);
        this.setState({ showModal: true });
        this.setState({ modalID: cardId });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <div>
                <button onClick={completeMilkEvent} style={{ margin: 5 }}>Complete Buy Milk</button>
                <button onClick={() => { this.handleOpenModal(0) }} style={{ margin: 5 }}>Add Blocked</button>
                <Board
                    data={data}
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
                    <GetCardInfo warn={this.state.modalID} />
                    <button onClick={this.handleCloseModal}>Save</button>
                    <button onClick={this.handleCloseModal}>Cancel</button>
                </ReactModal>
            </div>);
    }
}

//this.handleToggleClick()

export default ProjectManagement;
