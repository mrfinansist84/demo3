import React, { Component } from 'react';
import Goal from '../Goal/GoalController';

class ViewAnnualGoal extends Component {

  render(){
    const year = ['Q1', 'Q2', 'Q3', 'Q4'];
    return(
     <Goal timeArray={year} />
    );
  }

}

export default ViewAnnualGoal;