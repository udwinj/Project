// import React from 'react';
// import ReactDOM from 'react-dom';
//
// import('./index.css')

var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');
var App = require('./components/App');

ReactDOM.render(
  <App />,
document.getElementById('app')
);
