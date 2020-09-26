import React, { useState } from "react";
import { AiOutlinePlusCircle, AiOutlineSend } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";

import { auth, db } from "../../firebase/firebase";

import "./todosList.scss";
const TodosList = ({ query, setSelectedTodo, selectedTodo, userId }) => {
	const [newTask, SetNewTask] = useState(null);
	const [addNewTask, setAddNewTask] = useState(false);
	const setNewTodos = async (nameOfTask) => {
		if (nameOfTask.length > 0) {
			query.push({ name: nameOfTask, todos: [] });
			const docRef = await db.collection("todos").doc(userId);
			docRef.get().then(async (doc) => {
				if (doc.exists) {
					setAddNewTask(false);
					docRef.set({
						data: query,
					});
				} else {
					await db
						.collection("todos")
						.doc(userId)
						.set({
							data: [{ name: nameOfTask, todos: [] }],
						});
				}
			});
		}
	};
	console.log(query);
	return (
		<section className="todosList_container">
			<div className="add">
				<button
					className="add_button"
					onClick={() => setAddNewTask(!addNewTask)}
				>
					<AiOutlinePlusCircle />
				</button>
			</div>
			{addNewTask ? (
				<div className="add-tasks">
					<input
						onChange={(e) => SetNewTask(e.target.value)}
						autoFocus={addNewTask ? true : false}
						className="focus"
					/>
					<button onClick={() => setNewTodos(newTask)}>
						<AiOutlineSend />
					</button>
				</div>
			) : null}

			<ul>
				{query
					? query.map((el, _index) => {
							return (
								<li
									key={_index}
									onClick={() => setSelectedTodo(_index)}
									className={
										selectedTodo == _index
											? "selected"
											: "null"
									}
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
