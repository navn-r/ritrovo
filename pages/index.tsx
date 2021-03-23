import { useQuery } from "@apollo/client";
import { faHandSpock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Post } from "../apollo/generated-types";
import { POSTS } from "../apollo/requests";
import Menu from "../components/menu/Menu";
import PostCard from "../components/post-card/PostCard";
import Spinner from "../components/spinner/Spinner";
import styles from "../styles/Home.module.css";
import { getContext } from "./api/graphql";

const GREETINGS: string[] = [
  "Hi,",
  "Howdy,",
  "Hola,",
  "What's poppin?",
  "How do you do?"
];

interface HomeProps {
  user: string;
  greeting: string;
}
const Home: React.FC<HomeProps> = ({ user, greeting }) => {
  const { data, loading } = useQuery(POSTS);
  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard | Ritrovo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu></Menu>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {greeting} @{user}{" "}
          <FontAwesomeIcon icon={faHandSpock} color="yellow"></FontAwesomeIcon>
        </h1>
        <div className={loading ? styles.loading : styles.postContainer}>
          {loading ? (
            <Spinner className={styles.spinner} />
          ) : (
            data.posts.map((post: Post) => (
              <PostCard key={post._id} post={post} />
            ))
          )}
        </div>
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
      greeting: GREETINGS[Math.floor(Math.random() * GREETINGS.length)],
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
