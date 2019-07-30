import React, { Component } from 'react';
import ModelQuiz from './ModelQuiz.js';
import ViewQuiz from './View/ViewQuiz.js';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setTestResultToStore } from '../../Actions/index.js';

class ControllerQuiz extends Component {
    constructor() {
        super();
        this.state = {
            quizQuestions: '',
            component: null
        }
        this.init();
    }
    init() {
        this.model = new ModelQuiz(this);
        this.model.getData();
    }
   
    checkAuth() {
        let res = true;
        if (!localStorage.hasOwnProperty('userId')) {
            this.setState({
                component: <Redirect to={{
                    pathname: '/404',
                    state: { error: 'You are not registered. Please return to the main page for registration.' }
                }}
                />
            })
            res = false;
        }
        return res;
    }
    checkTestPass() {
        if (!localStorage.hasOwnProperty('testDone')) {
            if (localStorage.getItem('testDone') !== false) {
                this.setState({
                    component: <Redirect to={{
                        pathname: '/404',
                        state: { error: 'You are passed test earlier. Log in through the authorization menu' }
                    }}
                    />
                })
            }
        }
    }
    renderQuiz(questions) {
        this.setState({ quizQuestions: questions })
        this.setState({
            component: <ViewQuiz
                question={this.state.quizQuestions}
                renderResult={this.renderResult.bind(this)} />
        })
    }

    renderResult(result) {
        const id = localStorage.getItem('userId');
        this.model.setDataWheel(result, id);
        this.props.setTestResultToStore(result);
        return <Redirect to={{
            pathname: '/myProfile',
        }} />;
    }

    render() {
        if (this.checkAuth()) { this.checkTestPass()}
        return this.state.component;
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        wheel: state.wheel
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTestResultToStore: (result) => {
            dispatch(setTestResultToStore(result))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ControllerQuiz); 