import React from 'react';

class RenderRange extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      sliderValue: 0
    }

    this.handleSliderChange = this.handleSliderChange.bind(this);
  }

  handleSliderChange(e){
    this.setState({sliderValue: e.target.value});
  }

  render(){
    return (
      <div className="range-Container">
         <center>
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
              className="cRenderRangeSlider" 
              onChange={this.handleSliderChange}/>
      </div>
      <center>
        <button value={this.state.sliderValue} 
                onClick={this.props.onAnswerSelected}   
                className="cRenderRangeButton">
                  Next Question
        </button>
      </center>
      </div>
    );
  }
}

  export default RenderRange;