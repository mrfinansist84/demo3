import React from 'react';
import FormView from './View/FormView.js';
import ModelForm from './ModelForm.js';
import { signUpDataToStore } from '../../Actions/index.js';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class FormController extends React.Component {
  constructor() {
    super();
    this.model = new ModelForm(this);
    this.state = {
      component: null
    }
    this.showError = this.showError.bind(this);
  }

  componentDidMount() {
    this.setState({
      component: <FormView handleSign={this.model.handlerSign}
        signType={this.props.signType}
        handler={this.props.handler} />
    });
  }

  showError(errorList) {
    let componentProps = {};
    errorList.map(error => {

      switch (error) {
        case ('noEmail'): {
          componentProps.emailError = 'noEmail';
          break;
        }

        case ('wrongPass'): {
          componentProps.passError = 'wrongPass';
          break;
        }

        case ('noMatch'): {
          componentProps.passNoMatch = 'noMatch';
          break;
        }
        case ('userExists'): {
          componentProps.emailError = 'noEmail';
          break;
        }
        default: break;
      }
    })
    this.setState({
      component: <FormView handleSign={this.model.handlerSign}
        signType={this.props.signType}
        actionAddUserData={this.props.actionAddUserData}
        {...componentProps} />
    });
  }
  renderQuiz() {
    return <Redirect to={{
      pathname: '/quiz',
    }} />;
  }
  redirectToMyProf() {
    this.setState({
      component: <Redirect to={{
        pathname: '/myProfile',
      }} />
  })
}
  renderEl() {
    let res = this.state.component;
    if (localStorage.hasOwnProperty('userId')) {
      if (this.props.signType === 'Up') {
        res = this.renderQuiz();
      } else {
        res = (<Redirect to={{
          pathname: '/myProfile',
        }} />)
      }
    }
    return res;
  }
  render() {
    return (
      this.renderEl());
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.data
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actionAddUserData: (data) => {
      dispatch(signUpDataToStore(data))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormController);
