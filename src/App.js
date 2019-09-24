import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route} from "react-router-dom";
import WordsContainer from "./components/Words/WordsContainer";
import LoginContainer from "./components/Login/LoginContainer";
import LoginCallback from "./components/Login/LoginCallback";

function App() {
  return (
    <div className="App">
      <Route path="/words" render={() => <WordsContainer />} />
      <Route exact path="/login" render={() => <LoginContainer />} />
      <Route exact path="/login/callback" render={() => <LoginCallback />} />
    </div>
  );
}

export default App;
