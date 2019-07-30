import React, {
    Component
} from 'react';
import ModelWeeklyGoal from './ModelWeeklyGoal.js';
/* import ViewWeeklyGoal from './View/ViewWeeklyGoal.js'; */
import {
    connect
} from 'react-redux';
import {
    actionAddTask,
    actionToggleFinishFlag,
    allDataToStore
} from '../../Actions/index.js';
import store from '../../store.js'
import GoalView from './View/GoalView.js';

class ControllerWeeklyGoal extends Component {
    constructor() {
        super();
        this.init();
        this.state = {
            component: null,
            timeArray: []
        }
    }
    init() {
        this.model = new ModelWeeklyGoal(this);
        this.checkAuth();
      
    }
    componentWillMount(){
        this.chooseTypeTask();
    }
    checkAuth() {
        const userAuthId = localStorage.getItem('userId'),
            authIdFromStore = store.getItem ? this.props.data.id : false;

        if (userAuthId) {
            if (!authIdFromStore) {
                this.getAllUserData(userAuthId);
            }
        } else {
            document.location.href = '/404'
        }
    }
    updateDataStore(result, dataType) {
        this.props.allDataToStore(result, dataType);
    }
    getAllUserData(token) {
        ['wheels', 'monthTasks', 'annualTasks', 'weekTasks'].forEach((el) => {
            this.model.getData(el, token)
        })
    }

    toggleFinishFlagTaskToStore(taskCollectiInDataBase, newTasks, action) {
        action(newTasks, taskCollectiInDataBase);
    }
  
    chooseTypeTask() {
        const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const year = ['Q1', 'Q2', 'Q3', 'Q4'];
        const month = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        switch (true) {
            case ((document.URL).includes('weekly_goal')): {
                this.setState({
                    timeArray: week
                })
                break;
            };
            case ((document.URL).includes('monthly_goal')): {
                this.setState({
                    timeArray: month
                })
                break;
            };
            case ((document.URL).includes('annual_goal')): {
                this.setState({
                    timeArray: year
                })
                break;
            };
        }
    }
    render() {
        return (<GoalView
            timeArray={this.state.timeArray}

            addTasksToServer={
                this.model.addTasksToServer
            }
            addTaskToStore={
                this.props.actionAddTask
            }
            weekTasks={
                this.props.weekTasks
            }
            toggleFinishFlagTaskToStore={
                this.toggleFinishFlagTaskToStore
            }
            actionToggleFinishFlag={
                this.props.actionToggleFinishFlag
            }
            toggleFinishFlagTaskToServer={
                this.model.toggleFinishFlagTaskToServer
            }
            upgradeWheel={
                this.model.upgradeWheel
            }
            createModalProgress={
                this.createModalProgress
            }
        />);
    }
}
const mapStateToProps = (state) => {
    return {
        weekTasks: state.weekTasks,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        allDataToStore: (result, dataType) => {
            dispatch(allDataToStore(result, dataType))
        },
        actionAddTask: (task, type) => {
            dispatch(actionAddTask(task, type))
        },
        actionToggleFinishFlag: (changedTasks, type) => {
            dispatch(actionToggleFinishFlag(changedTasks, type))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ControllerWeeklyGoal);