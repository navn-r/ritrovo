import { useMutation, useQuery } from "@apollo/client";
import { faChevronDown, faHandSpock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Post, PostUpdateInput } from "../apollo/generated-types";
import { DELETE_POST, POSTS, UPDATE_POST } from "../apollo/requests";
import Menu from "../components/menu/Menu";
import NewPost from "../components/new-post/NewPost";
import PostCard from "../components/post-card/PostCard";
import Spinner from "../components/spinner/Spinner";
import styles from "../styles/Dashboard.module.css";
import { getContext } from "./api/graphql";

const GREETINGS: string[] = [
  "Hi,",
  "Howdy,",
  "Hola,",
  "What's poppin?",
  "How do you do?",
];

interface DashboardProps {
  user: string;
  greeting: string;
}
const Dashboard: React.FC<DashboardProps> = ({ user, greeting }) => {
  const { data, loading, refetch } = useQuery(POSTS);
  const [updatePost] = useMutation(UPDATE_POST);
  const [deletePost] = useMutation(DELETE_POST);

  const onDelete = async (_id: string) =>
    deletePost({ variables: { input: { _id } } }).then(() => refetch());

  const onEdit = async (edit: PostUpdateInput) =>
    updatePost({ variables: { input: edit } }).then(() => refetch());

  const onSubmit = async () => Promise.resolve();

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard | Ritrovo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <main className={styles.main}>
        <h1 className={styles.title}>
          {greeting} @{user}{" "}
          <FontAwesomeIcon icon={faHandSpock} color="yellow"></FontAwesomeIcon>
        </h1>
        <NewPost onSubmit={onSubmit} />
        <div className={styles.divider}>
          <div></div>
          <FontAwesomeIcon
            width="3rem"
            color="var(--lilac)"
            icon={faChevronDown}
          ></FontAwesomeIcon>{" "}
          <div></div>{" "}
        </div>
        <div className={loading ? styles.loading : styles.postContainer}>
          {loading ? (
            <Spinner className={styles.spinner} />
          ) : (
            data.posts.map((post: Post) => (
              <PostCard
                key={post._id}
                post={post}
                canEdit={post.author === user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
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

export default Dashboard;
