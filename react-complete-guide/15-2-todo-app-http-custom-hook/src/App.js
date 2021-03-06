import React, {useCallback, useEffect, useState} from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from "./hooks/use-http";

function App() {
	const [tasks, setTasks] = useState([]);
	let {error, isLoading, sendRequest: fetchTasks} = useHttp();

	useEffect( async () => {
		const transformTasks = tasksObj => {
			const loadedTasks = [];

			for (const taskKey in tasksObj) {
				loadedTasks.push({
					id: taskKey,
					text: tasksObj[taskKey].text
				});
			}

			setTasks(loadedTasks);
		}

		await fetchTasks(transformTasks, {
			url: 'https://whee-hello-firebase-default-rtdb.firebaseio.com/tasks.json',
		})
	}, [fetchTasks])

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

	return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
