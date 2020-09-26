import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { db } from "../../firebase/firebase";
import "./todosView.scss";
const TodoView = ({ query, selectedTodo, userId }) => {
	const [task, setTask] = useState("");
	const UpdateTask = (Task, index) => {
		if (Task.length > 0 && query[selectedTodo].todos[index] !== Task) {
			query[selectedTodo].todos[index].todo = Task;
			db.collection("todos").doc(userId).update({
				data: query,
			});
		}
	};

	const removeTask = (index) => {
		const Newtodos = query[selectedTodo].todos.filter(
			(el, _index) => _index !== index
		);
		query[selectedTodo].todos = Newtodos;
		db.collection("todos").doc(userId).update({
			data: query,
		});
	};
	const addNewTask = async () => {
		if (task.length > 0) {
			query[selectedTodo].todos.push({
				id: new Date(),
				todo: task,
			});
			await db
				.collection("todos")
				.doc(userId)
				.set({
					data: query,
				})
				.then((res) => setTask(""));
		}
	};

	return (
		<>
			{selectedTodo !== null ? (
				<div className="todosView__container">
					<div className="todosView__header">
						<div className="addNewTask">
							<input onChange={(e) => setTask(e.target.value)} />
							<button onClick={() => addNewTask()}>
								<AiOutlinePlusCircle />
							</button>
						</div>
					</div>

					{query[selectedTodo].todos.map((_todo, _index) => {
						return (
							<div key={_index} className="todo">
								<input
									value={_todo.todo}
									onChange={(e) =>
										UpdateTask(e.target.value, _index)
									}
								/>
								<button onClick={() => removeTask(_index)}>
									<MdDelete />
								</button>
							</div>
						);
					})}
				</div>
			) : null}
		</>
	);
};

export default TodoView;
