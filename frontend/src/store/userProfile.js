import { csrfFetch } from "./csrf";

const SET_USER = '/userProfile/userInfo';
const REMOVE_USER = '/userProfile/removeUserInfo';
const SET_FEED = '/userProfile/feed';
const REMOVE_FEED = '/userProfile/removefeed';
const SET_REVIEWS = '/userProfile/reviews';
const REMOVE_REVIEWS = '/userProfile/removeReviews';
const SET_LIST = '/userProfile/list';
const REMOVE_LIST = '/userProfile/removeList';
const SET_COMPLETED_LIST = '/userProfile/completed';
const REMOVE_COMPLETED_LIST = '/userProfile/removeCompleted';
const SET_ACTIVITIES_LIST = '/userProfile/list';

//Action creator to set userInfo for the selected User
const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
};

// Action creator to remove selected user from store
export const removeUser = () => {
    return {
        type: REMOVE_USER
    }
};

//Action creator to set feed for the selected User
const setFeed = (feed) => {
    return {
        type: SET_FEED,
        feed
    }
};

// Action creator to remove feed for the selected userfrom store
const removeFeed = () => {
    return {
        type: REMOVE_FEED
    }
};

//Action creator to set userInfo for the selected User
const setReviews = (reviews) => {
    return {
        type: SET_REVIEWS,
        reviews
    }
};

// Action creator to remove selected user from store
const removeReviews = () => {
    return {
        type: REMOVE_REVIEWS
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
    const response = await csrfFetch('/api/completedsavedtrails/completed/user/' + userId);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setCompleted(data));
    }
}

export const setActivitiesList = (userId) => async (dispatch) => {
    console.log('Inside Activities List');
    const response = await csrfFetch('/api/activities/users/' + userId);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setActivities(data));
    }
}


export const userProfileReducer = (state = {}, action) => {
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
        default:
            return state;
    }
}
