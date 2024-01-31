import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { useMutation } from '@apollo/client';
import { CREATE_TASK } from '../graphql/mutations'; // Import the CREATE_TASK mutation
import { gql } from '@apollo/client';
import { Link } from 'react-router-dom';

interface Task {
  _id: string;
  title: string;
  description: string;
  schedule: string; // Assuming schedule is a string representing date and time
  accomplished: boolean;
}

interface User {
  _id: string;
  tasks: Task[];
}

export const Tasks = () => {
  const [user, setUser] = useState<User | null>(null);
  const [createTask] = useMutation(CREATE_TASK);

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

  const handleAddTask = async () => {
    // Assume createTask is a mutation function obtained from useMutation hook
    try {
      await createTask({
        variables: { title: "New Task", schedule: new Date().toISOString() },
        update: (cache, { data }) => {
          if (data?.createTask) {
            cache.modify({
              fields: {
                user: (existingUserRef) => {
                  const newTaskRef = cache.writeFragment({
                    data: data.createTask,
                    fragment: gql`
                      fragment NewTask on Task {
                        _id
                        title
                        description
                        schedule
                        accomplished
                      }
                    `,
                  });

                  return {
                    ...existingUserRef,
                    tasks: [...existingUserRef.tasks, newTaskRef],
                  };
                },
              },
            });
          }
        },
      });

      // Redirect to the task editor page with the new task ID
      window.location.href = `/task/`;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Tasks Viewer Page</h1>
      <Link to="/task/taskId">
      <button onClick={handleAddTask}>Add new task</button>
      </Link>
      {user ? (
        <ul>
          {user.tasks.map((task) => (
            <li key={task._id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Schedule: {task.schedule}</p>
              <p>Accomplished: {task.accomplished ? 'Yes' : 'No'}</p>
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
