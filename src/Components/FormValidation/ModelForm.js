import {
    db
} from '../../config.js';
import firebase from 'firebase/app';

class ModelForm {
    constructor(ctrl) {
        this.handlerSign = this.handlerSign.bind(this);
        this.getSignInToken = this.getSignInToken.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.ctrl = ctrl;
    }

    handlerSign(signType) {
        const data = {
            login: document.querySelector('.email').value,
            password: document.querySelector('.password').value,
            id: Date.now(),
            testDone: false,
            validate: true,
            weekNumber: this.getWeekNumber()
        }
        if (signType === 'Up') {
            data.passRepeat = document.querySelector('.repeatPassword').value;
        }
        if (this.checkForm(data)) {
            signType === 'Up' ? this.getUserData(data) : this.getSignInToken(data);
        }

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

    getSignInToken(data) {
        db.collection("users").doc("usersData").get()
            .then((doc) => {
                doc.data().users.forEach(ud => {
                    let user = ud.hasOwnProperty('data') ? ud.data : ud;
                    if (user.login === data.login && user.password === data.password) {
                        localStorage.setItem('userId', user.id);
                        this.ctrl.redirectToMyProf();
                    }
                })
            });
    }

    checkForm(data) {
        const regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
            regPassword = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
        let res = true;
        let errorList = [];

        if (!regEmail.test(data.login)) {
            errorList.push('noEmail');
            res = false;
        }
        if (!regPassword.test(data.password)) {
            errorList.push('wrongPass');
            res = false;
        }
        if (data.hasOwnProperty('passRepeat')) {
            if (data.password !== data.passRepeat) {
                errorList.push('noMatch');
                res = false;
            }
        }
        this.ctrl.showError(errorList);
        return res;
    }

    updateUserData(data) {
        const usersData = db.collection("users").doc("usersData");
        usersData.update({
                users: firebase.firestore.FieldValue.arrayUnion({
                    ...data
                })
            })
    }

    updateUserList(email) {
        const usersData = db.collection("users").doc("usersList");
        usersData.update({
                usersList: firebase.firestore.FieldValue
                    .arrayUnion(email)})
    }

    getUserData(data) {
        let check = true;

        db.collection("users").doc("usersList").get()
            .then((doc) => {
                if (doc.exists) {
                    doc.data().usersList.forEach((el) => {
                        if (el === data.login) {
                            this.ctrl.showError(['userExists']);
                            check = false;
                        }
                    });
                    if (check) {
                        localStorage.setItem('userId', data.id);
                        localStorage.setItem('testDone', false);
                        this.updateUserData(data);
                        this.updateUserList(data.login);
                        this.ctrl.props.actionAddUserData(data);
                        ['monthTasks', 'annualTasks', 'weekTasks'].forEach((el) => {
                            this.createEmptyCollection(el, data.id)
                        })
                    }
                } else {
                    console.log("No such document!");
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            });

    }
    createEmptyCollection(el, userId) {
        db.collection(`${el}`).doc(`${userId}`).set({});
    }
}

export default ModelForm;