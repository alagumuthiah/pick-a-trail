import { csrfFetch } from "./csrf";

const SET_USER = '/session/setUser';
const REMOVE_USER = '/session/removeUser';
const SET_SAVED_LIST = '/session/setSavedList';
const REMOVE_SAVED_LIST = '/session/removeSavedList';
const SET_COMPLETED_LIST = '/session/setCompletedList';
const REMOVE_COMPLETED_LIST = '/session/removeCompletedList';

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

const setCompletedList = (trails) => {
    return {
        type: SET_COMPLETED_LIST,
        trails
    }
}

const removeCompletedList = () => {
    return {
        type: REMOVE_COMPLETED_LIST
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
        dispatch(setUser(data.user));
        dispatch(setSavedTrailList(data.user.id));
        dispatch(setCompletedTrailList(data.user.id));
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
        dispatch(setCompletedTrailList(data.user.id));
    }
}

export const restoreSessionUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    if (data?.user?.id) {
        dispatch(setUser(data.user));
        dispatch(setSavedTrailList(data.user.id));
        dispatch(setCompletedTrailList(data.user.id));
    }

}

export const logoutUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    if (response.ok) {
        await response.json();
        dispatch(removeUser());
        dispatch(removeSavedList());
        dispatch(removeCompletedList());
    }
}

export const setSavedTrailList = (userId) => async (dispatch) => {
    const response = await csrfFetch('/api/saved/users/' + userId, {
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
    const response = await csrfFetch('/api/saved/trails/' + trailId, {
        method: 'POST'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setSavedTrailList(data.User.id));
    }
}

export const setCompletedTrailList = (userId) => async (dispatch) => {
    const response = await csrfFetch('/api/completed/users/' + userId, {
        method: 'GET'
    });
    if (response.ok) {
        const data = await response.json();
        const trailList = [];
        for (let entry of data) {
            trailList.push(entry.Trail.id);
        }
        dispatch(setCompletedList(trailList));
    }
}

export const updateCompletedTrailList = (trailId) => async (dispatch) => {
    const response = await csrfFetch('/api/completed/trails/' + trailId, {
        method: 'POST'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setCompletedTrailList(data.User.id));
    }
}

export const addFollowing = (userId) => async (dispatch) => {
    const response = await csrfFetch('/api/session/add/following/' + userId, {
        method: 'PUT'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
    }
}

export const removeFollowing = (userId) => async (dispatch) => {
    const response = await csrfFetch('/api/session/remove/following/' + userId, {
        method: 'PUT'
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data));
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
            newState.savedTrails = action.trails;
            return newState;
        case REMOVE_SAVED_LIST:
            newState = Object.assign({}, state);
            newState.savedTrails = null;
            return newState;
        case SET_COMPLETED_LIST:
            newState = Object.assign({}, state);
            newState.completedTrails = action.trails;
            return newState;
        case REMOVE_COMPLETED_LIST:
            newState = Object.assign({}, state);
            newState.completedTrails = null;
            return newState;
        default:
            return state;
    }
}
