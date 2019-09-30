import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {withRouter, Redirect} from "react-router-dom";
import {setAuth} from "../../redux/reducers/profileReducer";
import {auth} from "../../api/api";
import style from "./LoginCallback.module.css";
import Loader from "../Loader/Loader";

let LoginCallback = props => {
  let [redirect, setRedirect] = useState(false);

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
                console.log("SET AUTH IN CALLBACK");
                props.setAuth(true);
                setRedirect(true);
              }
            });
        }
      }
    }
  }, []);

  if(redirect) {
    return <Redirect to={"/"} />;
  }
  
  return <div className={style.wrapper}><Loader loaderSize="50" circleSize="5" circleColor="#369" circlesAmount="8" /></div>
}

const mapStateToProps = state => ({
  isAuthenticated: state.profile.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  setAuth: (state) => dispatch(setAuth(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginCallback));