import dbConnect from "../database";
import Post, { IPostInput } from "../database/post.model";
import User from "../database/user.model";

const UserResolvers = {
  Query: {
    users: async () => {
      await dbConnect();
      return User.find();
    },
  },

  Mutation: {},
};

const PostResolvers = {
  Query: {
    posts: async () => {
      await dbConnect();
      return Post.find();
    },

    postById: async (_: any, { id }: { id: string }) => {
      await dbConnect();
      return Post.findById(id);
    },

    postsByAuthor: async (_: any, { author }: { author: string }) => {
      await dbConnect();
      return Post.find({ author });
    },
  },

  Mutation: {
    post: async (_: any, { input }: { input: IPostInput }) => {
      await dbConnect();
      const newPost = new Post(input);
      return newPost.save();
    },

    updatePost: async (_: any, { input: { _id, title, body } }: { input: IPostInput }) => {
      await dbConnect();
      return Post.findByIdAndUpdate(_id!, { title, body }, { new: true });
    },

    deletePost: async (_: any, { _id }: { _id: string }) => {
      await dbConnect();
      return Post.findByIdAndRemove(_id);
    },
  },
};

export const resolvers = {
  Query: { ...UserResolvers.Query, ...PostResolvers.Query },
  Mutation: { ...UserResolvers.Mutation, ...PostResolvers.Mutation },
};
