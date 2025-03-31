import {useState, useEffect} from 'react'
import './Styles/App.css'
import TodoForm from "./components/TodoForm/TodoForm.jsx";
import TodoTasks from "./components/TodoTasks/TodoTasks.jsx";
import TodoListOfTasks from "./components/TodoListOfTasks/TodoListOfTasks.jsx";


export function App() {

	const TODO_API = 'https://easydev.club/api/v1/todos'


	const [tasks, setTasks] = useState([])
	const [taskValue, setTaskValue] = useState('')
	const [filter, setFilter] = useState("all");


	useEffect(() => {
		fetchFilteredTasks(filter);
	}, [filter]);


	const fetchFilteredTasks = async (filter) => {
		try {
			const response = await fetch(`${TODO_API}?filter=${filter}`);
			const data = await response.json();

			setTasks(data.data);
		} catch (error) {
			console.error("Ошибка при получении задач:", error);
		}
	};


	const toUpperCase = (str) => {
		const firstLetter = str.trim().at(0).toUpperCase()
		const otherLetters = str.trim().slice(1)
		return firstLetter + otherLetters
	}

	const switchIsEditing = (id) => {
		setTasks(tasks.map((task) =>
				task.id === id
						? {...task, isEditing: !task.isEditing}
						: task
		))
	}

	const deleteTask = async (id) => {
		try {
			const response = await fetch(`${TODO_API}/${id}`, {
				method: 'DELETE',
			});


			 if (!response.ok) {
				throw new Error("Ошибка при удалении задачи");
			}

			setTasks(tasks.filter(task => task.id !== id));
		} catch (error) {
			console.error('Ошибка удаления задачи:', error);
		}
	};

	const addTask = async (element) => {
		element.preventDefault()
		const checkLengthOfValue = taskValue.trim().length
		if (checkLengthOfValue < 2 || checkLengthOfValue > 64) {
			alert('количество символов минимум 2 максимум 64')
			return
		}

		try {
			const response = await fetch(TODO_API, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: toUpperCase(taskValue),
					isDone: false,
				}),
			})

			if (!response.ok) {
				throw new Error('Ошибка добавления задачи');
			}


			await fetchFilteredTasks(filter)
			setTaskValue('')
		} catch (error) {
			console.error('Ошибка добавления задачи:', error);
		}
	}

	const switchIsDone = async (id) => {
		try {

			const task = tasks.find((task) => task.id === id);

			if (filter !== "all") {
				setTasks((prevTasks) =>
						prevTasks.map((task) =>
								task.id === id
										? { ...task, isDone: !task.isDone, hidden: true }
										: task
						)
				);

				await fetch(`${TODO_API}/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ isDone: !task.isDone }),
				});


				setTimeout(() => fetchFilteredTasks(filter), 300);
			} else {

				setTasks((prevTasks) =>
						prevTasks.map((task) =>
								task.id === id
										? { ...task, isDone: !task.isDone }
										: task
						)
				);

				await fetch(`${TODO_API}/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ isDone: !task.isDone }),
				});


				await fetchFilteredTasks(filter);
			}
		} catch (error) {
			console.error("Ошибка изменения статуса:", error);
		}
	};



	const changeValueInInput = async (event, id, value) => {
		event.preventDefault();

		try {
			const response = await fetch(`${TODO_API}/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: value })
			});

			if (!response.ok) {
				throw new Error(`Ошибка HTTP: ${response.status}`);
			}

			const updatedTask = await response.json();


			setTasks(tasks.map(task =>
					task.id === id
							? { ...task, title: updatedTask.title , isEditing: !task.isEditing}
							: task
			));

		} catch (error) {
			console.error('Ошибка при изменении задачи:', error);
		}
	};


	return (
			<>
				<TodoForm
						taskValue={taskValue}
						setTaskValue={setTaskValue}
						addTask={addTask}

				/>
				<TodoListOfTasks
						api = {TODO_API}
						tasks={tasks}
						setFilter = {setFilter}
						filter = {filter}
				/>

				<TodoTasks
						tasks={tasks}
						deleteTask={deleteTask}
						switchIsEditing={switchIsEditing}
						changeTaskValueButton={changeValueInInput}
						switchIsDone={switchIsDone}
				/>
			</>
	)
}