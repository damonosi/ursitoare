import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { getError } from "../../utils/error";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Spinner from "./../../components/spinner/Spinner";

import styles from "./login.module.scss";

const LoginScreen = () => {
  const { status, data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      setLoading(false);
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.loginContainer}>
      <form
        className={styles.formContainer}
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Conecteaza-te</h1>
        <div className={styles.emailContainer}>
          <input
            placeholder="Adresa Email"
            type="email"
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: "Please enter valid email",
              },
            })}
            className="w-full"
            id="email"
            autoFocus
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className={styles.passwordContainer}>
          <input
            placeholder="Parola"
            type="password"
            {...register("password", {
              required: "Please enter password",
              minLength: { value: 6, message: "password is more than 5 chars" },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className={styles.loginButton}>
          <button>Logare</button>
        </div>
        <div className={styles.registerButton}>
          Nu ai cont ?
          <Link href="/auth/register">
            <a> Inregistreaza-te</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
