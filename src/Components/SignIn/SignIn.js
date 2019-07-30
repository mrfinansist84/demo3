import React from 'react';
import FormController from '../FormValidation/FormController';

class SignIn extends React.Component {
  
  render(){
    console.log(document.URL)
    return(
       <FormController signType='In' />
    );
  }  
}

export default SignIn;