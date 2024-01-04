import { csrfFetch } from "./csrf";

const SET_USER_LIST = '/session/setUserList';
// const REMOVE_USER_LIST = '/session/removeList';

const setUser = (users) => {  //Action creator to set user list
    return {
        type: SET_USER_LIST,
        users
    }
};

// const removeUser = () => { // Action creator to remove user list
//     return {
//         type: REMOVE_USER_LIST
//     }
// };

//redux thunk is used to dispatch asynchronous action. The setUserList is a redux thunk that returns a function with dispatch as the argument, so it can dispatch asynchronous calls

export const setUserList = () => async (dispatch) => {
    const response = await csrfFetch('/api/users');
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.users));
    }
}



// export const removeUserList = () => async (dispatch) => {
//     const response = await csrfFetch('/api/session', {
//         method: 'DELETE'
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(removeUser(data.user));
//     }
// }

export const userListReducer = (state = [], action) => {
    let newState;
    switch (action.type) {
        case SET_USER_LIST:
            newState = Object.assign({}, state);
            newState = action.users;
            return newState;
        // case REMOVE_USER:
        //     newState = Object.assign({}, state);
        //     newState.user = null;
        //     return newState;
        default:
            return state;
    }
}
