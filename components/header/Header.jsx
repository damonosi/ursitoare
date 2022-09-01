import styles from "./Header.module.scss";
import NavMenu from "./NavMenu";
import { useState, useRef, useEffect } from "react";
import { Fade as Hamburger } from "hamburger-react";
import useScrollDirection from "./../../utils/hooks/useScrollDirection";

const Header = () => {
  const [openNavMenu, setOpenNavMenu] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);
  const closeNavMenu = () => setOpenNavMenu(false);
  // scroll direction hook

  const scrollDirection = useScrollDirection();

  return (
    <header
      className={
        scrollDirection === "down"
          ? styles.headerContainer2
          : styles.headerContainer
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
