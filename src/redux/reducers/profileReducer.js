import {auth} from "../../api/api";

const initialState = {
    isAuthenticated: false,
    picture_url: "",
    email: "",
    name: "",
    notifications: []
}

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