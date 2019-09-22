import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from "react-router-dom";
import WordsContainer from "./components/Words/WordsContainer";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <Route path="/words" render={() => <WordsContainer />} />
      <Route path="/login" render={() => <Login />} />
    </div>
  );
}

export default App;
