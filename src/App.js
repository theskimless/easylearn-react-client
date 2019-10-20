import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { checkIfRegistered, requestUserinfo, setAuth } from "./redux/reducers/profileReducer";
import './App.css';
import LoginCallback from "./components/Login/LoginCallback";
import ProfileContainer from "./components/Profile/ProfileContainer";
import MenuContainer from "./components/Menu/MenuContainer";
import NotificationsContainer from "./components/Notification/NotificationsContainer";
import Redundant from "./components/Redundant/Redundant";
import RedirectContainer from './components/Redirect/RedirectContainer';
import WordsContainer from "./components/Words/WordsContainer";
import ListsContainer from "./components/Lists/ListsContainer";
import { clearNotifications, setNotifications } from "./redux/reducers/notificationsReducer";
import LoginView from "./components/Login/LoginView";
import {getLists} from "./redux/reducers/listsReducer";
import {getWords} from "./redux/reducers/wordsReducer";

function App(props) {
  // debugger;
  useEffect(() => {
    if(!props.isAuthenticated) {
      let refresh_token = localStorage.getItem("refresh_token");
      let access_token = localStorage.getItem("access_token");
      let expires_in = localStorage.getItem("expires_in");
      
      if(refresh_token && access_token && expires_in) {
        props.checkIfRegistered();
      }

      // props.setNotifications("app", [{
      //     type: "error", 
      //     title: "You are not logged in", 
      //     message: <div className="text-center"><LoginBtn /></div>
      // }]);
    }
    else {
      props.clearNotifications("app");
      console.log("SET USERINFO");
      props.setUserinfo();
      props.getWords(4);
      props.getLists();
    }
  }, [props.isAuthenticated]);

  return (
    <div className="wrapper container">
      <NotificationsContainer width="576" notifications={props.notifications} />
      <RedirectContainer />
      <Route exact path="/login/callback" render={() => <LoginCallback />} />
      {
        props.isAuthenticated ?
        (
          <>
            <ProfileContainer />
            <MenuContainer />
            
            <Route exact path="/" render={() => <WordsContainer />} />
            <Route exact path="/myLists" render={() => <ListsContainer />} />
            <Route path="/redundant" render={() => <Redundant />} />
          </>
        ):
        <LoginView />
      }
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
  clearNotifications: () => dispatch(clearNotifications()),
  getWords: () => dispatch(getWords()),
  getLists: () => dispatch(getLists())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

