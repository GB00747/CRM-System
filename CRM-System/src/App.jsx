import {useState, useEffect} from 'react'
import {fetchFilteredTasksApi, addTaskApi, updateTaskTitleApi, updateTaskStatusApi, deleteTaskApi} from './api/api.js'


import './Styles/App.css'
import TodoForm from "./components/TodoForm/TodoForm.jsx";
import TodoTasks from "./components/TodoTasks/TodoTasks.jsx";
import TodoListOfTasks from "./components/TodoListOfTasks/TodoListOfTasks.jsx";


export function App() {


	const [tasks, setTasks] = useState([])
	const [taskValue, setTaskValue] = useState('')
	const [filter, setFilter] = useState("all");


	useEffect(() => {
		handleFilteredTasks(filter);
	}, [filter]);




	const handleFilteredTasks = async (filter) => {
		const data = await fetchFilteredTasksApi(filter);
		if (data) setTasks(data.data)
	}

	const deleteTask = async (id,filter) => {
		await deleteTaskApi(id)
		await handleFilteredTasks(filter)
	};

	const addTask = async (event, taskValue) => {
		event.preventDefault();

		if (!taskValue) return;

		const checkLengthOfValue = taskValue.trim().length;
		if (checkLengthOfValue < 2 || checkLengthOfValue > 64) {
			alert('количество символов минимум 2 максимум 64');
			return;
		}

		const newTask = await addTaskApi(taskValue.trim());
		if (newTask) {
		await 	handleFilteredTasks(filter);
			setTaskValue('');
		}
	};


	const switchIsDone = async (id, filter) => {
		await updateTaskStatusApi(id);
		await handleFilteredTasks(filter);
	};



	const changeValueInInput = async (event, id, title, filter) => {
		event.preventDefault();

		const updateTaskValue = await updateTaskTitleApi(id, title);
		if (updateTaskValue) await handleFilteredTasks(filter)
	}



	return (
			<>
				<TodoForm
						taskValue={taskValue}
						setTaskValue={setTaskValue}
						addTask={addTask}

				/>
				<TodoListOfTasks
						handleFilteredTasks = {handleFilteredTasks}
						tasks={tasks}
						setFilter = {setFilter}
						filter = {filter}
				/>

				<TodoTasks
						tasks={tasks}
						deleteTask={deleteTask}
						changeValueInInput={changeValueInInput}
						switchIsDone={switchIsDone}
						filter={filter}
				/>
			</>
	)
}