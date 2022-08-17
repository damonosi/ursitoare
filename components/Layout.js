import Header from "./header/Header";
import Footer from "./footer/Footer";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Layout.module.scss";
const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + "- Ursitoare" : "Ursitoare"}</title>
        <meta name="description" content="Ursitoare App" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className={styles.siteContent}>
        <Header />
        <main className={styles.mainContent}>{children}</main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
