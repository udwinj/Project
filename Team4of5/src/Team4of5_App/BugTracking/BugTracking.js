import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../Navbar/Nav.js';


class BugTracking extends React.Component {
  constructor(props){
		super(props);
  }


  render() {

    return (
      <table className="table">
        <thead>
          <tr>
            <th className="td">Name</th>
            <th className="td">Price</th>
			<th className="td">Category</th>
			<th className="td">Operation</th>
          </tr>
        </thead>

      </table>
    );
  }
}

export default BugTracking;
