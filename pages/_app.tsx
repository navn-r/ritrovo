import { ApolloProvider } from "@apollo/client";
import { createClient } from "../apollo/client";
import "../styles/globals.css";

const client = createClient();

const MyApp: React.FC<any> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};
export default MyApp;
