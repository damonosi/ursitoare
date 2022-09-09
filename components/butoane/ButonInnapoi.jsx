import React from "react";
import { useRouter } from "next/router";
import styles from "./ButonInnapoi.module.scss";

const ButonInnapoi = () => {
  const router = useRouter();
  return (
    <div className={styles.butonInnapoi}>
      <button onClick={() => router.back()}>
        {" "}
        Innapoi
        <span
          className={`${styles.iconRight} ${styles.after}`}
          data-before="Innapoi"
        ></span>{" "}
      </button>
    </div>
  );
};

export default ButonInnapoi;
