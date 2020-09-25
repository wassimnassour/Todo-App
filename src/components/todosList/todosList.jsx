import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";

import { auth } from "../../firebase/firebase";

import "./todosList.scss";
const TodosList = ({ query, setSelectedTodo }) => {
	return (
		<section className="todosList_container">
			<div className="add">
				<button className="add_button">
					<AiOutlinePlusCircle />
				</button>
			</div>
			<ul>
				{query
					? query.map((el, _index) => {
							return (
								<li
									key={_index}
									onClick={() => setSelectedTodo(_index)}
								>
									<BsList />
									{el.name}
								</li>
							);
					  })
					: null}
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
