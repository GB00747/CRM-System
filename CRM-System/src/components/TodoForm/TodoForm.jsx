import styles from "./TodoForm.module.css"

export default function TodoForm ({taskValue, setTaskValue, addTask}) {

	return (
				<form
						className={styles.form}
						onSubmit={addTask}>
					<input
							className={styles.input}
							type="text"
							placeholder='Task to be done...'
							value={taskValue}
							onChange={(el) => setTaskValue(el.target.value)}
					/>
					<button
							className={styles.button}
							type="submit"
					>
					Add...
					</button>
				</form>
    )
}