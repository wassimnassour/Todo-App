import React from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";

import { db } from "../../firebase/firebase";
import "./todosView.scss";
const TodoView = ({ query, selectedTodo, userId }) => {
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

	return (
		<>
			{selectedTodo !== null ? (
				<div className="todosView__container">
					<div className="todosView__header">
						<AiOutlinePlusCircle />
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
