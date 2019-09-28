import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route} from "react-router-dom";
import LoginCallback from "./components/Login/LoginCallback";
import LoginContainer from "./components/Login/LoginContainer";
import MenuView from "./components/Menu/MenuView";
import WordsContainer from "./components/Words/WordsContainer";
import ProfileView from "./components/Profile/ProfileView";
import NotificationContainer from "./components/Notification/NotificationContainer";
import axios from "axios";

function App() {
  return (
    <div className="wrapper container">
      <Route exact path="/login/callback" render={() => <LoginCallback />} />

      <LoginContainer />
      <MenuView />
      
      <Route exact path="/" render={() => <WordsContainer />} />
      <Route path="/profile" render={() => <ProfileView />} />

      <NotificationContainer width="576" />

      <button onClick={() => {
        axios.post("https://127.0.0.1:5000/test", {token: localStorage.getItem("access_token")})
          .then(res => console.log(res));

      }}>TEST</button>
    </div>
  );
}

export default App;
