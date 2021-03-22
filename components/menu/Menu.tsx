import styles from "./Menu.module.css";

const Menu: React.FC = () => {
  return (
    <div className={styles.menu}>
      <h1 className={styles.title}>Ritrovo</h1>
      <div className={styles.inner}>
        <div className={styles.tab}>Dashboard</div>
      </div>
      <span className={styles.bottomTitle}>your meeting place</span>
    </div>
  );
};

export default Menu;
