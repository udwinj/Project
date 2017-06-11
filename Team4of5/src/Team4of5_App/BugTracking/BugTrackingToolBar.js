import React from 'react';
import ReactDOM from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

class BugTrackTableSearch extends React.Component {

  getValue() {
    return ReactDOM.findDOMNode(this).value;
  }

  setValue(value) {
    ReactDOM.findDOMNode(this).value = value;
  }

  render() {
    return (
      <div className="flakes-search">
        <input
          ref="search-input"
          className="flakes-search"
          placeholder={ this.props.placeholder }
          defaultValue={ this.props.defaultValue }
          onKeyUp={ this.props.search } />

        <div className="flakes-actions-bar">
          <button
            className="action button-gray smaller right"
            defaultValue="Add Value">
            Search
            </button>
          <button
            className="action button-gray smaller right"
            defaultValue="Export CSV">Export CSV</button>
        </div>
      </div>
    );
  }
}
export default BugTrackTableSearch;
