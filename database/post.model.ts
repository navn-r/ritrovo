import { Document, Schema, model, Model } from "mongoose";
import { IUser } from "./user.model";

export interface IPostInput {
  _id?: IPost['_id'];
  title: IPost['title'];
  author: IPost['author'];
  body: IPost['body'];
}

export interface IPost extends Document {
  _id: string;
  title: string;
  author: IUser['_id'];
  body: string;
  createdAt?: string;
  updatedAt?: string;
}

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let Post: Model<IPost>;

try {
  Post = model<IPost>('Post', PostSchema);
} catch (e) {
  Post = model('Post');
}

export default Post;