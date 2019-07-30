import React, { Component } from 'react';
import ModalAddTask from "./ModalAddTask.js";
import Task from "./Task.js";
import TaskDone from "./TaskDone.js";

class TimeFrame extends Component {

  constructor(props){
    super();
    this.state = {
      modalOpen: false
  }
    this.displayModal = this.displayModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  displayModal(){
    this.setState({
      modalOpen: true
  });
  }

  closeModal(){
    this.setState({
      modalOpen: false
  });
   }

  showModal(){
    return(
     <ModalAddTask day={this.props.timeFragment} onClose={this.closeModal.bind(this)}/>
    )
  }
  renderTasks(){
    let result = this.props.tasksToProps.map((task, i)=>{
     return( <Task taskHeader={task.text} 
                          key={i} 
                          taskTime={task.runtime} 
                          taskWeight={task.wieght} 
                          taskCategory={task.category}                                 
                          taskDone={task.isDone}
                          id={task.id}/>
     
     )})
    return result;
  }
  render(){

    return(
      <div className="WeeklyGoal-day">
        <span className='WeeklyGoal-day-name'>{this.props.timeFragment}</span>
        <div className="WeeklyGoal-day-tasks">
        {this.state.modalOpen ? this.showModal() : false}
        {this.renderTasks()}
               
        <div className="add-taskButton-container">
          <div className='addTaskButton' onClick={this.displayModal}>+</div>
        </div>
        </div>
      </div>);
        }
  }

export default TimeFrame;