import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { SignUp } from "./components/index";

import "./index.css";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Route path="/" component={App} />
			<Route path="/signup" component={SignUp} />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
