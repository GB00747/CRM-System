const TODO_API = "https://easydev.club/api/v1/todos"

const apiRequest = async (endpoint, options = {}) => {
	try {
		const response = await fetch(`${TODO_API}${endpoint}`, options);

		if (!response.ok) {
			throw new Error(`Ошибка: ${response.statusText}`);
		}

		return await response.json();

	} catch (error) {
		console.error("Ошибка запроса:", error.message);
		return null;
	}
};




export const deleteTaskApi = async (id) => {
	try {
		const response = await fetch(`${TODO_API}/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
		}


	} catch (error) {
		console.error("Ошибка при удалении задачи:", error.message);
		return null;
	}
};

export const fetchFilteredTasksApi = async (filter) => {
	return apiRequest(`?filter=${filter}`);
};

export const addTaskApi = async (title) => {
	return apiRequest("", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({
			title: title,
		}),
	});
};

export const updateTaskStatusApi = async (id) => {
	const task = await apiRequest(`/${id}`)
	const isDone = task.isDone

	return apiRequest(`/${id}`, {
		method: "PUT",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({isDone: !isDone}),
	});
};

export const updateTaskTitleApi = async (id, title) => {
	return apiRequest(`/${id}`, {
		method: "PUT",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({title}),
	});
};



