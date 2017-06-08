var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Nav () {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/chat'>Chat</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/bugtrack'>Bug Tracking</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/projectmanage'>Project Management</NavLink>
      </li>
    </ul>
  )
}

module.exports = Nav;
