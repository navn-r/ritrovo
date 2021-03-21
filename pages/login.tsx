import { faAt, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import styles from "../styles/Login.module.css";

const Login: React.FC = () => {
  const onFormSubmit = (target: any) => {
    const formData = new FormData(target);
    const input: Record<string, string | null> = {};
    ["username", "password"].forEach(
      (i) => (input[i] = formData.get(i) as string | null)
    );
    if(Object.values(input).some(i => !i)) {
      return;
    }

    console.log(input);
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
              <FontAwesomeIcon height="25" width="25" icon={faAt} color="var(--blue)"/>
              <input type="text" name="username" placeholder="username" />
            </div>
            <div>
              <FontAwesomeIcon height="25" width="25" icon={faKey} color="var(--blue)"/>
              <input type="password" name="password" placeholder="password" />
            </div>
            <input type="submit" value="Login / Signup" />
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
