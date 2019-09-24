import React, {useState, useEffect} from "react";
import {connect} from "react-redux";
import {withRouter, Redirect} from "react-router-dom";
import {setAuth} from "../../redux/reducers/profileReducer";
import {auth} from "../../api/api";

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
                props.setAuth(true);
                setRedirect(true);
              }
            });
        }
      }
    }
  }, []);

  if(redirect) {
    return <Redirect to={"/login"} />;
  }
  
  return <div>CALLBACK</div>
}

const mapStateToProps = state => ({
  isAuthenticated: state.profile.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  setAuth: (state) => dispatch(setAuth(state))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginCallback));