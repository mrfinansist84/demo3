import React from 'react';
  class QuestionCount extends React.Component{
    render(){
    return (
      <div className="questionCount">
        Question <span>{this.props.counter}</span> of <span>{this.props.total}</span>
      </div>
    );
  }
}
  export default QuestionCount;