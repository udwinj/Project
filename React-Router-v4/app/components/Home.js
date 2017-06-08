var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
      <h1>Let us Chat!</h1>
      <Link className='button' to='/chat'>Chat System</Link>
      <hr/>
        <h1>Let us track the bugs!</h1>
        <Link className='button' to='/bugtrack'>Bug Tracking System</Link>
        <hr/>
          <h1>Let us manage the projects!</h1>
        <Link className='button' to='/projectmanage'>Project Management System</Link>
      </div>
    )
  }
}
module.exports = Home;
