import { csrfFetch } from "./csrf";

const SET_USER = '/userProfile/userInfo';
const SET_REVIEWS = '/userProfile/reviews';
const SET_LIST = '/userProfile/saved/list';
const SET_COMPLETED_LIST = '/userProfile/completed';
const SET_ACTIVITIES_LIST = '/userProfile/list';

//Action creator to set userInfo for the selected User
const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
};

//Action creator to set userInfo for the selected User
const setReviews = (reviews) => {
    return {
        type: SET_REVIEWS,
        reviews
    }
};

const setCompleted = (completed) => {
    return {
        type: SET_COMPLETED_LIST,
        completed
    }
}

const setActivities = (activities) => {
    return {
        type: SET_ACTIVITIES_LIST,
        activities
    }
}

const setList = (lists) => {
    return {
        type: SET_LIST,
        lists
    }
}

// //redux thunk is used to dispatch asynchronous action. The signUpUser is a redux thunk that returns a function with dispatch as the argument, so it can dispatch asynchronous calls

export const setUserInfo = (userId) => async (dispatch) => {
    console.log('Inside UserInfo');
    const response = await csrfFetch('/api/users/' + userId);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setUser(data));
    }
}

export const setUserReviews = (userId) => async (dispatch) => {
    console.log('Inside UserReview');
    const response = await csrfFetch('/api/reviews/users/' + userId);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setReviews(data));
    }
}

export const setCompletedList = (userId) => async (dispatch) => {
    console.log('Inside Completed List');
    const response = await csrfFetch('/api/completed/users/' + userId);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setCompleted(data));
    }
}

export const setActivitiesList = (userId) => async (dispatch) => {
    const response = await csrfFetch('/api/activities/users/' + userId);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setActivities(data));
    }
}

export const setSavedList = (userId) => async (dispatch) => {
    const response = await csrfFetch('/api/lists/users/' + userId);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setList(data));
    }
}



export const userProfileReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.user;
            return newState;
        case SET_REVIEWS:
            newState = Object.assign({}, state);
            newState.reviews = action.reviews
            return newState;
        case SET_COMPLETED_LIST:
            newState = Object.assign({}, state);
            newState.completed = action.completed
            return newState;
        case SET_ACTIVITIES_LIST:
            newState = Object.assign({}, state);
            newState.activities = action.activities
            return newState;
        case SET_LIST:
            newState = Object.assign({}, state);
            newState.lists = action.lists;
            return newState;
        default:
            return state;
    }
}
