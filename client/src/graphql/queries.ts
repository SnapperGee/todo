import { gql } from '@apollo/client';

export const GET_USER = gql`
    query getUser($id: ID!) {
        user(id: $id) {
            _id
            username
            tasks {
                _id
                title
                accomplished
                schedule
            }
            accomplishedTasks {
                _id
                title
                accomplished
                schedule
            }
            pendingTasks {
                _id
                title
                accomplished
                schedule
            }
        }
    }
`;

export const GET_TASK = gql`
    query getTask($taskId: ID!) {
        task(taskId: $taskId) {
            _id
            user
            title
            accomplished
            schedule
        }
    }
`;

export const GET_TASKS = gql`
    query getTasks($userId: ID!) {
        tasks(userId: $userId) {
            _id
            user
            title
            accomplished
            schedule
        }
    }
`;
