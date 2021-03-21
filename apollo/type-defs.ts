import { gql } from "@apollo/client";

export const typeDefs = gql`
  type User {
    _id: ID!
    password: String!
    createdAt: String
    updatedAt: String
  }

  type Post {
    _id: ID!
    title: String!
    author: String!
    body: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    posts: [Post]
    postById(id: String!): Post
    postsByAuthor(author: String!): [Post]
    users: [User]
  }
`;