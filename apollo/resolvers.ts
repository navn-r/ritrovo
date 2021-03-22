import Cookies from "cookies";
import { sign } from "jsonwebtoken";
import dbConnect from "../database";
import Post, { IPostInput } from "../database/post.model";
import User, { IUserInput } from "../database/user.model";

const UserResolvers = {
  Query: {
    users: async () => {
      await dbConnect();
      return User.find();
    },
  },

  Mutation: {
    login: async (
      _: any,
      { input: { _id, password } }: { input: IUserInput },
      { cookies }: { cookies: Cookies }
    ) => {
      await dbConnect();
      const generateTokens = () => {
        const key = process.env.SECRET_KEY ?? "ritrovo";
        const accessToken = sign({ _id }, key);
        cookies.set("access-token", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
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
  },
};

const PostResolvers = {
  Query: {
    posts: async (_: any, __: any, { user }: { user: string }) => {
      if (!user) {
        return null;
      }
      await dbConnect();
      return Post.find();
    },

    postById: async (
      _: any,
      { id }: { id: string },
      { user }: { user: string }
    ) => {
      if (!user) {
        return null;
      }
      await dbConnect();
      return Post.findById(id);
    },

    postsByAuthor: async (
      _: any,
      { author }: { author: string },
      { user }: { user: string }
    ) => {
      if (!user) {
        return null;
      }
      await dbConnect();
      return Post.find({ author });
    },
  },

  Mutation: {
    post: async (
      _: any,
      { input }: { input: IPostInput },
      { user }: { user: string }
    ) => {
      if (!user) {
        return null;
      }
      await dbConnect();
      const newPost = new Post(input);
      return newPost.save();
    },

    updatePost: async (
      _: any,
      { input: { _id, title, body } }: { input: IPostInput },
      { user }: { user: string }
    ) => {
      if (!user) {
        return null;
      }
      await dbConnect();
      return Post.findByIdAndUpdate(_id!, { title, body }, { new: true });
    },

    deletePost: async (
      _: any,
      { _id }: { _id: string },
      { user }: { user: string }
    ) => {
      if (!user) {
        return null;
      }
      await dbConnect();
      return Post.findByIdAndRemove(_id);
    },
  },
};

export const resolvers = {
  Query: { ...UserResolvers.Query, ...PostResolvers.Query },
  Mutation: { ...UserResolvers.Mutation, ...PostResolvers.Mutation },
};
