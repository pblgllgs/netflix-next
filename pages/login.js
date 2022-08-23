import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import { magic } from "../lib/magic-client";
import Cookies from "cookies-js";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("pablogallegosgonzalez@gmail.com");
  const [isLoading, setIsLoading] = useState(false);
  const [userMsg, setUserMsg] = useState("");

  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    setEmail(e.target.value);
  };

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (email) {
      if (email === "pablogallegosgonzalez@gmail.com") {
        try {
          setIsLoading(true);
          const didToken = await magic.auth.loginWithMagicLink({
            email,
          });
          if (didToken) {
            Cookies.set("didToken", didToken);
            router.push("/home");
          }
        } catch {
          setIsLoading(false);
          console.log("Ocurrió un error al iniciar sesión");
        }
      } else {
        setIsLoading(false);
        setUserMsg("Ocurrió un error al iniciar sesión");
      }
    } else {
      setIsLoading(false);
      setUserMsg("Ingresa un email válido");
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Sign in</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.header}>
        <Link href={"/"}>
          <a>
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="play"
                width={"150px"}
                height={"50px"}
              />
            </div>
          </a>
        </Link>
      </div>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Inicia sesión</h1>
          <input
            className={styles.emailInput}
            type="text"
            placeholder="Ingresa tu email"
            value={email}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button
            disabled={isLoading}
            className={styles.loginBtn}
            onClick={handleLoginWithEmail}
          >
            {isLoading ? "Loading" : "Sign in"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
