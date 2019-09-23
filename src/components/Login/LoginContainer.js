import React, {useState} from "react";
import {connect} from "react-redux";
import LoginView from "./LoginView";
import {auth} from "../../api/api";
import {withRouter, Redirect} from "react-router-dom";


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
                    if(res.status === 200) {
                        localStorage.setItem("access_token", res.data["access_token"])
                        localStorage.setItem("expires_in", res.data["expires_in"])
                        setRedirect(true);
                    }
                });
        }
    }

    return redirect ? <Redirect to="/login" /> : <LoginView />;
};

export default withRouter(LoginComponent);