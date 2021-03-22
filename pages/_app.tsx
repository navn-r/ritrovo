import { ApolloProvider } from "@apollo/react-hooks";
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
