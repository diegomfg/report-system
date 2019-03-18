import React, { Component } from 'react';
import User from "./components/user";
import Navbar from "./components/navbar";
import $ from "jquery";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="jumbotron">
          <div className="container">
            <User name={"diego"}/>
            <User name={"daniel"}/>
            <User name={"luis"}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
