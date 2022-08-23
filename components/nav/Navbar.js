import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { magic } from "../../lib/magic-client";
import styles from "./Navbar.module.css";
import Cookies from "cookies-js";

const Navbar = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const [showDropdawn, setShowDropdown] = useState(false);

  const getUsername = async () => {
    try {
      const { email } = await magic.user.getMetadata();
      if (email) {
        return setUsername(email);
      }
    } catch (error) {
      router.push("/login");
    }
  };

  useEffect(() => {
    try {
      getUsername();
    } catch (error) {
      router.push("/login");
      console.error("Error al obtener el username", error);
    }
  });

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdawn);
  };

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/home");
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const logout = async () => {
    try {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        const isLogout = await magic.user.logout();
        if (isLogout) {
          Cookies.set("didToken", "");
          router.push("/login");
        }
      }
    } catch (error) {
      console.log("Ocurrió un error al cerrar sesión", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {username ? (
          <Link href="/home" passHref>
            <a className={styles.logoLink}>
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
        ) : (
          <Link href="/" passHref>
            <a className={styles.logoLink}>
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
        )}

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand_more.svg"
                alt="play"
                width={"32px"}
                height={"32px"}
              />
            </button>
            {showDropdawn && (
              <div className={styles.navDropdown}>
                <button onClick={logout} className={styles.linkName}>
                  Sign out
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
