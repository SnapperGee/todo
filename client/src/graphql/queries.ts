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
    query getTask($id: ID!) {
        task(id: $id) {
            _id
            user
            title
            accomplished
            schedule
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
        }
    }
`;
