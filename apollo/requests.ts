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
