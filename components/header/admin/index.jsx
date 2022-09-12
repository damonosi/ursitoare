import Link from "next/link";

import styles from "./Menu.module.scss";
import { useState, useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import useOnclickOutside from "react-cool-onclickoutside";

const AdminMenu = () => {
  const [mobileMenu, setCloseMobileMenu] = useState(false);
  const ref = useOnclickOutside(() => {
    setCloseMobileMenu();
  });

  return (
    <>
      {!mobileMenu ? (
        <div
          onClick={() => setCloseMobileMenu(!mobileMenu)}
          className={styles.arrowBackground}
        >
          <div className={styles.openArrow}>
            <div className={styles.tooltip}>
              <AiOutlineArrowRight size={"2em"} />
              <span className={styles.tooltiptext}>Deschide Meniul</span>
            </div>
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
        <div className={styles.closeArrow}>
          <AiOutlineArrowLeft
            size={"2em"}
            onClick={() => setCloseMobileMenu(!mobileMenu)}
          />
        </div>
        <ul>
          <li>
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
          <li>
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
          <li>
            <Link href="/dashboard/admin/evenimente-acceptate">
              <a>
                <button className="explore">
                  EVENIMENTE ACCEPTATE<span className={styles.iconRight}></span>
                  <span
                    className={`${styles.iconRight} ${styles.after}`}
                    data-before="EVENIMENTE"
                  ></span>
                </button>
              </a>
            </Link>
          </li>
          <li>
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
          <li>
            <Link href="/dashboard/admin/program-azi">
              <a>
                <button className="explore">
                  PROGRAM ASTAZI<span className={styles.iconRight}></span>
                  <span
                    className={`${styles.iconRight} ${styles.after}`}
                    data-before="AZI"
                  ></span>
                </button>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/admin/cereri-de-rezervare">
              <a>
                <button className="explore">
                  PROGRAM SAPTAMANA ASTA
                  <span className={styles.iconRight}></span>
                  <span
                    className={`${styles.iconRight} ${styles.after}`}
                    data-before="SAPTAMANA ASTA"
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
