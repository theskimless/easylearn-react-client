import React, {useState} from "react";

const LoginView = props => {

    return (
        <div>
            <img width="200" src={props.picture_url}></img>
            {/*{redirect && <Redirect to={"login"} /> }*/}
            <div><h3>GETTING AUTHORIZATION CODE</h3></div>

            <form action="https://accounts.google.com/o/oauth2/v2/auth" method="get">
                <input type="hidden" name="client_id" value="632277419807-7k3fohav6n5dtrbhdrrga12vipr22qi5.apps.googleusercontent.com" />
                <input type="hidden" name="redirect_uri" value="http://localhost:3000/login" />
                <input type="hidden" name="access_type" value="offline" />
                <input type="hidden" name="response_type" value="code" />
                <input type="hidden" name="scope" value="openid" />
                <input type="submit" name="name" value="GET CODE" />
            </form>
        </div>
    );
}

export default LoginView;
