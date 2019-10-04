import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { checkIfRegistered, requestUserinfo, setAuth } from "./redux/reducers/profileReducer";
import './App.css';
import LoginBtn from "./components/Login/LoginBtn";
import LoginCallback from "./components/Login/LoginCallback";
import LoginContainer from "./components/Login/LoginContainer";
import MenuContainer from "./components/Menu/MenuContainer";
import NotificationsContainer from "./components/Notification/NotificationsContainer";
import ProfileView from "./components/Profile/ProfileView";
import RedirectContainer from './components/Redirect/RedirectContainer';
import WordsContainer from "./components/Words/WordsContainer";
import { clearNotifications, setNotifications } from "./redux/reducers/notificationsReducer";

function App(props) {
  useEffect(() => {
    if(!props.isAuthenticated) {
      let refresh_token = localStorage.getItem("refresh_token");
      let access_token = localStorage.getItem("access_token");
      let expires_in = localStorage.getItem("expires_in");
      
      if(refresh_token && access_token && expires_in) {
          props.checkIfRegistered();
      }
      // else
      // {
          // LOG IN
      // }

      props.setNotifications("app", [{
          type: "error", 
          title: "You are not logged in", 
          message: <div className="text-center"><LoginBtn /></div>
      }]);
    }
    else {
      props.clearNotifications("app");
      console.log("SET USERINFO");
      props.setUserinfo();
    }
  }, [props.isAuthenticated]);

  return (
    <div className="wrapper container">
      <RedirectContainer />
      <Route exact path="/login/callback" render={() => <LoginCallback />} />
      <NotificationsContainer width="576" notifications={props.notifications} />

      <LoginContainer />
      <MenuContainer />
      
      <Route exact path="/" render={() => <WordsContainer />} />
      <Route path="/profile" render={() => <ProfileView />} />
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.profile.isAuthenticated,
  notifications: state.notificationsReducer.app
});

const mapDispatchToProps = dispatch => ({
  setUserinfo: () => dispatch(requestUserinfo()),
  setAuth: (state) => dispatch(setAuth(state)),
  checkIfRegistered: () => dispatch(checkIfRegistered()),
  setNotifications: () => dispatch(setNotifications()),
  clearNotifications: () => dispatch(clearNotifications())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

