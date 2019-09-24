import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import LoginView from "./LoginView";
import {auth} from "../../api/api";
import {withRouter, Redirect} from "react-router-dom";
import {requestPicture} from "../../redux/reducers/profileReducer";

let LoginComponent = props => {
    let [redirect, setRedirect] = useState(false);

    if(props.location.search) {
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
            auth.requestToken(query.code)
                .then(res => {
                    console.log(res);
                    if(res.status === 200) {
                        localStorage.setItem("access_token", res.data["access_token"])
                        localStorage.setItem("expires_in", res.data["expires_in"])
                        setRedirect(true);
                    }
                });
        }
    }

    if(props.isAuthenticated) {
        console.log(props);
    }

    
    useEffect(() => {
        props.setPicture();
        console.log(props);
    }, [props.picture_url]);

    return redirect ? <Redirect to="/login" /> : <LoginView picture_url={props.picture_url} />;
};

const mapStateToProps = state => ({
    isAuthenticated: state.profile.isAuthenticated,
    picture_url: state.profile.picture_url
});

const mapDispatchToProps = dispatch => ({
    setPicture: (picture_url) => dispatch(requestPicture(picture_url))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginComponent));