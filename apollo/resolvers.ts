import dbConnect from "../database";
import PostModel from "../database/post.model";
import UserModel from "../database/user.model";

const UserResolvers = {
  Query: {
    users: async () => {
      await dbConnect();
      return UserModel.find();
    },
  },
};

const PostResolvers = {
  Query: {
    posts: async () => {
      await dbConnect();
      return PostModel.find();
    },
    postById: async (_: any, { id }: { id: string }) => {
      await dbConnect();
      return PostModel.findById(id);
    },
    postsByAuthor: async (_: any, { author }: { author: string }) => {
      await dbConnect();
      return PostModel.find({ author });
    },
  },
};

export const resolvers = {
  Query: { ...UserResolvers.Query, ...PostResolvers.Query },
};
