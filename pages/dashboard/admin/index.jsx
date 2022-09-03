import Link from "next/link";
import styles from "./Menu.module.scss";

const AdminMenu = () => {
  return (
    <div className={styles.adminMenuContainer}>
      <ul>
        <li>
          <h1>Meniu admin</h1>
        </li>
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
          <Link href="/dashboard/admin/cereri-de-rezervare">
            <a>
              <button className="explore">
                Cereri de Rezervare<span className={styles.iconRight}></span>
                <span
                  className={`${styles.iconRight} ${styles.after}`}
                  data-before="CERERI"
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
                PROGRAM SAPTAMANA ASTA<span className={styles.iconRight}></span>
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
  );
};

AdminMenu.Admin = true;
export default AdminMenu;
