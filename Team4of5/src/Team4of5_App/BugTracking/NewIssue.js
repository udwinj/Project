import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from '../../registerServiceWorker.js';
import Navbar from '../Navbar/Nav.js';
import IssueTrackerNav from './IssueTrackerNav.js';

//Connect Firebase
import * as Config from '../../Team4of5_Service/Config.js';
import * as Issues from '../../Team4of5_Service/Issues.js';
import { forms } from 'pure-css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

//import css
import './IssueTracker.css'

class NewIssue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            formBtnTxt: 'Add Issue',
            redirectToIssue: false,
            };
        this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
       //connect with firebase
    }

    handleChange(name, event) {
      let items = this.state;
      items[name] = event.target.value;
      this.setState(items);
    }

 handleSubmit(event) {
     if (this.state.details&&this.state.expComDate
         &&this.state.owner
         &&this.state.project&&this.state.status
         &&this.state.type&&this.state.priority&&this.state.severity)
     {
      if(!this.state.completionDate){
        this.state.completionDate = 'null'
      }

             Issues.addNewIssue(
                  this.state.completionDate,
                  this.state.details,
                  this.state.expComDate,
                  this.state.owner,
                  this.state.project,
                  this.state.status,
                  this.state.type,
                  this.state.priority,
                  this.state.severity)
                  .then((Issue)=>{
                      console.log(Issue);
                     this.setState({redirectToIssue: true});
                  })
      }
          else {
            alert("Please fill all fields except the completion date");
          }


  event.preventDefault();
}

 render() {
     const { from } = this.props.location.state ||{ from: { pathname: '/menu/BugTracking' }}
     const { redirectToIssue } = this.state

     if (redirectToIssue) {
           return (
            <Redirect to={from}/>
           )
         }
    return (
        <div>
        <IssueTrackerNav />

        <div className='createIssue'>
      <form className='pure-form pure-form-aligned' onSubmit={this.handleSubmit}>
          <div className="pure-controls">
              <h1>Create New Issue</h1>
              <p>Please enter issue information</p>
          </div>
        <fieldset>

        <div className="pure-control-group">
            <label>
              Owner
              </label>
              <input type="text" value={this.state.owner} placeholder='The email of the issue owner' onChange={this.handleChange.bind(this, 'owner')} />

        </div>
        <div className="pure-control-group">
            <label>
              Expected days to complete
                  </label>
              <input type="text" value={this.state.expComDate} placeholder='Estimated days to solve issue' onChange={this.handleChange.bind(this, 'expComDate')} />

        </div>
        <div className="pure-control-group">
            <label>
              Details
              </label>
              <input type="text" value={this.state.details} placeholder='Issue details' onChange={this.handleChange.bind(this, 'details')} />

        </div>

    <section>
        <div >
        <label>
        Status
        <select value={this.state.status} onChange={this.handleChange.bind(this, 'status')}>
            <option value=""></option>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="Verified">Verified</option>
            <option value="Closed">Closed</option>
          </select>
  </label>
        </div>
        <div >
        <label>
        Type
        <select value={this.state.type} onChange={this.handleChange.bind(this, 'type')}>
            <option value=""></option>
            <option value="Blocker">Blocker</option>
            <option value="Critical">Critical</option>
            <option value="Major">Major</option>
            <option value="Minor">Minor</option>
            <option value="Trivial">Trivial</option>
          </select>
          </label>
        </div>
        <div >
        <label>
        Priority
        <select value={this.state.priority} onChange={this.handleChange.bind(this, 'priority')}>
            <option value=""></option>
            <option value="Immediate">Immediate</option>
            <option value="High">Hight</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="Verified">Verified</option>
            <option value="Fix if time">Fix if time</option>
          </select>

        </label>
        </div>

        <div >
        <label>
        Severity
        <select value={this.state.severity} onChange={this.handleChange.bind(this, 'severity')}>
            <option value=""></option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="None">None</option>
          </select>
         </label>
        </div>
    </section>
    <div className="pure-control-group">
        <label>
          Actual completion date
        </label>
          <input type="date" value={this.state.completionDate} onChange={this.handleChange.bind(this, 'completionDate')} />

    </div>
    <div className="pure-control-group">
        <label>
          Project
          </label>
          <input type="text" value={this.state.project} placeholder='Enter project ID associated with this issue'  onChange={this.handleChange.bind(this, 'project')} />

    </div>

        <input type="submit" id="submitBtn" value={this.state.formBtnTxt} />
</fieldset>
      </form>
      </div>
      </div>
    );
  }

}
export default NewIssue;
