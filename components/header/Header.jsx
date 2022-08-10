import Link from "next/link";

import { signOut, useSession } from "next-auth/react";

import styles from "./Header.module.scss";

const Header = () => {
  const { status, data: session } = useSession();

  const logoutClickHandler = () => {
    signOut({ callbackUrl: "/auth/login" });
  };
  return (
    <header>
      <nav className={styles.headerContainer}>
        <div className={styles.logo}>
          <h2>Logo</h2>
        </div>
        <div className={styles.titlu}>
          <h1>Ursitoare Bacau</h1>
        </div>

        <div className={styles.board}>
          <Link href="/">
            <a>Acasa</a>
          </Link>
          <Link href="/formular">
            <a>Faceti o Rezervare</a>
          </Link>
          {session?.user.isadmin ? (
            <Link href="/dashboard/admin">
              <a>Rezervari</a>
            </Link>
          ) : (
            ""
          )}
          {session?.user.isursitoare ? (
            <Link href="/dashboard/ursitoare">
              <a>Program</a>
            </Link>
          ) : (
            ""
          )}

          <div>
            {status === "loading" ? (
              "Loading"
            ) : session?.user ? (
              <a href="#" className="" onClick={logoutClickHandler}>
                Deconectare
              </a>
            ) : (
              <Link href="/auth/login">
                <a className="">Conectare</a>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
