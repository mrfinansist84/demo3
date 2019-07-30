import React, { Component } from 'react';
import Quiz from './Quiz';
import './Quiz.scss';
import { Redirect } from 'react-router-dom';

class ViewQuiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizQuestions:this.props.question,
      counter: 0,
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      answersCount: {},
      result: '',
      myResult: { health: 0, finance: 0, career: 0, leisure: 0, relatives: 0 }
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
  }

  componentDidMount() {
    const shuffledAnswerOptions = this.state.quizQuestions.map(question=> question.answers);
    let questionNumber = 0;
    this.setState({
      question: this.state.quizQuestions[questionNumber].question,
      answerOptions: shuffledAnswerOptions[questionNumber],
      typeOfQuestion: this.state.quizQuestions[questionNumber].type,
      inputType: this.state.quizQuestions[questionNumber].inputType
    });

  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    if (this.state.questionId < this.state.quizQuestions.length) {
      setTimeout(() => this.setNextQuestion(), 300);
    } else {
      this.setState({ result: true});
     
    }
  }

  setUserAnswer(answer) {
    let updatedResult = Object.assign({}, this.state.myResult);
    let currentTypeOfQuestion = this.state.typeOfQuestion;
    updatedResult[currentTypeOfQuestion]+=Number(answer);
    this.setState((state, props) => ({

      myResult: updatedResult
    }
  ));
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;


    this.setState({
      counter: counter,
      questionId: questionId,
      question: this.state.quizQuestions[counter].question,
      answerOptions: this.state.quizQuestions[counter].answers,
      typeOfQuestion: this.state.quizQuestions[counter].type,
      answer: '',
      inputType: this.state.quizQuestions[counter].inputType
    });
  }

  renderQuiz() {
    return (
      <Quiz
        inputType = {this.state.inputType}
        typeOfQuestion = {this.state.typeOfQuestion}
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={this.state.quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    let result = Object.assign({}, this.state.myResult);
    return <Redirect to={{
      pathname:'/myProfile',
      state:  {result: result}
      }}/>;
  }

  render() {
    return (
      <div className="container-main-quiz">
        {this.state.result ? this.props.renderResult(this.state.myResult) : this.renderQuiz()}
      </div>
    );
  }
}

export default ViewQuiz;