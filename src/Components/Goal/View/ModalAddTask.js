import React, { Component } from 'react';

class ModalAddTask extends Component {

  constructor(props){
    super(props);
    this.state = {
      sliderValue: 5,
      currentInputValue: '',
      inputEmpty: false,
      timeInput: '',
      incorrectTime: false
    }

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTimeInputChange = this.handleTimeInputChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submitTask = this.submitTask.bind(this);
  }

  handleSliderChange(e){
    this.setState({sliderValue: e.target.value});
  }

  handleInputChange(e){
    this.setState({currentInputValue: e.target.value});
  }

  handleTimeInputChange(e){
    const re = /^[0-9\b]+$/;
    //первый не ноль

    if(e.target.value.match(re)|| e.target.value.length>3){
      this.setState({timeInput: e.target.value});
    }
  }

  closeModal(){
    this.props.onClose();
  }

  renderAddTaskInput(){
    return(
      <center>
    <input type='text' 
                  placeholder="Add a task..." 
                  className="modal-Add-Task-Input modal-input" 
                  value={this.state.currentInputValue}
                  onChange = {this.handleInputChange}/>
                  </center>
    );
  }

  renderAddTaskInputInvalid(){
    return(
      <div>
        <center>
        <p className="error-message">Please enter your task</p>
      
        <input type='text' 
                      placeholder="Add a task..." 
                      className="modal-Add-Task-Input input-invalid" 
                      value={this.state.currentInputValue}
                      onChange = {this.handleInputChange}/>
                      </center>
      </div>
    );
  }


  renderTimeInput(){
    return(
    <center>
            <p>How much time a day would you devote for it? (15-600 min)</p>
            <input type="text" 
                  className="task-minutes modal-input" 
                  value={this.state.timeInput} 
                  onChange = {this.handleTimeInputChange} 
                  placeholder="Add time..."/>
            </center>
    );
  }

  renderTimeInputInvalid(){
    return(
    <center>
            <p className="error-message">How much time a day would you devote for it? (15-600 min)</p>
            <input type="text" 
                  className="task-minutes input-invalid" 
                  value={this.state.timeInput} 
                  onChange = {this.handleTimeInputChange} 
                  placeholder="Add time..."/>
            </center>
    );
  }

  submitTask(e){
    e.preventDefault();
    let minTime = 15, maxTime = 600;
    let task = { 
      taskText: this.state.currentInputValue,
      weight: this.state.sliderValue,
      time: this.state.timeInput
    }

    if (task.taskText.length === 0){
      this.setState( {
        inputEmpty: true
      });
    }
    else{
      this.setState( {
        inputEmpty: false
      });
    }

    
    if ((task.time>maxTime || task.time<minTime) || (task.time.length===0)){
      this.setState( {
        incorrectTime: true
      });
    }
    else {
      this.setState( {
        incorrectTime: false
      });
    }

    if ((task.time<maxTime && task.time>minTime) && (task.taskText.length !==0)  && (task.time.length!==0)){
    this.setState( {
        sliderValue: 5,
        currentInputValue: '',
        time: ''
      });
     this.closeModal();
  }
  }


  render(){
    
    return(
      <div className="modal-Add-Task">
         <div className="modal-content">
          <span className="close" onClick = {this.closeModal}>&times;</span>
          <form className="modal-Add-Task-Form">
            
           {this.state.inputEmpty ?this.renderAddTaskInputInvalid() : this.renderAddTaskInput()}
            
            {this.state.incorrectTime ? this.renderTimeInputInvalid(): this.renderTimeInput()}
            <div className="range-Container">
              <center>
                <p>Choose weight of your task</p>

              <div className="render-range-value">
              {this.state.sliderValue}
              </div>
              </center>

              <div className="render-range-input">
              <input type="range" 
                      id="myRange" 
                      min="1" 
                      value={this.state.sliderValue}
                      max="10" 
                      className="cRenderRangeSlider modal-input" 
                      onChange={this.handleSliderChange}/>
              </div>
                
          </div>
          <div className="select-Container"> 
          <p>Choose weight of your task</p>
            <select className="modal-Add-Task-Input modal-input">
              <option value="health" defaultValue="health">health</option>
              <option value="career">career</option>
              <option value="finance">finance</option>
              <option value="leisure">leisure</option>
              <option value="relatives">relatives</option>
              </select>
          </div>
          <button className="modal-submit-button" onClick={this.submitTask} 
          data-day={this.props.day}>Submit</button>
        </form>
      </div>
    </div>);}
  }

export default ModalAddTask;