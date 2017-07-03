import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/Nav.js';
import { Grid, Row, Col } from 'react-bootstrap';
import './Chat.css';
import MenuFuncs from './MenuFuncs';
import MenuRecent from './MenuRecent';
import ContentSwitcher from './ContentSwitcher';
import Contact from './Contact';
import ChatRoom from './ChatRoom';
import Add from './Add';
import CreateProject from './CreateProject';
import { Provider } from 'react-redux'
import createStore from '../App_Redux/CreateStores'
import * as Messaging from '../../Team4of5_Service/CloudMessaging.js';

const store = createStore();

class ChatMenu extends React.Component {
    constructor(props) {
        super(props);
        Messaging.requestMsgPermission();
    }

    render() {
        return (
            //gridInstance
            <Grid>
                <Row className="show-grid">
                    <Col xs={1} md={1}><MenuFuncs /></Col>
                </Row>
                <Row className="show-grid">
                    <Col xs={1} md={1}><MenuRecent /></Col>
                </Row>
            </Grid>

        )
    }
}


class Chat extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        
        return (
            <Provider store={store}>
                <Grid>
                    <Row className="show-grid">
                        <Col id='leftMenu' xs={1} md={1}><ChatMenu /></Col>
                        <Col id='rightContent' xs={1} md={1}><ContentSwitcher/></Col>
                    </Row>
                </Grid>
            </Provider>
        )
    }
}

export default Chat;
