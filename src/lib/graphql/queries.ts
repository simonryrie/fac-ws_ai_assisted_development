import gql from 'graphql-tag';

// Example query to get all users
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      createdAt
    }
  }
`;

// Example query to get a specific user
export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      createdAt
      userTrips {
        id
        startDate
        endDate
      }
    }
  }
`;

// Example mutation to create a user
export const CREATE_USER = gql`
  mutation CreateUser {
    createUser {
      id
      createdAt
    }
  }
`;