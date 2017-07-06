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

function WarningBanner(props) {

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
        this.setState({modalID: cardId});
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <div>
                <Board
                    data={data}
                    draggable={true}
                    onDataChange={shouldReceiveNewData}
                    handleDragStart={handleDragStart}
                    handleDragEnd={handleDragEnd}
                    tagStyle={{ fontSize: '80%' }}
                    onCardClick={(cardId,title, metadata) => this.handleOpenModal(cardId)}
                />
                <ReactModal
                    isOpen={this.state.showModal}
                    contentLabel="Minimal Modal Example"
                >
                    <WarningBanner warn={this.state.modalID} />
                    <button onClick={this.handleCloseModal}>Close</button>
                </ReactModal>
            </div>);
    }
}

//this.handleToggleClick()

export default ProjectManagement;
