import React, {useEffect} from "react";
import {connect} from "react-redux";
import LoginView from "./LoginView";
import {withRouter} from "react-router-dom";
import {setAuth, requestUserinfo, logOut, authenticate} from "../../redux/reducers/profileReducer";

let LoginContainer = props => {
    useEffect(() => {
        if(!props.isAuthenticated) {
            let refresh_token = localStorage.getItem("refresh_token");
            let access_token = localStorage.getItem("access_token");
            let expires_in = localStorage.getItem("expires_in");
            
            if(refresh_token && access_token && expires_in) {
                props.setAuth(true);
            }
            else
            {
                // LOG IN
            }
        }
        else {
            props.setUserinfo();
        }
    }, [props.isAuthenticated]);

    return <LoginView
        logOutHandler={props.logOut}
        name={props.name}
        email={props.email}
        picture_url={props.picture_url}
    />;
};

const mapStateToProps = state => ({
    isAuthenticated: state.profile.isAuthenticated,
    picture_url: state.profile.picture_url,
    email: state.profile.email,
    name: state.profile.name
});

const mapDispatchToProps = dispatch => ({
    setUserinfo: () => dispatch(requestUserinfo()),
    setAuth: (state) => dispatch(setAuth(state)),
    logOut: () => dispatch(logOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginContainer));