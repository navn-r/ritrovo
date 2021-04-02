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
      createdAt
      updatedAt
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const NEW_POST = gql`
  mutation($input: PostInput!) {
    post(input: $input) {
      _id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation($input: PostUpdateInput!) {
    updatePost(input: $input) {
      _id
    }
  }
`;

export const DELETE_POST = gql`
  mutation ($input: PostDeleteInput!) {
    deletePost(input: $input) {
      _id
    }
  }
`;
