import React, {useEffect} from "react";
import {connect} from "react-redux";
import LoginView from "./LoginView";
import {withRouter} from "react-router-dom";
import {setAuth, requestPicture, logOut} from "../../redux/reducers/profileReducer";
import { auth } from "../../api/api";

function isTokenExpired() {
    if(localStorage.getItem("expires_in") - Date.now() > 0) return false;
    return true;
}

let LoginContainer = props => {
    // debugger;
    console.log("LOGIN COMPONENT");

    if(localStorage.getItem("refresh_token")) {
        if(isTokenExpired()) {
            console.log("EXPIRED");
            props.setAuth(false);
            auth.refreshToken()
                .then(() => {
                        console.log("THEN");
                        props.setAuth(true);
                    })
                .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        if(!isTokenExpired()) {
            props.setAuth(true);
        }
    }, []);

    useEffect(() => {
        if(props.isAuthenticated) {
            console.log("SET PICTURE USE EFFECT");
            console.log(localStorage);
            props.setPicture();
        }
    }, [props.isAuthenticated]);
   
    return <LoginView logOutHandler={props.logOut} picture_url={props.picture_url} />;
};

const mapStateToProps = state => ({
    isAuthenticated: state.profile.isAuthenticated,
    picture_url: state.profile.picture_url
});

const mapDispatchToProps = dispatch => ({
    setPicture: () => dispatch(requestPicture()),
    setAuth: (state) => dispatch(setAuth(state)),
    logOut: () => dispatch(logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginContainer));