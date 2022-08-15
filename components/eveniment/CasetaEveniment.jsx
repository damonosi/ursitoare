import styles from "./CasetaEveniment.module.scss";
import Collapsible from "react-collapsible";
import { useState } from "react";

const CasetaEveniment = ({ children, eveniment }) => {
  const [border, setBorder] = useState(false);
  return (
    <div className={border ? styles.cuBorder : styles.casetaContainer}>
      <Collapsible
        transitionTime={500}
        transitionCloseTime={500}
        trigger={
          <button
            className={!border ? styles.openBtn : styles.closeBtn}
            onClick={() => setBorder(!border)}
          >
            <>{!border ? <h1>{eveniment?.numecopil}</h1> : <span>X</span>}</>
          </button>
        }
      >
        {children}
      </Collapsible>
    </div>
  );
};

export default CasetaEveniment;
