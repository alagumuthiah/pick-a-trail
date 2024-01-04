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

//Action creator to set userInfo for the selected User
const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
};

// Action creator to remove selected user from store
const removeUser = () => {
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

// //redux thunk is used to dispatch asynchronous action. The signUpUser is a redux thunk that returns a function with dispatch as the argument, so it can dispatch asynchronous calls

// export const setSessionUser = (user) => async (dispatch) => {
//     const { credential, password } = user;
//     const response = await csrfFetch('/api/session', {
//         method: 'POST',
//         body: JSON.stringify({
//             credential,
//             password
//         })
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(setUser(data.user));
//     }
// }

// export const restoreSessionUser = () => async (dispatch) => {
//     const response = await csrfFetch('/api/session');
//     const data = await response.json();
//     dispatch(setUser(data.user));
// }

// export const logoutUser = () => async (dispatch) => {
//     const response = await csrfFetch('/api/session', {
//         method: 'DELETE'
//     });
//     if (response.ok) {
//         const data = await response.json();
//         dispatch(removeUser(data.user));
//     }
// }

export const userProfileReducer = (state = {}, action) => {
    let newState;
    switch (action.type) {
        // case SET_USER:
        //     newState = Object.assign({}, state);
        //     newState.user = action.user;
        //     return newState;
        // case REMOVE_USER:
        //     newState = Object.assign({}, state);
        //     newState.user = null;
        //     return newState;
        default:
            return state;
    }
}
