import styles from "./Eveniment.module.scss";

const Eveniment = ({ register }) => {
  const toDay = new Date().toLocaleDateString().substring(0, 10);
  return (
    <div className={styles.dateEveniment}>
      <h1>Data eveniment : </h1>
      <div className={styles.randFormular}>
        <label htmlFor="dataeveniment">
          Data evenimentului (luna / ziua / anul )
        </label>
        <input
          type="date"
          defaultValue={toDay}
          {...register("dataeveniment", {
            required: "Va rugam sa data cand are loc evenimentul",
          })}
          className=""
          id="dataeveniment"
        />
      </div>
      <div className={styles.randFormular}>
        <label htmlFor="oraeveniment">Ora preferata </label>
        <input
          type="text"
          {...register("oraeveniment", {
            required: "Va rugam sa ora la care preferati sa venim",
          })}
          id="oraeveniment"
          defaultValue="22.00"
        ></input>
      </div>
      <div className={styles.randFormular}>
        <label htmlFor="localitateeveniment">
          Localitatea unde are loc petrecerea
        </label>
        <input
          type="text"
          {...register("localitateeveniment", {
            required:
              "Va rugam sa specificati localitatea unde are loc evenimentul",
          })}
          id="localitateeveniment"
        ></input>
      </div>
      <div className={styles.randFormular}>
        <label htmlFor="locatieeveniment">Unde are loc petrecerea </label>
        <input
          type="text"
          {...register("locatieeveniment", {
            required:
              "Va rugam sa specificati locatia unde are loc evenimentul",
          })}
          id="locatieeveniment"
        ></input>
      </div>
      <div className={styles.randFormular}>
        <label htmlFor="nrcontact">Numar de Telefon </label>
        <input
          type="tel"
          {...register("nrcontact", {
            required: "Va rugam sa ora la care preferati sa venim",
          })}
          id="nrcontact"
        ></input>
      </div>
    </div>
  );
};

export default Eveniment;
