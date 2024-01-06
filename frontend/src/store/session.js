import { csrfFetch } from "./csrf";

const SET_USER = '/session/setUser';
const REMOVE_USER = '/session/removeUser';

const setUser = (user) => {  //Action creator to set user
    return {
        type: SET_USER,
        user
    }
};

const removeUser = () => { // Action creator to remove user
    return {
        type: REMOVE_USER
    }
};

//redux thunk is used to dispatch asynchronous action. The signUpUser is a redux thunk that returns a function with dispatch as the argument, so it can dispatch asynchronous calls
export const signUpUser = (userInfo) => async (dispatch) => {
    const { firstName, lastName, userName, email, password } = userInfo;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
            firstName,
            lastName,
            userName,
            email,
            password
        })
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setUser(data.user));
    }

}

export const setSessionUser = (user) => async (dispatch) => {
    const { credential, password } = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential,
            password
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data.user));
    }
}

export const restoreSessionUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
}

export const logoutUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeUser(data.user));
    }
}

export const sessionReducer = (state = { user: null }, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state;
    }
}
