import {auth} from "../../api/api";
import { setNotifications, clearNotifications } from "./notificationsReducer";

const initialState = {
    isAuthenticated: false,
    picture_url: "",
    email: "",
    name: "",
    notifications: [],
    redirect: ""
}

const RESET_REDIRECT = "RESET_REDIRECT";
export const resetRedirect = () => ({type: RESET_REDIRECT});

const REDIRECT_TO_LOGIN = "REDIRECT_TO_LOGIN";
export const redirect = to => ({type: REDIRECT_TO_LOGIN, to});

const SET_PICTURE = "SET_PICTURE";
export const setPicture = picture_url => ({type: SET_PICTURE, picture_url});

const SET_AUTH = "SET_AUTH";
export const setAuth = state => ({type: SET_AUTH, state});

const SET_USERINFO = "SET_USERINFO";
export const setUserinfo = userinfo => ({type: SET_USERINFO, userinfo});

export const logOut = () => dispatch => {
    auth.revokeToken()
        .then(res => {
            console.log(res);
            dispatch(setAuth(false));
        });
}

export const checkIfRegistered = () => ({type: "withCreds", thunk: dispatch => {
    console.log("PROFILE REDUCER");
    auth.checkIfRegistered()
        .then(res => {
            // dispatch(clearNotifications("app"));
            dispatch(setAuth(true));
        })
        .catch(err => {
            console.log(err.response);
            if(!err.response) {
                dispatch(setNotifications("app", [{type: "error", title: "Server error", message: "Try to reload page later..."}]))
            }
            else if(err.response.status === 404) {
                dispatch(setNotifications("app", [{type: "error", title: "You are not logged in", message: "Try to log in"}]))
            }
            else {
                console.log(err.response);
            }
        });
}});

export const requestUserinfo = () => ({type: "withCreds", thunk: dispatch => {
    auth.getUserInfo()
        .then(res => {
            if(res.status === 200) {
                dispatch(setUserinfo(res.data));
            }
        })
        .catch(err => console.log(err.response));
}});

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_REDIRECT: {
            console.log("NE?");
            return {
                ...state,
                redirect: ""
            }
        }
        case REDIRECT_TO_LOGIN: {
            return {
                ...state,
                redirect: action.to
            }
        }
        case SET_AUTH: {
            return {
                ...state,
                isAuthenticated: action.state
            }
        }
        case SET_USERINFO:
            return {
                ...state,
                picture_url: action.userinfo.picture,
                email: action.userinfo.email,
                name: action.userinfo.name
            }
        case SET_PICTURE:
            return {
                ...state,
                picture_url: action.picture_url
            }
        default:
            return state;
    }
}