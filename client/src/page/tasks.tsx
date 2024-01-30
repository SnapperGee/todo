import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { CREATE_TASK } from '../graphql/mutations';
import { Link } from 'react-router-dom';

interface Task {
  _id: string;
  title: string;
  description: string;
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
    // Use a library like 'uuid' or a simple timestamp-based approach
    const newTaskId = new Date().getTime().toString();

    try {
      // Use the CREATE_TASK mutation to create a new task
      await createTask({
        variables: { title: "New Task", schedule: new Date().toISOString() },
        update: (cache, { data }) => {
          if (data?.createTask) {
            // Update the cache with the newly created task
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
      window.location.href = `/task/${newTaskId}/edit`;
    } catch (error) {
      console.error(error);
    }
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
              {/* Add Edit button with a Link to the task edit page */}
              <Link to={`/task/${task._id}/edit`}>
                <button>Edit</button>
              </Link>
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