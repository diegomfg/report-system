import React from 'react';
import {BrowserRouter} from "react-router-dom";

import Nav from "./Components/Nav/Nav"
import './App.css';

function App() {
  return (

   <BrowserRouter> 
    <div className="App">
      <Nav/>
    </div>
    </BrowserRouter>
  );
}

export default App;
