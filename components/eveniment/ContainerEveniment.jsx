import React from "react";
import styles from "./ContainerEveniment.module.scss";
const ContainerEveniment = ({ children }) => {
  return <div className={styles.evenimentContainer}>{children}</div>;
};

export default ContainerEveniment;
