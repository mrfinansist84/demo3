import React from 'react';
import "./Start.scss";
import { Link } from "react-router-dom";

class Start extends React.Component {
  handleClick = (e) => {
    console.log('this is:', e.currentTarget.dataset.name);
  }

    render(){
      return (
        <div className="startContainer">
            <div>
              <div className="wheelImage"></div>
            </div>

          <div className="contents">
            <nav className="headerContainer">
              <button className="btn"  >
                <Link to={`${process.env.PUBLIC_URL}/signup`}>SIGN UP</Link>
                </button>
              <button className="btn" > 
              <Link to={`${process.env.PUBLIC_URL}/signin`}>SIGN IN</Link>
              </button>
            </nav>
            <h1>WHEEL & SCRUM</h1>
            <h2>Your personilized tool to make life go right.</h2>
            <h3>The early bird catches the worm.</h3>
            <h4>The squeaky wheel gets the grease.</h4>
            </div>
        </div>
      );
  }
}

export default Start;