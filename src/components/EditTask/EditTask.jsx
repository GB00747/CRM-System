import {useState} from "react";
import styles from './EditTask.module.css'
import {FaRegSave} from "react-icons/fa";
import {MdCancel} from "react-icons/md";

export default function EditTask({task, changeTaskValueButton, switchIsEditing}) {


	const [changingTaskValue, setChangingTaskValue] = useState(task.title)

	return (
			<form
					className={styles.form}
					onSubmit={(el) => changeTaskValueButton(el, task.id, changingTaskValue)}>
				<input
						className={styles.input}
						type="text"
						value={changingTaskValue}
						onChange={(el) => setChangingTaskValue(el.target.value)}
				/>
				<button
						className={styles.button}
						type="submit"
						disabled={changingTaskValue.length < 2 || changingTaskValue.length > 64}
						title='Сохранить'
				>
					<FaRegSave
							className={styles.icon}
					/>
				</button>
				<button
						className={`${styles.button} ${styles.cancelButton}`}
						onClick={() => switchIsEditing(task.id)}
						type="button"
						title='Отменить'
				>
					<MdCancel
							className={styles.icon}
					/>
				</button>
			</form>

	)
}