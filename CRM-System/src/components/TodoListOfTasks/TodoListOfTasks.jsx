import styles from "./TodoListOfTasks.module.css";

export default function TodoListOfTasks({
  handleChangeFilteredTasks,
  filter,
  taskCounts,
}) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <button
            className={`${styles.button} ${filter === "all" ? styles.active : ""}`}
            onClick={() => handleChangeFilteredTasks("all")}
          >
            Все ({taskCounts.all})
          </button>
        </li>
        <li className={styles.item}>
          <button
            className={`${styles.button} ${filter === "inWork" ? styles.active : ""}`}
            onClick={() => {
              handleChangeFilteredTasks("inWork");
            }}
          >
            В работе ({taskCounts.inWork})
          </button>
        </li>
        <li className={styles.item}>
          <button
            className={`${styles.button} ${filter === "completed" ? styles.active : ""}`}
            onClick={() => {
              handleChangeFilteredTasks("completed");
            }}
          >
            Сделано ({taskCounts.completed})
          </button>
        </li>
      </ul>
    </div>
  );
}
