import styles from "./Header.module.scss";
import NavMenu from "./NavMenu";
import { useState, useRef, useEffect } from "react";
import { Fade as Hamburger } from "hamburger-react";

const Header = () => {
  const [openNavMenu, setOpenNavMenu] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);
  const closeNavMenu = () => setOpenNavMenu(false);
  useEffect(() => {
    const listener = () => {
      if (window.scrollY > 40) {
        setAnimateHeader(true);
      } else setAnimateHeader(false);
    };

    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);
  return (
    <header
      className={
        animateHeader ? styles.headerContainer : styles.headerContainer2
      }
    >
      <div className={styles.logo}>
        <h2>Logo</h2>
      </div>
      <div className={styles.titlu}>
        <h1>Ursitoare Bacau</h1>
      </div>

      <div className={styles.navCont}>
        <Hamburger
          toggled={openNavMenu}
          onToggle={() => setOpenNavMenu(!openNavMenu)}
        />
        {!openNavMenu ? (
          ""
        ) : (
          <NavMenu openNavMenu={openNavMenu} closeNavMenu={closeNavMenu} />
        )}
      </div>
    </header>
  );
};

export default Header;
