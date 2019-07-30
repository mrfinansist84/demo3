import React from 'react';

  class AnswerOption extends React.Component{
    render(){
    return (
      <div className="answerOption">
        <input
          type="radio"
          className="radioCustomButton"
          name="radioGroup"
          checked={this.props.answerValue === this.props.answer}
          value={this.props.answerValue}
          id={this.props.answerValue}
          disabled={this.props.answer}
          onChange={this.props.onAnswerSelected}
        />
        <label className="radioCustomLabel" htmlFor={this.props.answerValue} >
          {this.props.answerContent}
        </label>
      </div>
    );
  }
}

  export default AnswerOption;