import Footer from "../footer/Footer";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import styles from "./Layout.module.scss";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Spinner from "../spinner/Spinner";
import Transition from "./../transition/index";
const Header = dynamic(() => import("../header/user/Header"), {
  suspense: true,
});
const Layout = ({ title, children }) => {
  return (
    <div className={styles.clientLayout}>
      <Head>
        <title>{title ? title + "- Ursitoare" : "Ursitoare"}</title>
        <meta name="description" content="Ursitoare App" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className={styles.siteContent}>
        <Suspense fallback={<Spinner />}>
          <Header />
        </Suspense>
        <Transition>
          <main className={styles.mainContent}>{children}</main>
        </Transition>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
