import React from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class BugTrackTableSearch extends React.Component {

  handleOnKeyUp =()=>{
    this.props.search(this.refs.seachInput.value);
  }

  render() {
    return (
      <div className="flakes-search">
        <input
          ref="searchInput"
          className="search-box"
          placeholder={ 'Enter Value' }
          defaultValue={ this.props.defaultValue }
          onKeyUp={ this.handleOnKeyUp} />

        <div className="flakes-actions-bar">
          <button className="action button-gray " defaultValue="Add Value">
            Search
            </button>

        </div>
      </div>
    );
  }
}
export default BugTrackTableSearch;
