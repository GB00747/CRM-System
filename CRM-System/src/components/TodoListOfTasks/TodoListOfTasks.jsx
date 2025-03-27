import {useState, useEffect} from "react";
import styles from "./TodoListOfTasks.module.css";

export default function TodoListOfTasks({setFilter, tasks, api, filter}) {
	const [taskCounts, setTaskCounts] = useState({all: 0, inWork: 0, completed: 0});
	useEffect(() => {
		fetchTaskCounts();
	}, [tasks]);

	const fetchTaskCounts = async () => {
		try {
			const allResponse = await fetch(`${api}?filter=all`);

			const allData = await allResponse.json();

			setTaskCounts({
				all: allData.info.all,
				inWork: allData.info.inWork,
				completed: allData.info.completed,
			});
		} catch (error) {
			console.error("Ошибка при получении количества задач:", error);
		}
	};


	return (
			<div className={styles.container}>
				<ul className={styles.list}>
					<li className={styles.item}>
						<button
								className={`${styles.button} ${filter === 'all' ? styles.active : ''}`}
								onClick={() => setFilter('all')}
						>
							Все ({taskCounts.all})
						</button>
					</li>
					<li className={styles.item}>
						<button
								className={`${styles.button} ${filter === 'inWork' ? styles.active : ''}`}
								onClick={() => setFilter('inWork')}
						>
							В работе ({taskCounts.inWork})
						</button>
					</li>
					<li className={styles.item}>
						<button
								className={`${styles.button} ${filter === 'completed' ? styles.active : ''}`}
								onClick={() => setFilter('completed')}
						>
							Сделано ({taskCounts.completed})
						</button>
					</li>
				</ul>
			</div>
	);
}