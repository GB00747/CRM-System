import Task from "../Task/Task.jsx";
import EditTask from "../EditTask/EditTask.jsx";
import styles from './TodoTasks.module.css';

export default function TodoTasks({tasks, deleteTask, switchIsEditing, changeTaskValueButton, switchIsDone}) {

	return (
			<div>
				<ul
						className={styles.todoList}
				>
					{tasks.map((task) => (
							<li
									key={task.id}
							>
								{task.isEditing ? (
										<EditTask
												task={task}
												changeTaskValueButton={changeTaskValueButton}
												switchIsEditing={switchIsEditing}

										/>
								) : (
										<Task
												task={task}
												deleteTask={deleteTask}
												switchIsEditing={switchIsEditing}
												switchIsDone={switchIsDone}
										/>
								)}

							</li>
					))
					}

				</ul>
			</div>
	)
}