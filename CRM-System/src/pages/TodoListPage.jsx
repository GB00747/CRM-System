import { useState, useEffect } from "react";
import {filteredTasksApi} from "../api/api.js";

import "../Styles/App.css";
import TodoForm from "../components/TodoForm/TodoForm.jsx";
import TodoTasks from "../components/TodoTasks/TodoTasks.jsx";
import TodoListOfTasks from "../components/TodoListOfTasks/TodoListOfTasks.jsx";

export function TodoListPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [taskCounts, setTaskCounts] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchFilteredTasksApi(filter);
  }, [filter]);

  const fetchFilteredTasksApi = async (filter) => {
    const data = await filteredTasksApi(filter);
    if (data) {
      setTasks(data.data);
      setTaskCounts(data.info);
    }
  };

  const updateTasks = async () => await fetchFilteredTasksApi(filter);

  const handleChangeFilteredTasks = (filter) => {
    setFilter(filter);
  };

  return (
    <>
      <TodoForm updateTasks={updateTasks} />
      <TodoListOfTasks
        handleChangeFilteredTasks={handleChangeFilteredTasks}
        taskCounts={taskCounts}
        filter={filter}
      />
      <TodoTasks tasks={tasks} updateTasks={updateTasks} />
    </>
  );
}
