import React from 'react';
import ReactDOM from 'react-dom';
import Bug from '/Users/kylemiao/Documents/GitHub/team4of5/Team4of5/src/Team4of5_App/BugTracking/BugTracking.js';
import Chat from '/Users/kylemiao/Documents/GitHub/team4of5/Team4of5/src/Team4of5_App/Chat/Chat.js';
import Project from '/Users/kylemiao/Documents/GitHub/team4of5/Team4of5/src/Team4of5_App/ProjectManagement/ProjectManagement.js';
import Setting from '/Users/kylemiao/Documents/GitHub/team4of5/Team4of5/src/Team4of5_App/Setting/Setting.js';


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

            case 'Bug':
                state['directDest'] = 'Bug';
                break;
            case 'Chat':
                state['directDest'] = 'Chat';
                break;
            case 'Project':
                state['directDest'] = 'Project';
                break;
            case 'Setting':
                state['directDest'] = 'Setting';
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
                        <Route path='/Menu/Bug' component={Bug} />
                        <Route path='/Menu/Chat' component={Chat} />
                        <Route path='/Menu/Project' component={Project} />
                        <Route path='/Menu/Setting' component={Setting} />
                        <Redirect from={this.basePath} to={Dest} />
                    </Switch>
                </Router>

            )
        }

        return (

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
                        value={'Setting'}
                        onClick={this.GoTo.bind(this, 'Setting')} >
                    </input>
                </div>

            </form>
        )
    }
}


export default Menu;