import React from "react";
import ReactDOM from "react-dom";

import"./css/mainStyle.scss"

ReactDOM.render(<h1>Hello World</h1>, document.getElementById("root"));

// hot reloading. It works by replacing a module of the application
// during runtime with an updated one so that it’s available for instant use.
module.hot.accept();
