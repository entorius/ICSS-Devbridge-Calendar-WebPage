import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../redux/reducers";

const initialState = {};

const middleware = [thunk];

let devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

if (window.__REDUX_DEVTOOLS_EXTENSION__ != null) {
    var storeChoice = createStore(
        rootReducer,
        initialState,

        compose(
            applyMiddleware(...middleware),
            devtools
        )
    );
}
else {
    var storeChoice = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleware)
    );
}
const store = storeChoice;

export default store;