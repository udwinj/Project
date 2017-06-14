import React from 'react';
import ReactDOM from 'react-dom';
import BugTracking from './BugTracking/BugTracking.js';
import Chat from './Chat/Chat.js';
import ProjectManagement from './ProjectManagement/ProjectManagement.js';
import Settings from './Settings/Settings.js';
import NavbarHeaderC from './Navbar/Nav.js';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    withRouter
} from 'react-router-dom';
import PropTypes from "prop-types";


const Home = () => (
    <div>
        <h2>Menu</h2>
        <ul>
            <li><button><Link to='/menu/BugTracking'>BugTracking</Link></button></li>
            <li><button><Link to='/menu/Chat'>Chat</Link></button></li>
             <li><button><Link to='/menu/ProjectManagement'>ProjectManagement</Link></button></li>
            <li><button><Link to='/menu/Settings'>Settings</Link></button></li>
        </ul>
    </div>
)

class Menu extends React.Component {
    constructor(props) {
        super(props);
        // this.basePath = '/Menu/',
        //     this.state = {
        //         directDest: '',
        //         redirect: false
        //     };
        // this.props.hi
    }

    previousLocation = this.props.location

    componentWillUpdate(nextProps) {
        const { location } = this.props
        // set previousLocation if props.location is not modal
        if (
            nextProps.history.action !== 'POP' &&
            (!location.state || !location.state.modal)
        ) {
            this.previousLocation = this.props.location
        }
    }
    render() {
        const { location } = this.props
        const isModal = !!(
            location.state &&
            location.state.modal &&
            this.previousLocation !== location // not initial render
        )
        return (
          <div>

              <NavbarHeaderC />
        
            <div>
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route exact path='/menu' component={Home} />
                    <Route path='/menu/BugTracking' component={BugTracking} />
                    <Route path='/menu/Chat' component={Chat} />
                    <Route path='/menu/ProjectManagement' component={ProjectManagement} />
                    <Route path='/menu/Settings' component={Settings} />
                </Switch>
            </div>
            </div>
        )
    }

    // GoTo(index, event) {
    //     let state = this.state;
    //     state['redirect'] = true;
    //     switch (index) {

    //         case 'BugTracking':
    //             state['directDest'] = 'BugTracking';
    //             break;
    //         case 'Chat':
    //             state['directDest'] = 'Chat';
    //             break;
    //         case 'ProjectManagement':
    //             state['directDest'] = 'ProjectManagement';
    //             break;
    //         case 'Settings':
    //             state['directDest'] = 'Settings';
    //     }
    //     this.setState(state);
    // }

    /*render() {
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

    }*/
}


export default Menu;
