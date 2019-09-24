import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import LoginView from "./LoginView";
import {auth} from "../../api/api";
import {withRouter, Redirect} from "react-router-dom";
import {setAuth, requestPicture} from "../../redux/reducers/profileReducer";
import {KJUR, b64utoutf8} from "jsrsasign";

function isTokenExpired(token) {
    if(token) {
        let payload = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(token.split(".")[1]));
        if(payload.exp*1000 - Date.now() > 0) return false;
    }
    return true;
}

let LoginComponent = props => {
    debugger;
    console.log("LOGIN COMPONENT");
    let [redirect, setRedirect] = useState(false);


    if(!isTokenExpired(localStorage.getItem("id_token"))) {
        props.setAuth(true);
    }
    else {
        setAuth(false);
    }

    useEffect(() => {
        if(!props.isAuthenticated) {
            if(props.location.search) {
                console.log("OMG");
                let query = props.location.search
                    .slice(1)
                    .split('&')
                    .reduce((params, param) => {
                            let [key, value] = param.split('=');
                            params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                            return params;
                        }, {}
                    );
        
                if(query.code) {
                    console.log(query.code);
                    console.log("REQ AGAIN");
                    auth.requestToken(query.code)
                        .then(status => {
                            if(status === 200) {
                                props.setAuth(true);
                                setRedirect(true);
                            }
                        });
                }
            }
        }
    }, []);

    useEffect(() => {
        if(props.isAuthenticated) {
            console.log("SET PICTURE USE EFFECT");
            props.setPicture();
        }
    }, [props.isAuthenticated]);
    
    return redirect ? <Redirect to="/login" /> : <LoginView picture_url={props.picture_url} />;
};

const mapStateToProps = state => ({
    isAuthenticated: state.profile.isAuthenticated,
    picture_url: state.profile.picture_url
});

const mapDispatchToProps = dispatch => ({
    setPicture: (picture_url) => dispatch(requestPicture(picture_url)),
    setAuth: (state) => dispatch(setAuth(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginComponent));