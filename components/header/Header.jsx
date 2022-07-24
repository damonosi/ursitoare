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
          <h2>Ursitoare Bacau</h2>
        </div>

        <div className={styles.board}>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/formular">
            <a>Programare</a>
          </Link>
          {session?.user.isAdmin ? (
            <Link href="/dashboard/admin">
              <a>Rezervari</a>
            </Link>
          ) : (
            ""
          )}
          {session?.user.isUrsitoare ? (
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
                Logout
              </a>
            ) : (
              <Link href="/auth/login">
                <a className="">Login</a>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
