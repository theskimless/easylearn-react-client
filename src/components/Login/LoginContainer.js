import React, {useEffect} from "react";
import {connect} from "react-redux";
import LoginView from "./LoginView";
import {withRouter} from "react-router-dom";
import {setAuth, requestPicture} from "../../redux/reducers/profileReducer";
import {KJUR, b64utoutf8} from "jsrsasign";

function isTokenExpired(token) {
    if(token) {
        let payload = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(token.split(".")[1]));
        if(payload.exp*1000 - Date.now() > 0) return false;
    }
    return true;
}

let LoginContainer = props => {
    console.log("LOGIN COMPONENT");

    if(!isTokenExpired(localStorage.getItem("id_token"))) {
        props.setAuth(true);
    }
    else {
        props.setAuth(false);
    }

    useEffect(() => {
        if(props.isAuthenticated) {
            console.log("SET PICTURE USE EFFECT");
            console.log(localStorage);
            props.setPicture();
        }
    }, [props.isAuthenticated]);
   
    return <LoginView picture_url={props.picture_url} />;
};

const mapStateToProps = state => ({
    isAuthenticated: state.profile.isAuthenticated,
    picture_url: state.profile.picture_url
});

const mapDispatchToProps = dispatch => ({
    setPicture: () => dispatch(requestPicture()),
    setAuth: (state) => dispatch(setAuth(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginContainer));