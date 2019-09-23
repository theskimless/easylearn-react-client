import {applyMiddleware, combineReducers, createStore} from "redux";
import wordsReducer from "./reducers/wordsReducer";
import profileReducer from "./reducers/profileReducer";
import thunk from "redux-thunk";

let reducers = combineReducers({
    profile: profileReducer,
    words: wordsReducer,
})

const store = createStore(reducers, applyMiddleware(thunk));
export default store;