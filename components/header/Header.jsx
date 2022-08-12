import styles from "./Header.module.scss";
import NavMenu from "./NavMenu";
import { useState, useEffect } from "react";
import { Fade as Hamburger } from "hamburger-react";

const Header = () => {
  const [showNavBtn, setShowNavBtn] = useState(true);
  const [openNavMenu, setOpenNavMenu] = useState(false);

  const closeNavMenu = () => setOpenNavMenu(false);
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        <h2>Logo</h2>
      </div>
      <div className={styles.titlu}>
        <h1>Ursitoare Bacau</h1>
      </div>
      <div className={styles.navCont}>
        <Hamburger onToggle={() => setOpenNavMenu(!openNavMenu)} />
        <nav className={styles.navMenu}>
          {openNavMenu && (
            <NavMenu openNavMenu={openNavMenu} closeNavMenu={closeNavMenu} />
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
