import React from 'react';
import QuestionCount from './QuestionCount';
import AnswerOption from './AnswerOption';
import RenderRange from './RenderRange';

class  Quiz extends React.Component{

  constructor(props){
    super(props);

    this.renderAnswerOptions = this.renderAnswerOptions.bind(this);
  }

  renderAnswerOptions(key) {
    return (
      <AnswerOption
        typeOfQuestion = {this.props.typeOfQuestion}
        key={key.text}
        answerContent={key.text}
        answerValue={key.value}
        answer={this.props.answer}
        questionId={this.props.questionId}
        onAnswerSelected={this.props.onAnswerSelected}
      />
    );
  }
  getRadio(){
    return (
      this.props.answerOptions.map(this.renderAnswerOptions)
    )
  }

  getRange(){
    return(
      <RenderRange onAnswerSelected={this.props.onAnswerSelected}/>
    )
  }

  render(){
    let answerFormat = (this.props.inputType === 'range') ?
     this.getRange():
     this.getRadio();


  return (
      <div className="cQuizQuestion" key={this.props.questionId}>
        <QuestionCount counter={this.props.questionId} total={this.props.questionTotal} />
        <h2 className="question">{this.props.question}</h2>
        <div className="answerOptions">
          {answerFormat}
        </div>
      </div>
  );
}
}

export default Quiz;