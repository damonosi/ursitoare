import { useRouter } from "next/router";
import React from "react";

import styles from "./Neautorizat.module.scss";

export default function Unauthorized() {
  const router = useRouter();
  const { message } = router.query;
  return (
    <div className={styles.neautorizatContainer}>
      <h1 className="text-xl"> Accesul interzis !</h1>
      <h2>Trebuie sa fiti logat pentru a face rezervari !</h2>

      <button
      
        onClick={() => {
          router.push("/auth/login");
        }}
      >
        Logare
      </button>
    </div>
  );
}
