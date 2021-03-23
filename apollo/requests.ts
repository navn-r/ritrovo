import { gql } from "@apollo/client";

export const IS_LOGGED_IN = gql`
  query {
    isLoggedIn
  }
`;

export const LOGIN = gql`
  mutation($input: UserInput!) {
    login(input: $input)
  }
`;

export const POSTS = gql`
  query {
    posts {
      _id
      title
      author
      body
      updatedAt
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;