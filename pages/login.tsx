import { gql } from "@apollo/client";
import { useMutation } from "@apollo/react-hooks";
import { faAt, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../styles/Login.module.css";
import { GetServerSideProps } from "next";
import { getContext } from "./api/graphql";

const LOGIN = gql`
  mutation($input: UserInput!) {
    login(input: $input)
  }
`;

const Login: React.FC = () => {
  const [login] = useMutation(LOGIN);
  const router = useRouter();

  const onFormSubmit = async (target: any) => {
    const formData = new FormData(target);
    const input: Record<string, string | null> = {
      _id: formData.get("username") as string | null,
      password: formData.get("password") as string | null,
    };
    if (!input._id || !input.password) {
      return;
    }
    const { data } = await login({ variables: { input } });
    if (!!data && !!data.login) {
      router.replace("/");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | Ritrovo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.left}>
          <h1>Ritrovo</h1>
          <h3>your meeting place</h3>
        </div>
        <div className={styles.right}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onFormSubmit(e.target);
            }}
          >
            <div>
              <FontAwesomeIcon
                height="25"
                width="25"
                icon={faAt}
                color="var(--blue)"
              />
              <input type="text" name="username" placeholder="username" />
            </div>
            <div>
              <FontAwesomeIcon
                height="25"
                width="25"
                icon={faKey}
                color="var(--blue)"
              />
              <input type="password" name="password" placeholder="password" />
            </div>
            <input type="submit" value="Login / Signup" />
          </form>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const { user } = getContext({req, res});
  if (!!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  } else {
    return { props: {} };
  }
};

export default Login;
