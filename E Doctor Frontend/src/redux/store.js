import {applyMiddleware, createStore } from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {reducer} from "./reducer";

export default () => {
    /*
     let reducers = combineReducers(
     {
        nazwa: firstReducer
     })
     */
    const develMiddlewares = [require('redux-immutable-state-invariant').default()];
    const prodMiddlewares = [];
    const middlewares = process.env.NODE_ENV !== 'production' ? develMiddlewares : prodMiddlewares

    return createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)))
}