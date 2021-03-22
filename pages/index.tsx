import { useQuery } from "@apollo/client";
import { faHandSpock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { POSTS } from "../apollo/requests";
import Menu from "../components/menu/Menu";
import styles from "../styles/Home.module.css";
import { getContext } from "./api/graphql";

interface HomeProps {
  user: string;
}
const Home: React.FC<HomeProps> = ({ user }) => {
  const { data, loading } = useQuery(POSTS);
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard | Ritrovo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu></Menu>
      <main className={styles.main}>
        <h1 className={styles.title}>Hi, @{user} <FontAwesomeIcon icon={faHandSpock} color="yellow"></FontAwesomeIcon></h1>
        {!loading && <pre>{JSON.stringify(data ?? [])}</pre>}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { user } = getContext({ req, res });
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: {},
    };
  } else {
    const props = {
      user:
        typeof user === "object"
          ? (user as any)._id
          : typeof user === "string"
          ? user
          : "username",
    };

    return { props };
  }
};

export default Home;
