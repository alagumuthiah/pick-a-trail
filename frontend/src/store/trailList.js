import { csrfFetch } from "./csrf";

const SET_TRAIL_LIST = '/session/setTrailList';

const setTrail = (trails) => {  //Action creator to set user list
    return {
        type: SET_TRAIL_LIST,
        trails
    }
};

//redux thunk is used to dispatch asynchronous action. The setTrailList is a redux thunk that returns a function with dispatch as the argument, so it can dispatch asynchronous calls

export const setTrailList = () => async (dispatch) => {
    const response = await csrfFetch('/api/trails');
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setTrail(data));
    }
}

export const trailListReducer = (state = [], action) => {
    let newState;
    switch (action.type) {
        case SET_TRAIL_LIST:
            newState = Object.assign({}, state);
            newState = action.trails;
            return newState;
        default:
            return state;
    }
}
