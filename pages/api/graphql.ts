import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../apollo/schema";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

dotenv.config({ path: ".env.local" });

const verifyToken = (token?: string) => {
  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.SECRET_KEY ?? 'ritrovo');
  } catch {
    return null;
  }
}

export const getContext = ({req, res}: any) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('access-token');
  const user = verifyToken(token);
  return { cookies, user };
}

const server = new ApolloServer({
  schema,
  context: ({ req, res }: any) => getContext({req, res}),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: "/api/graphql" });
