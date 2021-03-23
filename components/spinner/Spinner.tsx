import styles from "./Spinner.module.css";

interface SpinnerProps {
  className: string;
}

const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <div className={styles.spinner + ' ' + className}>
      {[0, 1, 2, 3, 4].map((key) => (
        <div key={key} className={styles.circle}>
          <div className={styles.inner}></div>
        </div>
      ))}
    </div>
  );
};

export default Spinner;
