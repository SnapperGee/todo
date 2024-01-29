import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($username: String!) {
        login(username: $username, password: $password) {
            token
            user{
                _id
                username
            }
        }
    }
`;

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

export const CREATE_TASK = gql`
    mutation createTask($title: String!, $schedule: String!) {
        createTask(title: $title, schedule: $schedule) {
            _id
            title
            schedule
            accomplished
        }
    }
`;

export const SET_USERNAME = gql`
    mutation setUsername($username: String!) {
        setUsername(username: $username) {
            user{
                _id
                username
            }
        }
    }
`;

export const SET_PASSWORD = gql`
    mutation setPassword($password: String!) {
        setPassword(password: $password) {
            user{
                _id
                username
            }
        }
    }
`;

export const SET_TASK_TITLE = gql`
    mutation setTaskTitle($id: ID!, $title: String!) {
        setTaskTitle(id: $id, title: $title) {
            _id
            title
            schedule
            accomplished
        }
    }
`;

export const SET_TASK_ACCOMPLISHED = gql`
    mutation setTaskAccomplished($id: ID!, $accomplished: Boolean!) {
        setTaskAccomplished(id: $id, accomplished: $accomplished) {
            _id
            title
            schedule
            accomplished
        }
    }
`;

export const DELETE_USER = gql`
    mutation deleteUser {
        deleteUser {
            _id
            username
        }
    }
`;

export const DELETE_TASK = gql`
    mutation deleteTask($id: ID!) {
        deleteTask(id: $id) {
            _id
            title
            schedule
            accomplished
        }
    }
`;

export const DELETE_TASKS = gql`
    mutation deleteTasks($ids: [ID!]!) {
        deleteTasks(ids: $ids) {
            ok: Int!
            deletedCount: Int!
        }
    }
`;
