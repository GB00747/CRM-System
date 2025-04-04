import { useState, useEffect } from "react";
import styles from "./TodoListOfTasks.module.css";
import { fetchFilteredTasksApi } from "../../api/api.js";

export default function TodoListOfTasks({
  handleFilteredTasks,
  setFilter,
  tasks,
  filter,
}) {
  const [taskCounts, setTaskCounts] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  });

  const getLengthOfTodo = async (filter) => {
    const data = await fetchFilteredTasksApi(filter);
    const { all, inWork, completed } = await data.info;
    setTaskCounts({
      all,
      inWork,
      completed,
    });
  };

  useEffect(() => {
    getLengthOfTodo();
  }, [tasks]);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <button
            className={`${styles.button} ${filter === "all" ? styles.active : ""}`}
            onClick={() => {
              setFilter("all");
              handleFilteredTasks("all");
            }}
          >
            Все ({taskCounts.all})
          </button>
        </li>
        <li className={styles.item}>
          <button
            className={`${styles.button} ${filter === "inWork" ? styles.active : ""}`}
            onClick={() => {
              setFilter("inWork");
              handleFilteredTasks("inWork");
            }}
          >
            В работе ({taskCounts.inWork})
          </button>
        </li>
        <li className={styles.item}>
          <button
            className={`${styles.button} ${filter === "completed" ? styles.active : ""}`}
            onClick={() => {
              setFilter("completed");
              handleFilteredTasks("completed");
            }}
          >
            Сделано ({taskCounts.completed})
          </button>
        </li>
      </ul>
    </div>
  );
}
