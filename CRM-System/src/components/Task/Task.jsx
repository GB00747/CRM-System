import styles from "./Task.module.css";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { FaRegSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useState } from "react";

export default function Task({
  task,
  deleteTask,
  switchIsDone,
  changeValueInInput,
  filter,
}) {
  const [changingTaskValue, setChangingTaskValue] = useState(task.title);
  const [isEditing, setIsEditing] = useState(false);

  const handleSwitchIsEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const initialTask = (
    <div className={styles.task}>
      <input
        type="checkbox"
        checked={task.isDone}
        onChange={() => {
          switchIsDone(task.id, filter);
        }}
        className={styles.checkbox}
      />
      <div className={styles.title}>{task.title}</div>
      <button
        type="button"
        onClick={handleSwitchIsEditing}
        className={styles.button}
        title="Редактировать"
      >
        <MdEditSquare className={styles.icon} />
      </button>
      <button
        type="button"
        onClick={() => deleteTask(task.id)}
        className={`${styles.button} ${styles.deleteButton}`}
        title="Удалить"
      >
        <AiFillDelete className={styles.icon} />
      </button>
    </div>
  );

  const editTask = (
    <form
      className={styles.form}
      onSubmit={(e) => {
        changeValueInInput(e, task.id, changingTaskValue, filter);
        handleSwitchIsEditing();
      }}
    >
      <input
        className={styles.input}
        type="text"
        value={changingTaskValue}
        onChange={(e) => setChangingTaskValue(e.target.value)}
      />
      <button
        className={styles.button}
        type="submit"
        disabled={changingTaskValue.length < 2 || changingTaskValue.length > 64}
        title="Сохранить"
      >
        <FaRegSave className={styles.icon} />
      </button>
      <button
        className={`${styles.button} ${styles.deleteButton}`}
        onClick={handleSwitchIsEditing}
        type="button"
        title="Отменить"
      >
        <MdCancel className={styles.icon} />
      </button>
    </form>
  );

  return isEditing ? editTask : initialTask;
}
