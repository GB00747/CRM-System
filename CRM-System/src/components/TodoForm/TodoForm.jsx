import styles from "./TodoForm.module.css";
import { addTaskApi } from "../../api/api.js";
import { useState } from "react";

export default function TodoForm({ updateTasks }) {
  const [taskValue, setTaskValue] = useState("");

  const addTask = async (event, taskValue) => {
    event.preventDefault();

    if (!taskValue) return;

    const checkLengthOfValue = taskValue.trim().length;
    if (checkLengthOfValue < 2 || checkLengthOfValue > 64) {
      alert("количество символов минимум 2 максимум 64");
      return;
    }

    const newTask = await addTaskApi(taskValue.trim());
    if (newTask) {
      setTaskValue("");
      updateTasks();
    }
  };
  return (
    <form
      className={styles.form}
      onSubmit={(event) => addTask(event, taskValue)}
    >
      <input
        className={styles.input}
        type="text"
        placeholder="Task to be done..."
        value={taskValue}
        onChange={(event) => setTaskValue(event.target.value)}
      />
      <button className={styles.button} type="submit" title="Добавить">
        Add
      </button>
    </form>
  );
}
