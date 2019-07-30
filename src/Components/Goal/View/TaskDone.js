import React, { Component } from 'react';

class TaskDone extends Component {

  constructor(props){
    super();
  }

  render(){
    return(
        <div className="Task Task-done" >
          <span className="Task-header">{this.props.taskHeader}</span>
          <div>
            <i className="far fa-clock fa-lg Task-icon"></i>
            <span className="Task-type">{this.props.taskTime} min</span>
          </div>
          <div>
            <i className="fas fa-lg  fa-balance-scale-right Task-icon"></i>
            <span className="Task-type">{this.props.taskWeight}</span>
          </div>

          <div>
            <i className="far fa-lg  fa-check-circle Task-icon"></i>
            <span className="Task-type">{this.props.taskCategory}</span>
          </div>
          
        </div>
       );}
  }

export default TaskDone;