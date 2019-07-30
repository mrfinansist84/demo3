import {
    db
} from '../../config.js';
import firebase from 'firebase/app';

export default class ModelWeeklyGoal {
    constructor(contr) {
        this.contr = contr;
    }

    addTasksToServer(task, serverCollection, userId) {
        const weekTasksonServer = db.collection(`${serverCollection}`).doc(`${userId}`);

        weekTasksonServer.update({
            weekTasks: firebase.firestore.FieldValue.arrayUnion(task)
        })
    };

    toggleFinishFlagTaskToServer(serverCollection, userId, newTasks) {
        const weekTasksonServer = db.collection(`${serverCollection}`).doc(`${userId}`);

        weekTasksonServer.update({
            weekTasks: newTasks
        })
    }
    upgradeWheel(upgradeWieght, category, userId) {
        db.collection('wheels').doc(`${userId}`).get()
            .then((doc) => db.collection('wheels').doc(`${userId}`)
                .update({
                    [category]: doc.data()[category] + upgradeWieght
                }))
    }

    getData(collection, document) {
        db.collection(`${collection}`).doc(`${document}`).get()
            .then((doc) => {
                if (doc.exists) {
                    this.contr.updateDataStore(doc.data(), collection);
                }
            })
    }
    getTaskEndingWeek(userId) {
        db.collection('weekTasks').doc(`${userId}`).get()
            .then((doc) => {
                const taskEndingWeek = doc.data().weekTasks,
                    completedTasks = taskEndingWeek.filter((el) => el.isDone === true),
                    unDoneTasks = taskEndingWeek.filter((el) => el.isDone === false),
                    health = this.calcProgress(completedTasks, 'health'),
                    finance = this.calcProgress(completedTasks, 'finance'),
                    career = this.calcProgress(completedTasks, 'career'),
                    leisure = this.calcProgress(completedTasks, 'leisure'),
                    relatives = this.calcProgress(completedTasks, 'relatives'),
                    userProgressData = {
                        totalTaskNum: taskEndingWeek.length,
                        completedTasks: completedTasks.length,
                        unDoneTasks: unDoneTasks.length,
                        progressOnWheel: {
                            health,
                            finance,
                            career,
                            leisure,
                            relatives
                        }
                    };
                this.refreshTasksOnServer(unDoneTasks, userId);
                this.count.createModalProgress(userProgressData)
            })
    }
    
    refreshTasksOnServer(unDoneTasks, userId) {
        const weekTasksonServer = db.collection('weekTasks').doc(`${userId}`);
        weekTasksonServer.update({
            weekTasks: unDoneTasks
        })
    }
    calcProgress(task, category) {
        task.filter((el) => el.catagory === category)
            .reduce(((acc, cur) => acc + cur['weight']), 0)
    }
    checkCurrentWeek() {
        const currWeekNum = this.getWeekNumber(),
            userId = localStorage.getItem('userId');
        db.collection('users').doc('usersDate').get()
            .then((doc) => {
                doc.data().forEach((user) => {
                    if (user.id == userId) {
                        if (!user.weekNumber == currWeekNum) {
                            this.getTaskEndingWeek(userId)
                        }
                    }
                });
            })
    }
    timeToDays(time) {
        return time / 1000 / 60 / 60 / 24;
    }
    getWeekNumber() {
        let weekNumber,
            yearStart,
            ts = new Date();
        yearStart = new Date(ts.getFullYear(), 0, 1);
        weekNumber = Math.ceil((this.timeToDays(ts - yearStart) + 1) / 7);
        return weekNumber;
    }
}