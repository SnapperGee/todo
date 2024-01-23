import { gql } from '@apollo/client';

export const GET_USER = gql`
    query getUser($id: ID!) {
        user(id: $id) {
            _id
            username
            tasks {
                _id
                title
                subtasks {
                    _id
                    title
                    accomplished
                }
            }
            accomplishedTasks {
                _id
                title
                subtasks {
                    _id
                    title
                    accomplished
                }
            }
            pendingTasks {
                _id
                title
                subtasks {
                    _id
                    title
                    accomplished
                }
            }
        }
    }
`;

export const GET_TASK = gql`
    query getTask($id: ID!) {
        task(id: $id) {
            _id
            user
            title
            accomplished
            schedule
            subTasks {
                _id
                title
                accomplished
            }
            accomplishedSubtasks {
                _id
                title
                accomplished
            }
            pendingSubtasks {
                _id
                title
                accomplished
            }
        }
    }
`;

export const GET_SUBTASK = gql`
    query getSubtask($taskId: ID!, $subtaskId: ID!) {
        subtask(taskId: $taskId, subtaskId: $subtaskId) {
            _id
            task
            title
            accomplished
        }
    }
`;

export const GET_TASKS = gql`
    query getTasks($id: ID!) {
        tasks(id: $id) {
            _id
            user
            title
            accomplished
            schedule
            subTasks {
                _id
                title
                accomplished
            }
            accomplishedSubtasks {
                _id
                title
                accomplished
            }
            pendingTasks {
                _id
                title
                accomplished
            }
        }
    }
`;

export const GET_SUBTASKS = gql`
    query getSubtasks($id: ID!) {
        subtasks(id: $id) {
            _id
            task
            title
            accomplished
        }
    }
`;
