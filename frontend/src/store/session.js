import { csrfFetch } from "./csrf";

const SET_USER = '/session/setUser';
const REMOVE_USER = '/session/removeUser';
const SET_SAVED_LIST = '/session/setSavedList';
const REMOVE_SAVED_LIST = '/session/removeSavedList';

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

const setSavedList = (trails) => { //Action creator to set the saved trails for the logged in user
    return {
        type: SET_SAVED_LIST,
        trails
    }
}

const removeSavedList = () => {
    return {
        type: REMOVE_SAVED_LIST
    }
}

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
        dispatch(setSavedTrailList(data.user.id));
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
        dispatch(setSavedTrailList(data.user.id));
    }
}

export const restoreSessionUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    dispatch(setSavedTrailList(data.user.id));
}

export const logoutUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeUser());
        dispatch(removeSavedList());
    }
}

export const setSavedTrailList = () => async (dispatch) => {
    const response = await csrfFetch('/api/completedsavedtrails/saved', {
        method: 'GET'
    });
    if (response.ok) {
        const data = await response.json();
        const trailList = [];
        for (let entry of data) {
            trailList.push(entry.Trail.id);
        }
        dispatch(setSavedList(trailList));
    }
}

export const updateSavedTrailList = (trailId) => async (dispatch) => {
    const response = await csrfFetch('/api/completedsavedtrails/saved/trails/' + trailId, {
        method: 'POST'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setSavedTrailList());
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
        case SET_SAVED_LIST:
            newState = Object.assign({}, state);
            newState.trailList = action.trails;
            return newState;
        case REMOVE_SAVED_LIST:
            newState = Object.assign({}, state);
            newState.trailList = null;
            return newState;
        default:
            return state;
    }
}
