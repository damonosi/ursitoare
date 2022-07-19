import React, { useReducer, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { getError } from "../../../utils/error";

import { useRouter } from "next/router";

import styles from "../Dashboard.module.scss";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, rezervari: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: true, error: action.payload };
    default:
      return state;
  }
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [{ loading, error, rezervari }, dispatch] = useReducer(reducer, {
    loading: true,
    rezervari: [],
    error: "",
  });
  const router = useRouter();
  useEffect(() => {
    if (session?.user.isAdmin) {
      console.log(session?.user.isAdmin);
      return;
    } else {
      router.push("/");
    }
  }, [router, session?.user.isAdmin]);
  useEffect(() => {
    const fetchProgramari = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/rezervari");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchProgramari();
  }, []);

  return (
    <div className={styles.containerDashboard}>
      <h1>Rezervari clienti</h1>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <th>
              <h3>Numele Copilului</h3>
            </th>
            <th>
              <h3> Data nasterii</h3>
            </th>
            <th>
              <h3>Numele mamei</h3>
            </th>
            <th>
              <h3>Numele tatalui</h3>
            </th>
            <th>
              <h3>Alti copii</h3>
            </th>
            <th>
              <h3>Numele nasilor</h3>
            </th>
            <th>
              <h3>Data eveniment</h3>
            </th>
            <th>
              <h3>Ora Preferata de client</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {rezervari.map((rezervare) => (
            <tr key={rezervare._id}>
              <td>{rezervare.numeCopil}</td>
              <td>{rezervare.dataNastereCopil}</td>
              <td>{rezervare.numeMama}</td>
              <td>{rezervare.numeTata}</td>
              <td>{rezervare.altiCopiiNumeVarsta}</td>
              <td>{rezervare.numeNasi}</td>
              <td>{rezervare.dataEveniment}</td>
              <td>{rezervare.oraEveniment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
