import Layout from "../components/Layout";
import React from "react";

import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";

import "../styles/globals.css";
import Spinner from "../components/spinner/Spinner";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        {Component.Auth ? (
          <Auth>
            <AnimatePresence
              exitBeforeEnter
              initial={false}
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              <Component {...pageProps} />
            </AnimatePresence>
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
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

export default MyApp;
