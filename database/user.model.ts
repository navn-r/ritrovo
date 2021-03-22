import { Document, Schema, model, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUserInput {
  _id: string;
  password: string;
}

export interface IUser extends Document {
  _id: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
  comparePassword: (newPass: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    _id: {
      type: String,
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

UserSchema.methods.comparePassword = async function(newPass: string) {
  const user = this as IUser;
  return bcrypt.compare(newPass, user.password);
};

UserSchema.pre("save", function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

let User: Model<IUser>;

try {
  User = model<IUser>("User", UserSchema);
} catch (e) {
  User = model("User");
}

export default User;
