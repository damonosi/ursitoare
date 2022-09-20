import { useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";

import styles from "./Spinner.module.scss";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Spinner = () => {
  let [color, setColor] = useState("#3440eb");
  return (
    <div className={styles.loaderContainer}>
      <CircleLoader color={color} cssOverride={override} size={100} />
    </div>
  );
};

export default Spinner;
