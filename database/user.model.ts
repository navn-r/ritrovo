import { Document, Schema, model, Model } from "mongoose";

export interface IUser extends Document {
  _id: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

const UserSchema: Schema = new Schema(
  {
    _id: {
      type: String,
      required: "username is required",
      unique: "username already exists",
      trim: true,
    },
    password: {
      type: String,
      required: "password is required",
    },
  },
  {
    timestamps: true,
  }
);

let User: Model<IUser>;

try {
  User = model<IUser>('User', UserSchema);
} catch (e) {
  User = model('User');
}

export default User;