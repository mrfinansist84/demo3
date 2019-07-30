import React, { Component } from 'react';

class ModalViewTask extends Component {

  constructor(props){
    super(props);
    this.state = {
      sliderValue: 5,
      currentInputValue: '',
      inputEmpty: false,
      timeInput: '',
      incorrectTime: false
    }

    this.closeModal = this.closeModal.bind(this);
    this.submitTask = this.submitTask.bind(this);
  }

  closeModal(){
    this.props.onClose();
  }

  submitTask(e){
    e.preventDefault();
     this.closeModal();
  }
  
  render(){
    
    return(
      <div className="modal-Add-Task">
         <div className="modal-content">
          <span className="close" onClick = {this.closeModal}>&times;</span>
          <center>
          <h2>{this.props.taskHeader}</h2>
          <p className="ModalViewTask-info">Time: {this.props.taskTime} </p>
          <p className="ModalViewTask-info">Weight: {this.props.taskWeight} </p>
          <p className="ModalViewTask-info">Category: {this.props.taskCategory} </p>
         </center>

        <center>
         <button className="ModalViewTask-button taskIsDone" data-id={this.props.id}>Mark as Done</button>
         <button className="ModalViewTask-button removeTask">Remove Task</button>
        </center>
      </div>
    </div>);}
  }

export default ModalViewTask;