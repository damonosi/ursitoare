import styles from "./Home.module.scss";
import Image from "next/image";
import { useEffect } from "react";
import {
  motion,
  useViewportScroll,
  useAnimationControls,
  useMotionValue,
  useTransform,
} from "framer-motion";

import Ursitoare from "../../public/images/ursitoareIntroCrop.png";

const HomePage = () => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 1.8 },
    }));
  }, [controls]);
  return (
    <div className={styles.homeContainer}>
      <section className={styles.secIntroducere}>
        <motion.div
          custom={0}
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 700 }}
          transition={{ duration: 2 }}
          className={styles.textIntro}
        >
          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            custom={1}
            animate={controls}
            transition={{ duration: 1 }}
          >
            Bucurati-va de
          </motion.h1>
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            custom={2}
            animate={controls}
            transition={{ duration: 1 }}
          >
            momente de neuitat
          </motion.h2>
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            custom={3}
            animate={controls}
            transition={{ duration: 1 }}
          >
            impreuna cu familia
          </motion.h2>
          <motion.h4
            initial={{ x: -100, opacity: 0 }}
            custom={4}
            animate={controls}
            transition={{ duration: 1 }}
          >
            alaturi de 3 zane ursitoare
          </motion.h4>
        </motion.div>
        <motion.div
          initial={{ x: 200 }}
          animate={{ x: -550 }}
          transition={{ duration: 2 }}
          className={styles.imgIntroducere}
        >
          <Image src={Ursitoare} alt="ursitoare1" />
        </motion.div>
      </section>
      <section>
        <h1>Sectiune despre noi</h1>
      </section>
      <section>
        <h1>Sectiune echipa</h1>
      </section>
      <section>
        <h1>Sectiune oferta</h1>
      </section>
      <section>
        <h1>Sectiune echipa</h1>
      </section>
    </div>
  );
};

export default HomePage;
