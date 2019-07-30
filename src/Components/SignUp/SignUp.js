import React from 'react';
import FormController from '../FormValidation/FormController';

class SignUp extends React.Component {

    render(){
      return (
        <div>
         <FormController signType='Up'/>
         </div>
      );
  }
}

export default SignUp;

