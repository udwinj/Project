import React from 'react';
import ReactDOM from 'react-dom';

//Connect Firebase
import * as Config from '../../Team4of5_Service/Config.js';
import * as Issues from '../../Team4of5_Service/Issues.js';
import { forms } from 'pure-css';

//import css
import './IssueTracker.css'

class IssueUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            formBtnTxt: 'Update Issue',
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
     if (this.state.completionDate||this.state.status||this.state.priority||this.state.severity)
     {
             Issues.issueUpdate(
                  this.state.issue_id, this.state.completionDate,this.state.status,this.state.priority,this.state.severity)
                  .then((Issue)=>{
                      console.log(Issue);
                  })
      }
      this.state.priority = '';
      this.state.severity = '';
      this.state.completionDate = '';
      this.state.status = '';
      this.state.issue_id = '';

  event.preventDefault();
}

 render() {
        return (
    <div className="wrap">

      <form className='pure-form pure-form-stacked' onSubmit={this.handleSubmit}>
<fieldset>
        <div className='pure-g'>
            <div id='issueID' className="pure-u-1 pure-u-md-1-3">
                <label>
                  ID
                  </label>
                  <input type="text" value={this.state.issue_id} placeholder='enter ID' onChange={this.handleChange.bind(this, 'issue_id')} required/>

            </div>

        <div className="pure-u-1 pure-u-md-1-3">
        <label>
        Status
         </label>

        <select value={this.state.status} onChange={this.handleChange.bind(this, 'status')}>
            <option value=""></option>
            <option value="New">New</option>
            <option value="Open">Open</option>
            <option value="Assigned">Assigned</option>
            <option value="Verified">Verified</option>
            <option value="Closed">Closed</option>
          </select>

        </div>
        <div className="pure-u-1 pure-u-md-1-3">
        <label>
        Priority
         </label>

        <select value={this.state.priority} onChange={this.handleChange.bind(this, 'priority')}>
            <option value=""></option>
            <option value="Immediate">Immediate</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="Verified">Verified</option>
            <option value="Fix if time">Fix if time</option>
          </select>

        </div>
        <div className="pure-u-1 pure-u-md-1-3">
        <label>
        Severity
          </label>
        <select value={this.state.severity} onChange={this.handleChange.bind(this, 'severity')}>
            <option value=""></option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="None">None</option>
          </select>

        </div>
        <div className="pure-u-1 pure-u-md-1-3">
            <label>
              Actual completion date
              </label>

              <input type="date" value={this.state.completionDate} onChange={this.handleChange.bind(this, 'completionDate')} />

        </div>

</div>
        <input type="submit" id="updateBtn" className='button-secondary pure-button'value={this.state.formBtnTxt} />
</fieldset>
      </form>
      </div>
    );
  }

}
export default IssueUpdate;
