import Task from "../Task/Task.jsx";
import styles from "./TodoTasks.module.css";

export default function TodoTasks({ tasks, updateTasks }) {
  return (
    <div>
      <ul className={styles.todoList}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} updateTasks={updateTasks} />
        ))}
      </ul>
    </div>
  );
}
