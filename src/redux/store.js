import {applyMiddleware, combineReducers, createStore} from "redux";
import wordsReducer from "./reducers/words-reducer";
import thunk from "redux-thunk";

let reducers = combineReducers({
    words: wordsReducer
})

const store = createStore(reducers, applyMiddleware(thunk));
export default store;