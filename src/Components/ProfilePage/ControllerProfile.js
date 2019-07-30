import React, {
    Component
} from 'react';
import ModelProfile from './ModelProfile.js';
import ViewProfile from './View/ViewProfile.js';
import {
    Redirect
} from 'react-router-dom';
import {
    connect
} from 'react-redux';
import {
    allDataToStore
} from '../../Actions/index.js';

class ControllerProfile extends Component {
    constructor() {
        super();
        this.state = {
            component: null
        }
        this.init();
    }
    init() {
        this.model = new ModelProfile(this);
        this.getAllUserData();
    }
    getAllUserData() {
        
        const token = localStorage.getItem('userId') ?
            localStorage.getItem('userId') :
            this.kickUnregistretedUser();
            
        ['wheels', 'monthTasks', 'annualTasks', 'weekTasks'].forEach((el) => {
            this.model.getData(el, token)
        }) 
    }

    updateDataStore(result, dataType) {
        this.props.allDataToStore(result, dataType);
        this.checkFullData();
    }

    checkFullData() {
            if (this.props.wheels &&
                this.props.annualTasks &&
                this.props.monthTasks &&
                this.props.weekTasks) {
                this.setState({
                        component: <ViewProfile
                        wheels = {
                            this.props.wheels
                        }
                        annualTasks = {
                            this.props.annualTasks
                        }
                        monthTasks = {
                            this.props.monthTasks
                        }
                        weekTasks = {
                            this.props.weekTasks
                        }
                        />})
                    }
    } 

    kickUnregistretedUser() {
            this.setState({
                    component: <Redirect to = {{pathname: '/404'}}/>})
                }

                render() {
                    return this.state.component;
                }
            }

            const mapStateToProps = (state) => {
                return {
                    data: state.data,
                    wheels: state.wheels,
                    annualTasks: state.annualTasks,
                    monthTasks: state.monthTasks,
                    weekTasks: state.weekTasks
                }
            };

            const mapDispatchToProps = (dispatch) => {
                return {
                    allDataToStore: (result, dataType) => {
                        dispatch(allDataToStore(result, dataType))
                    },
        
                }
            };

            export default connect(mapStateToProps, mapDispatchToProps)(ControllerProfile);