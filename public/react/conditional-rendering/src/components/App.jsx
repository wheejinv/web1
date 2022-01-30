import React from "react";
import Login from "./Login";

let isLoggedIn = false;

const currentHour = new Date(2022, 1, 31, 13).getHours();

function App() {
  return (
    <div className="container">
			{isLoggedIn ? <h1>Hello</h1> : <Login/>}
			{currentHour > 10 && <h1>Why are you still study..?</h1>}
    </div>
  );
}

export default App;
