import React, { Component } from 'react';
import ModelAdminPage from './ModelAdminPage.js';
import ViewAdminPage from './View/ViewAdminPage.js';


class ControlleAdminPage extends Component {
    constructor() {
        super();
        this.init();
    }
    init() {
        this.model = new ModelAdminPage(this);
    }
   
    render() {
        return <ViewAdminPage 
        handlerSignIn={this.model.handlerSignInAdmin}
        addQuestionToServer={this.model.addQuestionToServer}
        getUsersList={this.model.getUsersList}
        handlerKick={this.model.handlerKick}
        self={this.model.self}
        />;
    }
}

export default ControlleAdminPage; 