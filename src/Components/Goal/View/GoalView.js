import React, {
  Component
} from 'react';
import Header from '../../Header/Header.js';
import TimeFrame from './TimeFrame.js';
import './Goal.scss';

class GoalView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeArray: [''],

    };
  }

  componentDidMount() {
    this.setState({
      timeArray: this.props.timeArray
    });
  }

  renderTimeFrames() {
      const timeFragments = this.state.timeArray;
      let tasksToProps;

      let result = timeFragments.map(name => {
          if (this.props.weekTasks) {
            if (this.props.weekTasks.hasOwnProperty('weekTasks')) {
              tasksToProps = this.props.weekTasks.weekTasks.filter((el) => el.weekDay === name)
            } else {
              tasksToProps = []
            }
          } else {
            tasksToProps = []
          }
         
             return <TimeFrame 
             timeFragment = { name } 
             key = { name } 
             tasksToProps={ tasksToProps } />});

          return result;
        }
        handlerTask(e) {
          console.log(e.target.className)
          e.preventDefault();
          /* const targetEl = e.target.parentNode.parentNode; */
          const curruntClass = e.target.className;
          switch (true) {
            /* case (curruntClass === 'addTaskButton'):
              this.openModal(targetEl);
              break;
 */
            /* case (curruntClass === 'taskIsDone'):
              this.cancelModal(targetEl);
              break; 
 */
            case (curruntClass === 'modal-submit-button'):
              this.createTask(e);
              break;
            case (curruntClass.includes('taskIsDone')):
              this.finishedTask(e);
              break;
            default:
              break;
          }
        }
        /* openModal(targetEl) {
          targetEl.classList.toggle('WeeklyGoal-day-tasks--target');
          targetEl.querySelector('.WeeklyGoal-modal')
            .classList.toggle('WeeklyGoal-modal--visible');
        }
        cancelModal(targetEl) {
          targetEl.querySelector('.WeeklyGoal-modal-form').reset();

          document.querySelector('.WeeklyGoal-modal--visible')
            .classList.remove('WeeklyGoal-modal--visible');

          document.querySelector('.WeeklyGoal-day-tasks--target')
            .classList.remove('WeeklyGoal-day-tasks--target');
        } */
        createTask(e) {
          const userId = localStorage.getItem('userId'),
            collection = document.querySelectorAll('.modal-input'),
            day = e.target.dataset.day,
            newTask = {
              id: Date.now(),
              weekDay: day,
              text: collection[0].value,
              category: collection[3].value,
              colorLabel: collection[0].value,
              wieght: collection[2].value,
              runtime: collection[1].value,
              isDone: false,
            };

          this.props.addTaskToStore(newTask, 'weekTasks');
          this.props.addTasksToServer(newTask, 'weekTasks', userId);
         
        }
        finishedTask(e) {
          console.log(e)
          let upgradeWieght, category;
          const userId = localStorage.getItem('userId'),
            taskId = e.target.dataset.id,
            action = this.props.actionToggleFinishFlag,
            newTasks = this.props.weekTasks.weekTasks.map((task) => {
              if (task.id == taskId) {
                task.isDone = task.isDone ? false : true;
                upgradeWieght = task.isDone ? (+task.wieght) : (+(task.wieght * -1));
                category = task.category;
              }
              return task;
            });

          document.querySelector(`[data-id='${taskId}']`).classList.toggle('completed');
          this.props.toggleFinishFlagTaskToStore('weekTasks', newTasks, action);
          this.props.toggleFinishFlagTaskToServer('weekTasks', userId, newTasks);
          this.props.upgradeWheel(upgradeWieght, category, userId)
        }
        render() {

          return ( <div className = "WeeklyGoal" >
            <Header />
            <div className = "WeeklyGoal-container" onClick={this.handlerTask.bind(this)}> 
            { this.renderTimeFrames() } 
            </div> 
            </div>
          );
        }
      }

      export default GoalView;