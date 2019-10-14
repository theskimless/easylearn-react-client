import {applyMiddleware, combineReducers, createStore} from "redux";
import wordsReducer from "./reducers/wordsReducer";
import notificationsReducer from "./reducers/notificationsReducer";
import listsReducer from "./reducers/listsReducer";
import profileReducer, {redirect} from "./reducers/profileReducer";
import thunk from "redux-thunk";
import {auth} from "../api/api";

let reducers = combineReducers({
    profile: profileReducer,
    wordsReducer,
    listsReducer,
    notificationsReducer
})

const refreshTokenMiddleware = store => next => action => {
    if(action.type === "withCreds") {
        let refresh_token = localStorage.getItem("refresh_token");
        let access_token = localStorage.getItem("access_token");
        let expires_in = localStorage.getItem("expires_in");
        if(refresh_token && access_token && expires_in) {
            if(expires_in - Date.now() < 0) {
                auth.refreshToken()
                    .then(() => {
                        return next(action.thunk);
                    });
            }
            else {
                return next(action.thunk);
            }
        }
        else
        {
            return next(redirect("/"));
        }
    }
    else {
        return next(action);
    }
}

const store = createStore(reducers, applyMiddleware(refreshTokenMiddleware, thunk));
export default store;