const signUpDataToStore = (data) => {
    return {
        type: 'SIGN_UP',
        payload: data
    }
}

const setTestResultToStore = (result) => {
    return {
        type: 'TestResult',
        payload: result
    }
}
const allDataToStore = (result, dataType) => {
    return {
        type: 'AllUserData',
        dataType: dataType,
        payload: result
    }
}
const actionAddTask = (task, type) => {
    return {
        type: 'AddTask',
        taskType: type,
        payload: task
    }
}
const actionToggleFinishFlag = (changedTasks, type) => {
    return {
        type: 'ChangedAllTasks',
        taskType: type,
        payload: changedTasks
    }
}
const actionLogout = () => {
    return {
        type: 'Logout',
    }
}
export {
    signUpDataToStore,
    setTestResultToStore,
    allDataToStore,
    actionAddTask,
    actionToggleFinishFlag,
    actionLogout
};