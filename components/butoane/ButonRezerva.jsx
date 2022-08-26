import styles from "./ButonRezerva.module.scss";

const ButonRezerva = ({  onClick }) => {
  return (
    <div className={styles.containerButonRezervari}>
      <button onClick={onClick} className={styles.butonRezervari}>
        <span>Faceti o Rezervare</span>
      </button>
    </div>
  );
};

export default ButonRezerva;
