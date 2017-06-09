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
        <NavLink exact activeClassName='active' to='/setting'>Setting</NavLink>
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
      <li>
        <NavLink activeClassName='active' to='/menu'>Menu</NavLink>
      </li>

    </ul>
  )
}

export default Navbar;
