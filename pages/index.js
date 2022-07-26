import Image from "next/image";

import { motion, useViewportScroll } from "framer-motion";

import styles from "./Home.module.scss";

export default function Home() {
  const { scrollYProgress } = useViewportScroll();
  console.log(scrollYProgress);
  return (
    <div className={styles.container}>
      <div className={styles.spatiu}>
        <h1>Un inceput de drum corect</h1>
        <h1>Momente deosebite</h1>
      </div>
      <motion.div
        className={styles.homeImage}
        initial={{ x: 300, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 4 }}
        exit={{ x: -300, opacity: 0 }}
      ></motion.div>
    </div>
  );
}
