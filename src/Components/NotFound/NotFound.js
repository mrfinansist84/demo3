import React, { Component } from 'react';
import './NotFound.scss';

class NotFound extends Component {

  render(){
   
    return(
    <div className="container-notfound">
      <div className="container-notfound-text">
      <span className="container-notfound-header">ERROR</span>
      <span className="container-notfound-secondheader">Page Not Found</span>
      <a href="/" className="container-takemehome">Let's go home</a>
      </div>
      </div>)
  }
}

export default NotFound;