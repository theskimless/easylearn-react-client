import {auth} from "../../api/api";

const initialState = {
    isAuthenticated: false,
    picture_url: ""
}

export const SET_PICTURE = "SET_PICTURE";
export const setPicture = picture_url => ({type: SET_PICTURE, picture_url});

export const requestPicture = () => dispatch => {
    auth.getUserInfo()
        .then(res => {
            console.log(res);
            if(res.status === 200) {
                dispatch(setPicture(res.data.picture));
            }
        })
        .catch(err => console.log(err.response));
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PICTURE:
            return {
                ...state,
                picture_url: action.picture_url
            }
        default:
            return state;
    }
}