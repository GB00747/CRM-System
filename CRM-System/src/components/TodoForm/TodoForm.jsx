import styles from "./TodoForm.module.css";

export default function TodoForm({ setTaskValue, addTask, taskValue }) {
  return (
    <form className={styles.form} onSubmit={(e) => addTask(e, taskValue)}>
      <input
        className={styles.input}
        type="text"
        placeholder="Task to be done..."
        value={taskValue}
        onChange={(el) => setTaskValue(el.target.value)}
      />
      <button className={styles.button} type="submit" title="Добавить">
        Add
      </button>
    </form>
  );
}
