import React, { useReducer, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { getError } from "../../../../utils/error";

import styles from "../../Dashboard.module.scss";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        evenimenteleMele: action.payload,
        error: "",
      };
    case "FETCH_FAIL":
      return { ...state, loading: true, error: action.payload };
    default:
      return state;
  }
}

export default function EvenimenteleMele() {
  const { data: session } = useSession();
  const [{ loading, error, evenimenteleMele }, dispatch] = useReducer(reducer, {
    loading: true,
    evenimenteleMele: [],
    error: "",
  });

  const router = useRouter();

  useEffect(() => {
    const fetchProgramari = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/rezervari/evenimentele-mele");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    fetchProgramari();
  }, []);
  const flatRez = evenimenteleMele.flatMap((num) => num);
  return (
    <div className={styles.containerDashboard}>
      <h1>Evenimentele Mele</h1>
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
            <th>
              <h3>Vrei sa mergi la eveniment?</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {flatRez.map((eveniment) => (
            <tr key={eveniment._id}>
              <td>{eveniment.numeCopil}</td>
              <td>{eveniment.dataNastereCopil}</td>
              <td>{eveniment.numeMama}</td>
              <td>{eveniment.numeTata}</td>
              <td>{eveniment.altiCopiiNumeVarsta}</td>
              <td>{eveniment.numeNasi}</td>
              <td>{eveniment.dataEveniment}</td>
              <td>{eveniment.oraEveniment}</td>
              <td className={styles.butonTabel}>
                <button
                  onClick={async (e) => {
                    await axios.post(
                      `/api/evenimente/${eveniment._id}/renunta`,
                    );

                    router.reload();
                    toast.success("Ai renuntat la eveniment");
                  }}
                >
                  Renunta
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
