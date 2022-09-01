import styles from "./Home.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

import Ursitoare from "../../public/images/cortina.png";
import CortinaMobil from "../../public/images/cortina_mobil.png";
import { useMediaQuery } from "react-responsive";
import Oferta from "./oferta/index";

const HomePage = () => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 1.8 },
    }));
  }, [controls]);
  const [mounted, setMounted] = useState(false);
  const isDesktop = useMediaQuery({ query: "(min-width: 767px)" });
  const isTabletPhone = useMediaQuery({ query: "(max-width: 767px)" });
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className={styles.homeContainer}>
      {mounted && isDesktop && (
        <section className={styles.secIntroducere}>
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            transition={{ duration: 2 }}
            className={styles.imgIntroducere}
          >
            <Image src={Ursitoare} alt="ursitoare1" />
          </motion.div>
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2 }}
            className={styles.textIntro}
          >
            <h2>Spectacole</h2>
            <h2>cu zane ursitoare</h2>
          </motion.div>
        </section>
      )}

      {mounted && isTabletPhone && (
        <section className={styles.secIntroducere}>
          <motion.div
            initial={{ x: 10 }}
            animate={{ x: 0 }}
            transition={{ duration: 2 }}
            className={styles.imgIntroducere}
          >
            <Image src={CortinaMobil} alt="ursitoare1" />
          </motion.div>
          <motion.div
            custom={0}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2 }}
            className={styles.textIntro}
          >
            <h2>Bucurati-va de</h2>
            <h2>momente de neuitat</h2>
            <h2>alaturi de trei zane ursitoare</h2>
          </motion.div>
        </section>
      )}

      <section>
        <h1>Sectiune despre noi</h1>
      </section>
      <section>
        <h1>Sectiune echipa</h1>
      </section>
      <section>
        <Oferta />
      </section>
      <section></section>
    </div>
  );
};

export default HomePage;
