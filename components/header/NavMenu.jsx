import { motion } from "framer-motion";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import styles from "./Header.module.scss";

const NavMenu = ({ openNavMenu, closeNavMenu }) => {
  const { status, data: session } = useSession();
  const logoutClickHandler = () => {
    signOut({ callbackUrl: "/auth/login" });
  };
  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{ duration: 0.35 }}
      className={styles.meniu}
    >
      <div className={styles.navLinks}>
        <li onClick={() => openNavMenu && closeNavMenu()}>
          <Link href="/">
            <a>Acasa</a>
          </Link>
        </li>
        <li onClick={() => openNavMenu && closeNavMenu()}>
          <Link href="/formular">
            <a>Faceti o Rezervare</a>
          </Link>
        </li>
      </div>
      <hr />
      <div className={styles.dashLinks}>
        {session?.user.isadmin ? (
          <li onClick={() => openNavMenu && closeNavMenu()}>
            <Link href="/dashboard/admin">
              <a>Rezervari</a>
            </Link>
          </li>
        ) : (
          ""
        )}
        {session?.user.isursitoare ? (
          <li onClick={() => openNavMenu && closeNavMenu()}>
            <Link href="/dashboard/ursitoare">
              <a>Program</a>
            </Link>{" "}
          </li>
        ) : (
          ""
        )}

        <li onClick={() => openNavMenu && closeNavMenu()}>
          {status === "loading" ? (
            "Loading"
          ) : session?.user ? (
            <Link href="#">
              <a className="" onClick={logoutClickHandler}>
                Deconectare
              </a>
            </Link>
          ) : (
            <Link href="/auth/login">
              <a className="">Conectare</a>
            </Link>
          )}
        </li>
      </div>
    </motion.ul>
  );
};

export default NavMenu;
