import { gql } from '@apollo/client';

export const GET_USER = gql`
    query loggedInUser {
        loggedInUser {
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

export const GET_TASKS = gql`
    query tasksOfLoggedInUser {
        tasksOfLoggedInUser {
            _id
            title
            accomplished
            schedule
        }
    }
`;
