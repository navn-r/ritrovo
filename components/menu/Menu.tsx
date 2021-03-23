import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { LOGOUT } from "../../apollo/requests";
import styles from "./Menu.module.css";

const Menu: React.FC = () => {
  const [logout] = useMutation(LOGOUT);
  const router = useRouter();

  const onLogOut = async () => {
    await logout();
    router.replace('/login');
  }

  return (
    <div className={styles.menu}>
      <h1 className={styles.title}>Ritrovo</h1>
      <div className={styles.inner}>
        <div className={styles.tab}>Dashboard</div>
      </div>
      <button onClick={() => onLogOut()} className={styles.button}>LOG OUT</button>
      <span className={styles.bottomTitle}>your meeting place</span>
    </div>
  );
};

export default Menu;