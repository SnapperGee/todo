import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String!) {
        createUser(username: $username, password: $password) {
            token
            user{
                _id
                username
            }
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user{
                _id
                username
            }
        }
    }
`;

export const CREATE_TASK = gql`
    mutation createLoggedInUserTask($title: String!, $schedule: String!) {
        createLoggedInUserTask(title: $title, schedule: $schedule) {
            _id
            title
            schedule
            accomplished
        }
    }
`;
