import { GetServerSideProps } from "next";
import Head from "next/head";
import Menu from "../components/menu/Menu";
import styles from "../styles/Home.module.css";
import { getContext } from "./api/graphql";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard | Ritrovo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu></Menu>
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
    return { props: {} };
  }
};

export default Home;
