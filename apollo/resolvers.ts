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
    login: async ( _: any, { input: { _id, password } }: { input: IUserInput }) => {
      await dbConnect();
      // FIXME
      const generateTokens = () => {
        const key = process.env.SECRET_KEY ?? "ritrovo";
        const accessToken = sign({ _id }, key);
        // const refreshToken = sign({ _id }, key);
        // res.cookie("access-token", accessToken);
        // res.cookie("refresh-token", refreshToken);
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

    updatePost: async (
      _: any,
      { input: { _id, title, body } }: { input: IPostInput }
    ) => {
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
