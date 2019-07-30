const initialState = {
    data: {
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGN_UP':
            return {
                ...state,
                data: action.payload
            };

        case 'TestResult':
            return {
                ...state,
                wheels: action.payload
            };
        case 'AllUserData':
            return {
                ...state,
                [action.dataType]: action.payload
            };
        case 'AddTask':
            return {
                ...state,
                [action.taskType]: state[action.taskType] ? {
                    [action.taskType]: [action.payload, ...state[action.taskType].weekTasks]
                } : {
                    [action.taskType]: [action.payload]
                }
            };
        case 'ChangedAllTasks':
            return {
                ...state,
                [action.taskType]: {
                    [action.taskType]: action.payload
                }
            };
            case 'Logout':
            return {
                state: initialState
                };
            
        default:
            return state;
    }
};

export default reducer;