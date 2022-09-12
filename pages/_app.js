import React from "react";

import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";

import Spinner from "../components/spinner/Spinner";
import Transition from "./../components/transition/index";
import Layout from "./../components/layout/index";

import "../styles/globals.css";
import AdminLayout from "./../components/layout/adminLayout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AnimatePresence
        exitBeforeEnter
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Transition>
          {Component.Auth ? (
            <Auth>
              {Component.Admin ? (
                <Admin>
                  <AdminLayout>
                    <Component {...pageProps} />
                  </AdminLayout>
                </Admin>
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </Auth>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </Transition>
      </AnimatePresence>
    </SessionProvider>
  );
}
function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/unauthorized?message=login required");
    },
  });
  if (status === "loading") {
    return <Spinner />;
  }
  return children;
}
function Admin({ children }) {
  const router = useRouter();
  const { status, data: session } = useSession();
  console.log(session.user.isadmin);
  if (session.user.isadmin)
    if (status === "loading") {
      return <Spinner />;
    }
  if (session.user.isadmin === true) {
    return children;
  } else {
    router.push("/unauthorized?message=admin required");
  }
}

export default MyApp;
