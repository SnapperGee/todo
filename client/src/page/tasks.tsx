// TasksViewer.tsx
import React, { useEffect, useState } from 'react';

interface Task {
  id: number;
  title: string;
  description: string;
  // Add properties as needed here
}

export const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Fetch tasks from backend here
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks'); // Adjust the API endpoint
        if (!response.ok) {
          throw new Error(`Error fetching tasks: ${response.statusText}`);
        }

        const data = await response.json();
        setTasks(data); // Assuming the response contains an array of tasks
      } catch (error) {
        console.error((error as Error).message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <h1>Tasks Viewer Page</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            {/* Display other task details as needed */}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Tasks;
