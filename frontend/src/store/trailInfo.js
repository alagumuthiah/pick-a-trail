import { csrfFetch } from "./csrf";

const SET_TRAIL = '/trailInfo/trail';
const SET_TRAIL_REVIEWS = '/trailInfo/reviews';
const SET_TRAIL_COMPLETED_LIST = '/trailInfo/completed';
const SET_TRAIL_ACTIVITIES_LIST = '/trailInfo/list';

//Action creator to set trailInfo for the selected Trail
const setTrail = (trail) => {
    return {
        type: SET_TRAIL,
        trail
    }
};

//Action creator to set userInfo for the selected User
const setReviews = (reviews) => {
    return {
        type: SET_TRAIL_REVIEWS,
        reviews
    }
};

const setCompletedList = (completed) => {
    return {
        type: SET_TRAIL_COMPLETED_LIST,
        completed
    }
}

const setActivities = (activities) => {
    return {
        type: SET_TRAIL_ACTIVITIES_LIST,
        activities
    }
}

// //redux thunk is used to dispatch asynchronous action. The setTrailInfo is a redux thunk that returns a function with dispatch as the argument, so it can dispatch asynchronous calls

export const setTrailInfo = (trailId) => async (dispatch) => {
    const response = await csrfFetch('/api/trails/' + trailId);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setTrail(data));
    }
}

export const setTrailReviews = (trailId) => async (dispatch) => {
    console.log('Inside UserReview');
    const response = await csrfFetch('/api/reviews/trails/' + trailId);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setReviews(data));
    }
}

export const setTrailCompletedList = (trailId) => async (dispatch) => {
    console.log('Inside Completed List');
    const response = await csrfFetch('/api/completedsavedtrails/completed/trails/' + trailId);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setCompletedList(data));
    }
}

export const setActivitiesList = (trailId) => async (dispatch) => {
    const response = await csrfFetch('/api/activities/trails/' + trailId);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setActivities(data));
    }
}



export const trailInfoReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        case SET_TRAIL:
            newState = Object.assign({}, state);
            newState.trail = action.trail;
            return newState;
        case SET_TRAIL_REVIEWS:
            newState = Object.assign({}, state);
            newState.reviews = action.reviews
            return newState;
        case SET_TRAIL_COMPLETED_LIST:
            newState = Object.assign({}, state);
            newState.completed = action.completed
            return newState;
        case SET_TRAIL_ACTIVITIES_LIST:
            newState = Object.assign({}, state);
            newState.activities = action.activities
            return newState;
        default:
            return state;
    }
}
