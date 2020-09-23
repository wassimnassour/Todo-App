import React from "react";
import { TodosList } from "../index";
import "./dashboard.scss";
const Dashboard = () => {
	return (
		<main className="dashboard-container">
			<div className="dashboard">
				<TodosList />
			</div>
		</main>
	);
};

export default Dashboard;
