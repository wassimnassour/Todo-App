import React, { useEffect } from "react";
import "./App.css";
import { auth } from "./firebase/firebase";

function App({ history }) {
	useEffect(() => {
		auth.onAuthStateChanged(async (_usr) => {
			if (_usr) {
				history.push("/dashboard");
			} else {
				history.push("/signin");
			}
		});
	}, [history]);
	return <></>;
}

export default App;
