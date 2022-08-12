import styles from "./CasetaEveniment.module.scss";
import Collapsible from "react-collapsible";
import { useState } from "react";

const CasetaEveniment = ({ children, eveniment }) => {
  const [border, setBorder] = useState(false);
  return (
    <div className={border ? styles.cuBorder : styles.casetaContainer}>
      <Collapsible
        trigger={
          <button
            className={styles.buttonRez}
            onClick={() => setBorder(!border)}
          >
            <h1> {!border ? eveniment?.numecopil : "X"}</h1>
          </button>
        }
      >
        {children}
      </Collapsible>
    </div>
  );
};

export default CasetaEveniment;
