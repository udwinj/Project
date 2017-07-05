import React from 'react';
import ReactDOM from 'react-dom';

//Connect Firebase
import * as Config from '../../Team4of5_Service/Config.js';
import * as Issues from '../../Team4of5_Service/Issues.js';


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
     if (this.state.completionDate||this.state.status)
     {
             Issues.issueUpdate(
                  this.state.issue_id, this.state.completionDate,this.state.status)
                  .then((Issue)=>{
                      console.log(Issue);
                  })
      }
      this.state.completionDate = '';
      this.state.status = '';
      this.state.issue_id = '';

  event.preventDefault();
}

 render() {
        return (
    <div>

      <form className='updateIssue' onSubmit={this.handleSubmit}>
        <div>
            <div>
                <label>
                  ID
                  <input type="text" value={this.state.issue_id} placeholder='enter ID' onChange={this.handleChange.bind(this, 'issue_id')} />
                </label>
            </div>
        <div>
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

        <div>
            <label>
              Actual completion date
              <div> </div>
              <input type="date" value={this.state.completionDate} onChange={this.handleChange.bind(this, 'completionDate')} />
            </label>
        </div>
</div>
        <input type="submit" id="updateBtn" value={this.state.formBtnTxt} />
      </form>
      </div>
    );
  }

}
export default IssueUpdate;
