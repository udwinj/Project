import React from 'react';
import ReactDOM from 'react-dom';
import BugTracking from './BugTracking/BugTracking.js';
import Chat from './Chat/Chat.js';
import ProjectManagement from './ProjectManagement/ProjectManagement.js';
import Settings from './Settings/Settings.js';
import Navbar from './Navbar/Nav.js';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from 'react-router-dom';
import PropTypes from "prop-types";

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.basePath = '/Menu/',
            this.state = {
                directDest: '',
                redirect: false
            };
        this.props.hi
    }

    componentDidMount() {
        console.log("2222");
    }

    GoTo(index, event) {
        let state = this.state;
        state['redirect'] = true;
        switch (index) {

            case 'BugTracking':
                state['directDest'] = 'BugTracking';
                break;
            case 'Chat':
                state['directDest'] = 'Chat';
                break;
            case 'ProjectManagement':
                state['directDest'] = 'ProjectManagement';
                break;
            case 'Settings':
                state['directDest'] = 'Settings';
        }
        this.setState(state);
    }

    render() {
        window.addEventListener("hashchange", function(e) {
  console.log("55555555555");
})

        if (this.state.redirect) {
            let Dest = this.basePath + this.state.directDest;
            console.log("Hellllooooo!!!" + Dest);
            this.state.directDest = false;
            return (
                <Router>
                    <Switch>
                        <Route path='/Menu/BugTracking' component={BugTracking} />
                        <Route path='/Menu/Chat' component={Chat} />
                        <Route path='/Menu/ProjectManagement' component={ProjectManagement} />
                        <Route path='/Menu/Settings' component={Settings} />
                        <Redirect from={this.basePath} to={Dest} />
                    </Switch>
                </Router>

            )
        }

        return (
          <div>
            <Navbar />

            <form onSubmit={this.handleSubmit}>

                <div>
                    <input type="button"
                        value={'Bug Tracking'}
                        onClick={this.GoTo.bind(this, 'Bug')} >
                    </input>

                    <input type="button"
                        value={'Chat'}
                        onClick={this.GoTo.bind(this, 'Chat')} >
                    </input>
                </div>
                <div>

                    <input type="button"
                        value={'Project Management'}
                        onClick={this.GoTo.bind(this, 'Project')} >
                    </input>

                    <input type="button"
                        value={'Settings'}
                        onClick={this.GoTo.bind(this, 'Settings')} >
                    </input>
                </div>
            </form>
            </div>
        )

    }
}


export default Menu;
