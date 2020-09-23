import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";

import { auth } from "../../firebase/firebase";

import "./todosList.scss";
const TodosList = () => {
	return (
		<section className="todosList_container">
			<div className="add">
				<button className="add_button">
					<AiOutlinePlusCircle />
				</button>
			</div>
			<ul>
				<li>
					<BsList />
					<span>Todo</span>
				</li>
			</ul>
			<div className="signOut">
				<button
					className="signOut_button"
					onClick={() => auth.signOut()}
				>
					<FaSignOutAlt />
				</button>
			</div>
		</section>
	);
};

export default TodosList;
