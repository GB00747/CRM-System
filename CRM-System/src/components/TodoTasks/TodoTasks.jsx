import Task from "../Task/Task.jsx";
import styles from './TodoTasks.module.css';

export default function TodoTasks({tasks, deleteTask, changeValueInInput, switchIsDone, filter}) {

	return (
			<div>
				<ul
						className={styles.todoList}
				>
					{tasks.map((task) => (
							<li
									key={task.id}
							>
										<Task
												task={task}
												deleteTask={deleteTask}
												switchIsDone={switchIsDone}
												changeValueInInput={changeValueInInput}
												filter={filter}
										/>
							</li>
					))
					}

				</ul>
			</div>
	)
}