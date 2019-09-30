import React from "react";
import logoutImg from "../../logout.svg";

const LoginView = props => {

    return (
        <div className="login-block block-shadow block-m">
            <div className="header-profile">
                <div className="header-profile__picture"><img width="45" src={props.picture_url} alt="Profile"></img></div>
                <div className="header-profile__info">
                    <div>{props.name}</div>
                    <div>{props.email}</div>
                </div>
            </div>

            <div>
                <form action="https://accounts.google.com/o/oauth2/v2/auth" method="get">
                    <input type="hidden" name="client_id" value="632277419807-7k3fohav6n5dtrbhdrrga12vipr22qi5.apps.googleusercontent.com" />
                    <input type="hidden" name="redirect_uri" value="http://localhost:3000/login/callback" />
                    <input type="hidden" name="access_type" value="offline" />
                    <input type="hidden" name="response_type" value="code" />
                    <input type="hidden" name="scope" value="openid email profile" />
                    <button>GET CODE</button>
                </form>

                
                <button onClick={props.logOutHandler}>
                    <div className="logout-btn">
                        <div className="logout-btn__icon"></div>
                        <div className="logout-btn__mask"></div>
                    </div>
                </button>
                </div>
        </div>
    );
}

export default LoginView;
