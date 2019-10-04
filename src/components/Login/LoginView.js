import React from "react";
import LoginBtn from "../Login/LoginBtn";

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
                {/* <LoginBtn /> */}
                
                <button onClick={props.logOutHandler}>
                    <div className="logout-btn">
                        <div className="logout-btn__icon"></div>
                        <div className="logout-btn__mask">Log out</div>
                    </div>
                </button>
                </div>
        </div>
    );
}

export default LoginView;
