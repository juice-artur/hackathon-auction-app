import {
    legacy_createStore as createStore,
    combineReducers,
    applyMiddleware,
} from "redux";
import {client} from "../reducers/clientReducer.tsx";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

export const combineReducer = combineReducers({
    client,
})

export const store = createStore(
    combineReducer,
    composeWithDevTools(applyMiddleware(thunk))
);