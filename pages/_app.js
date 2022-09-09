import React from "react";

import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";

import Spinner from "../components/spinner/Spinner";
import Transition from "./../components/transition/index";
import Layout from "./../components/layout/index";

import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Transition>
            {Component.Auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </Transition>
        </AnimatePresence>
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
