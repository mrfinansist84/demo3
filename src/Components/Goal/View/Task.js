import React, { Component } from 'react';
import ModalViewTask from "./ModalViewTask.js";

class Task extends Component {

  constructor(props){
    super();
    this.state = {
      modalOpen: false
  }
    this.displayModal = this.displayModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  displayModal(){
    console.log('clicked displayModal in task')
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
     <ModalViewTask onClose={this.closeModal} 
                    taskHeader={this.props.taskHeader}
                    taskTime={this.props.taskTime}
                    taskWeight={this.props.taskWeight}
                    taskCategory={this.props.taskCategory}
                    id={this.props.id}/>);
  }

  render(){
    return(
      <div className="Task" data-id={this.props.id}>
      {this.state.modalOpen ? this.showModal() : false}
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

      <p className="Task-details" onClick={this.displayModal}>
        Details
      </p>

      
    </div>
       );}
  }

export default Task;