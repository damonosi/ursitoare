import Link from "next/link";

import styles from "./Menu.module.scss";
import { useState, useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import useOnclickOutside from "react-cool-onclickoutside";

const AdminMenu = () => {
  const [mobileMenu, setCloseMobileMenu] = useState(false);

  const closeNavMenu = () => setCloseMobileMenu(false);

  const ref = useOnclickOutside(() => {
    setCloseMobileMenu();
  });

  return (
    <>
      {!mobileMenu ? (
        <div
          className={styles.arrowBackground}
          onClick={() => setCloseMobileMenu(!mobileMenu)}
        >
          <div className={styles.tooltip}>
            <AiOutlineArrowRight size={"2em"} />
            <span className={styles.tooltiptext}>Meniu</span>
          </div>
        </div>
      ) : (
        ""
      )}

      <div
        ref={ref}
        className={
          mobileMenu ? styles.adminMenuContainer : styles.closedAdminMenu
        }
      >
        <h1>Panou de Comanda</h1>

        <hr />
        <div className={styles.closeArrow} onClick={() => closeNavMenu()}>
          <span>x</span>
        </div>
        <ul>
          <li onClick={() => closeNavMenu()}>
            <Link href="/">
              <a>
                <button className="explore">
                  ACASA<span className={styles.iconRight}></span>
                  <span
                    className={`${styles.iconRight} ${styles.after}`}
                    data-before="ACASA"
                  ></span>
                </button>
              </a>
            </Link>
          </li>
          <li onClick={() => closeNavMenu()}>
            <Link href="/dashboard/admin/creati-un-eveniment">
              <a>
                <button className="explore">
                  CREATI UN EVENIMENT<span className={styles.iconRight}></span>
                  <span
                    className={`${styles.iconRight} ${styles.after}`}
                    data-before="CREATI"
                  ></span>
                </button>
              </a>
            </Link>
          </li>
          <li onClick={() => closeNavMenu()}>
            <Link href="/dashboard/admin/organizati-traseul">
              <a>
                <button className="explore">
                  Organizeaza Traseul
                  <span className={styles.iconRight}></span>
                  <span
                    className={`${styles.iconRight} ${styles.after}`}
                    data-before="Confirma"
                  ></span>
                </button>
              </a>
            </Link>
          </li>

          <li onClick={() => closeNavMenu()}>
            <Link href="/dashboard/admin/adauga-ursitoare">
              <a>
                <button className="explore">
                  ADAUGA URSITOARE<span className={styles.iconRight}></span>
                  <span
                    className={`${styles.iconRight} ${styles.after}`}
                    data-before="URSITOARE"
                  ></span>
                </button>
              </a>
            </Link>
          </li>
          <li onClick={() => closeNavMenu()}>
            <Link href="/dashboard/admin/program">
              <a>
                <button className="explore">
                  PROGRAM<span className={styles.iconRight}></span>
                  <span
                    className={`${styles.iconRight} ${styles.after}`}
                    data-before="PROGRAM"
                  ></span>
                </button>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

AdminMenu.Admin = true;
AdminMenu.Auth = true;
export default AdminMenu;
