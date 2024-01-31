import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { Link } from 'react-router-dom';

interface Task {
  _id: string;
  title: string;
  description: string;
  // Add properties as needed here
}

interface User {
  _id: string;
  tasks: Task[];
}

export const Tasks = () => {
  const [user, setUser] = useState<User | null>(null);

  const { loading, error, data } = useQuery(GET_USER);

  useEffect(() => {
    if (!loading && !error && data) {
      setUser(data.user);
    }
  }, [loading, error, data]);

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error fetching tasks: {error.message}</p>;
  }

  const generateUniqueId = () => {
    // Use a library like 'uuid' or a simple timestamp-based approach
    // For example, using the current timestamp as a unique ID
    return new Date().getTime().toString();
  };

  const handleAddTask = () => {
    generateUniqueId();

    // Navigate to the task edit page with the new task ID
    window.location.href = `/task`;
  };

  return (
    <>
      <h1>Tasks Viewer Page</h1>
      <button onClick={handleAddTask}>Add new task</button>
      {user ? (
        <ul>
          {user.tasks.map((task) => (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              {/* Display other task details as needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available for the current user.</p>
      )}
    </>
  );
};

export default Tasks;
