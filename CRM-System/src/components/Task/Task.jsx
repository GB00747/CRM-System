import styles from "./Task.module.css";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";

export default function Task({ task, deleteTask, switchIsEditing, switchIsDone }) {
	return (
			<div className={styles.task}>
				<input
						type="checkbox"
						checked={task.isDone}
						onChange={() => switchIsDone(task.id)}
						className={styles.checkbox}
				/>
				<div className={`${styles.title} ${task.isDone ? styles.done : ''}`}>{task.title}</div>
				<button
						type="button"
						onClick={() => switchIsEditing(task.id)}
						className={styles.button}
						title='Редактировать'
				>
					<MdEditSquare
							className={styles.icon}
					/>
				</button>
				<button
						type="button"
						onClick={() => deleteTask(task.id)}
						className={`${styles.button} ${styles.deleteButton}`}
						title='Удалить'
				>
					<AiFillDelete
							className={styles.icon}
					/>
				</button>
			</div>
	);
}
