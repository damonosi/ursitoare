import Layout from "../components/Layout";
import React from "react";

import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        {Component.Admin ? (
          <Admin>
            <AnimatePresence
              exitBeforeEnter
              initial={false}
              onExitComplete={() => window.scrollTo(0, 0)}
            >
              <Component {...pageProps} />
            </AnimatePresence>
          </Admin>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
    </SessionProvider>
  );
}
function Admin({ children }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  React.useEffect(() => {
    if (status === "loading") return;
    if (!session?.user.isadmin) {
      router.push("/");
      console.log("Nu esti Admin !");
    }
  }, [router, session?.user.isadmin, status]);
  if (session?.user.isadmin) {
    return children;
  }
  if (status === "loading") {
    return <div>Loading...</div>;
  }
}

export default MyApp;
