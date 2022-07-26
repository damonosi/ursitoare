import styles from "./CasetaEveniment.module.scss";

const CasetaEveniment = ({ children }) => {
  return <div className={styles.casetaContainer}>{children}</div>;
};

export default CasetaEveniment;
