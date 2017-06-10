import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    Switch,
    NavLink
} from 'react-router-dom';

function Navbar () {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/menu/Settings'>Settings</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/menu/Chat'>Chat</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/menu/BugTracking'>Bug Tracking</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/menu/ProjectManagement'>Project Management</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/menu'>Menu</NavLink>
      </li>

    </ul>
  )
}

export default Navbar;
