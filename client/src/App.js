import React, { Component } from 'react';
import logo from './logo.svg';
import User from "./components/user";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <User name={"diego"}/>
          <User name={"daniel"}/>
          <User name={"luis"}/>
        </header>
      </div>
    );
  }
}

export default App;
