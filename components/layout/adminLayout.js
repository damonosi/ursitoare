import Footer from "../footer/Footer";
import Head from "next/head";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import styles from "./Layout.module.scss";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import Spinner from "../spinner/Spinner";
const AdminMenu = dynamic(() => import("../header/admin/index.jsx"), {
  suspense: true,
});
const AdminLayout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + "- Ursitoare" : "Ursitoare"}</title>
        <meta name="description" content="Ursitoare App" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <Suspense fallback={<Spinner />}>
        <AdminMenu />
      </Suspense>
      <div className={styles.siteContent}>
        <main className={styles.mainContentAdmin}>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default AdminLayout;
