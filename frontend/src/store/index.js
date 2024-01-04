import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from 'redux-thunk';
import { sessionReducer } from "./session";
import { userProfileReducer } from "./userProfile";
import { userListReducer } from "./userList";

const rootReducer = combineReducers({
    //You can have all your reducers - slice of data
    session: sessionReducer,
    userProfile: userProfileReducer,
    userList: userListReducer
});

let enhancer;

if (process.env.NODE_ENV !== "production") {
    const logger = require("redux-logger").default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
