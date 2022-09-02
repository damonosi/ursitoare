import Footer from "./footer/Footer";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import styles from "./Layout.module.scss";

import dynamic from "next/dynamic";
import { Suspense } from "react";
const Header = dynamic(() => import("./header/Header"), {
  suspense: true,
});
const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + "- Ursitoare" : "Ursitoare"}</title>
        <meta name="description" content="Ursitoare App" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className={styles.siteContent}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <main className={styles.mainContent}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
