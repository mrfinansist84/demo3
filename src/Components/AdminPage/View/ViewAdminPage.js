import React, { Component } from 'react';
import AdminInnerPage from "./AdminInnerPage.js";
import SignInAdmin from "./SignInAdmin.js";

export default class ViewAdminPage extends Component {
    constructor() {
        super(); 
        this.state = {
            authAdmin: false
          };
    }
    authAdmin(condition){
        this.setState({  authAdmin: condition })
    } 
    render() {

        const page = this.state.authAdmin ?
         <AdminInnerPage 
         addQuestionToServer={this.props.addQuestionToServer}
         getUsersList={this.props.getUsersList}
         handlerKick={this.props.handlerKick}
         self={this.props.self}
         /> :
         <SignInAdmin 
         authAdmin={this.authAdmin.bind(this)}
         handlerSignIn={this.props.handlerSignIn}
         />;

        return (<div>{page}</div>)
    }
}