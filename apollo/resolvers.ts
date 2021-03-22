import { sign } from "jsonwebtoken";
import dbConnect from "../database";
import Post from "../database/post.model";
import User from "../database/user.model";
import { Resolvers } from "./generated-types";

export const resolvers: Resolvers = {
  Query: {
    users: async () => {
      await dbConnect();
      return User.find();
    },

    posts: async (_, __, { user }) => {
      if (!user) {
        return null;
      }
      await dbConnect();
      return Post.find();
    },

    postById: async (_, { id }, { user }) => {
      if (!user) {
        return null;
      }
      await dbConnect();
      return Post.findById(id);
    },

    postsByAuthor: async (_, { author }, { user }) => {
      if (!user) {
        return [];
      }
      await dbConnect();
      return Post.find({ author });
    },
  },
  
  Mutation: {
    login: async (_, { input: { _id, password } }, { cookies }) => {
      await dbConnect();
      const generateTokens = () => {
        const key = process.env.SECRET_KEY ?? "ritrovo";
        const accessToken = sign({ _id }, key);
        cookies.set("access-token", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
        });
        return accessToken;
      };

      let user = await User.findById(_id);

      if (!!user) {
        const valid = await user.comparePassword(password);
        return valid ? generateTokens() : null;
      }

      user = new User({ _id, password });
      await user.save();
      return generateTokens();
    },

    post: async (_, { input }, { user }) => {
      if (!user) {
        return null;
      }
      await dbConnect();
      const newPost = new Post(input);
      return newPost.save();
    },

    updatePost: async (_, { input: { _id, title, body } }, { user }) => {
      if (!user) {
        return null;
      }
      await dbConnect();
      return Post.findByIdAndUpdate(_id!, { title, body }, { new: true });
    },

    deletePost: async (_, { _id }, { user }) => {
      if (!user) {
        return null;
      }
      await dbConnect();
      return Post.findByIdAndRemove(_id);
    },
  },
};
