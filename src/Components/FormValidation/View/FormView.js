import React from 'react';
import "./FormValidation.scss";

class FormView extends React.Component{
 constructor(props){
   super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
 }

  handleFormSubmit(e){
    e.preventDefault();
    this.props.handleSign(this.props.signType);
  }

  renderSignup(){
    let result = this.props.passNoMatch === 'noMatch' ? 
    this.renderWrongPasswordRepeatField (): 
    this.renderPasswordRepeatField();
    return result;
  }

  renderPasswordRepeatField(){
    return(
    <div className="FormView-input-container">
      <input type="password"
            className="FormView-input repeatPassword" 
            name="pass" 
            placeholder='Repeat Password'
            required/>
    </div>);
  }

  renderWrongPasswordRepeatField(){
    return(
    <div className="FormView-input-container">
      <input type="password"
            className="FormView-input-incorrect repeatPassword" 
            name="pass" 
            placeholder='Repeat Password'
            required/>
             <div className = 'FormView-error-message'>
                    Passwords don't match
                    </div>
    </div>);
  }

  renderWrongPassword(){
    return(
    <div className="FormView-input-container">
              <input type="password"
                    className="FormView-input-incorrect password" 
                    name="password"
                    placeholder='Password'
                    required />
                    <div className = 'FormView-error-message'>
                    Password should contain at least 1 special character & 1 uppercase letter & 1 digit
                    </div>
            </div>
    )
  }

  renderWrongEmail(){
    return(
      <div className="FormView-input-container">
      <input className="FormView-input-incorrect email"
            type="email" 
            name="email" 
            placeholder="Email"
            required/>
            <div className = 'FormView-error-message'>
                 Incorrect email or User exists
            </div>
    </div>
    )
  }

  renderEmailField(){
    return(
      <div className="FormView-input-container">
      <input className="FormView-input email"
            type="email" 
            name="email" 
            placeholder="Email"
            required/>
    </div>
    )
  }

  renderPasswordField(){
    return(
      <div className="FormView-input-container">
              <input type="password"
                    className="FormView-input password" 
                    name="password"
                    placeholder='Password'
                    required />
            </div>
    )
  }

    render(){
      return (
      <div className="FormView">
      <div className="FormView-main-container">

        <div className="FormView-left-side">
          <span>Sign</span>
          <span>{this.props.signType}</span>
        </div>

        <div className="FormView-right-side">
          <form className="FormView-form" noValidate>

          {this.props.emailError === 'noEmail' ? this.renderWrongEmail (): this.renderEmailField()}

          {this.props.passError === 'wrongPass' ? this.renderWrongPassword (): this.renderPasswordField()}
            
          {this.props.signType==='Up' ? this.renderSignup(): false}

        <div className="FormView-button-container">
          <button type="submit" onClick = {this.handleFormSubmit} className="FormView-button-submit">
            Sign {this.props.signType}
          </button>
        </div>

       </form>
      </div>
      </div>
      </div>
      );
  }
}

export default FormView;