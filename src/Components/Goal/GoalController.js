import React from 'react';
import GoalView from './View/GoalView.js';

import { signUpDataToStore } from '../../Actions/index.js';
import { connect } from 'react-redux';


class GoalController extends React.Component{
  constructor() {
    super();
    this.init();
    this.state = {
        component: null
    }
  }

  init() {  
  }

  componentDidMount(){
    this.setState({
      component: <GoalView timeArray={this.props.timeArray} />
    });
  }

  render() {
    return ( this.state.component);
  }
}

export default GoalController;