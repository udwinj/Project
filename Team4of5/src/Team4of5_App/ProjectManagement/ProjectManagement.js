import React from 'react';
import Navbar from '../Navbar/Nav.js';
import ProjectManagementTable from './ProjectManagementTable.js';
import './ProjectManagementTables.css';
import * as Users from '../../Team4of5_Service/Users.js';
import { Board } from 'react-trello'


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



//onDataChange={} handleDragStart={} handleDragEnd={handleDragEnd()}

class ProjectManagement extends React.Component {





    render() {
        return <Board
            data={data}
            draggable={true}
            onDataChange={shouldReceiveNewData}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            tagStyle={{ fontSize: '80%' }}
        />
    }
}

export default ProjectManagement;
