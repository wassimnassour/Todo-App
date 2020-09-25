import React, { useEffect, useState } from "react";
import { TodosList, TodoView } from "../index";
import { auth, db } from "../../firebase/firebase";
import "./dashboard.scss";

const Dashboard = () => {
	const [query, setQuery] = useState([]);
	const [selectedTodo, setSelectedTodo] = useState(null);
	const [userId, setUserid] = useState(null);
	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				setUserid(user.uid);
				const userRef = db.collection("todos").doc(user.uid);

				userRef.get().then((docSnapshot) => {
					if (docSnapshot.exists) {
						userRef.onSnapshot((_doc) => {
							setQuery(_doc.data().data);
						});
					}
				});
			}
		});
	}, []);

	return (
		<main className="dashboard-container">
			<div className="dashboard">
				<TodosList query={query} setSelectedTodo={setSelectedTodo} />
				<TodoView
					selectedTodo={selectedTodo}
					query={query}
					userId={userId}
				/>
			</div>
		</main>
	);
};

export default Dashboard;
