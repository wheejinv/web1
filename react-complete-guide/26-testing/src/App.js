import './App.css';
import React from 'react'
import Greeting from "./components/Greeting";
import Async from "./components/Async";

function App() {
  return (
    <div className="App">
			<Async/>
      <Greeting/>
    </div>
  );
}

export default App;
