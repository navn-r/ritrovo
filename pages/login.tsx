import { useMutation, useQuery } from "@apollo/client";
import { faAt, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IS_LOGGED_IN, LOGIN } from "../apollo/requests";
import Spinner from "../components/spinner/Spinner";
import styles from "../styles/Login.module.css";

const Login: React.FC = () => {
  const [err, setErr] = useState<string>("");
  const { data, loading } = useQuery(IS_LOGGED_IN);
  const [login] = useMutation(LOGIN);
  const router = useRouter();

  const onFormSubmit = async (target: any) => {
    setErr("");
    const formData = new FormData(target);
    const input: Record<string, string | null> = {
      _id: formData.get("username") as string | null,
      password: formData.get("password") as string | null,
    };
    if (!input._id || !input.password) {
      return;
    }
    const { data: loginData } = await login({ variables: { input } });
    if (!!loginData && !!loginData.login) {
      router.replace("/");
    } else {
      setErr("Incorrect Password");
    }
  };

  useEffect(() => {
    if (!!data && !!data.isLoggedIn) {
      router.replace("/");
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | Ritrovo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading ? (
        <Spinner className={styles.spinner} />
      ) : (
        <main className={styles.main}>
          <div className={styles.left}>
            <h1>Ritrovo</h1>
            <h3>your meeting place</h3>
          </div>
          <div
            className={styles.right}
          >
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
                <input type="text" name="username" placeholder="username"/>
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
            {!!err.length && <p className={styles.error}><span>Error:</span> {err}</p>}
          </div>
        </main>
      )}
    </div>
  );
};

export default Login;
