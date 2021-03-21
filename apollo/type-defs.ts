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

  input PostInput {
    title: String!
    author: String!
    body: String!
  }

  input PostUpdateInput {
    _id: ID!
    title: String!
    body: String!
  }

  type Query {
    posts: [Post]
    postById(id: String!): Post
    postsByAuthor(author: String!): [Post]
    users: [User]
  }

  type Mutation {
    post(input: PostInput!): Post
    updatePost(input: PostUpdateInput!): Post
    deletePost(_id: ID!): Post
  }
`;