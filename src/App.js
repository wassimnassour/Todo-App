import React, { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";
import "./App.css";

function App({ history }) {
	const [loading, setLoading] = useState(true);

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
