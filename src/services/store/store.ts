import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
} from "redux";
import {client} from "../reducers/clientReducer.tsx";
import thunk from "redux-thunk";
// @ts-ignore
import {composeWithDevTools} from "@reduxjs/toolkit/dist/devtoolsExtension";

export const combineReducer = combineReducers({
    client,
})

// @ts-ignore
export const store = createStore(
    combineReducer,
    composeWithDevTools(applyMiddleware(thunk))
);