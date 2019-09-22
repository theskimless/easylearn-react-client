import React from "react";
import {withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {auth} from "../../api/api";

function getAuthorizationCode(code) {
    // auth.requestAuthorizationCode(code)
    //     .then(res => {
    //         if(res.status === 200) {
    //             let d = res.data;
    //         }
    //         else console.log(res)
    //     })
    //     .catch(err => console.log(err.response));
    setTimeout(() => {
        return <Redirect to="/login" />
    }, 2000);
}

const Login = props => {
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

        console.log(1);
        getAuthorizationCode(1);
    }
    else {

    }
    return (
        <div>
            <div><h3>GETTING AUTHORIZATION CODE</h3></div>

            <form action="https://accounts.google.com/o/oauth2/v2/auth" method="get">
                <input type="hidden" name="client_id" value="632277419807-7k3fohav6n5dtrbhdrrga12vipr22qi5.apps.googleusercontent.com" />
                <input type="hidden" name="redirect_uri" value="http://localhost:3000/login" />
                <input type="hidden" name="response_type" value="code" />
                <input type="hidden" name="scope" value="openid" />
                <input type="submit" name="name" value="SEND" />
            </form>
        </div>
    );
}

export default connect(null, {})(withRouter(Login))