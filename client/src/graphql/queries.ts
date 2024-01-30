import { gql } from '@apollo/client';

export const GET_USER = gql`
    query user {
        user {
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
                schedule
            }
            pendingTasks {
                _id
                title
                schedule
            }
        }
    }
`;

export const GET_TASK = gql`
    query task($id: ID!) {
        task(id: $id) {
            _id
            title
            accomplished
            schedule
        }
    }
`;

export const GET_TASKS = gql`
    query tasks {
        tasks {
            _id
            title
            accomplished
            schedule
        }
    }
`;
