import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./Header.scss";
import {
  connect
} from 'react-redux';
import {
  actionLogout
} from '../../Actions/index.js';

class Header extends Component {
  logout() {
    this.props.signOut();
    localStorage.clear();
  }
  render(){
    const env = `${process.env.PUBLIC_URL}`;
    return(
      <header className="container-header">
              <Link className="link-header" to={`${env}/myProfile`}><span>My Profile</span></Link>
              <Link className="link-header" to={`${env}/weekly_goal`}><span>Weekly Goal</span></Link>
              <Link className="link-header" to={`${env}/monthly_goal`}><span>Monthly Goal</span></Link>
              <Link className="link-header" to={`${env}/annual_goal`}><span>Annual Goal</span></Link>
              <Link className="link-header" onClick={this.logout.bind(this)} to={`${process.env.PUBLIC_URL}/`}><span>Sign Out</span></Link>
      </header>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      data: state.data,
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {
      dispatch(actionLogout())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);