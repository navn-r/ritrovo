import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../apollo/schema";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const server = new ApolloServer({ schema });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: "/api/graphql" });
