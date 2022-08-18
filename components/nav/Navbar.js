import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./Navbar.module.css";

const Navbar = (props) => {
  const router = useRouter();
  const { username } = props;

  const [showDropdawn, setShowDropdown] = useState(false);

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdawn);
  };

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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
                <div>
                  <Link href="/login" passHref>
                    <a className={styles.linkName}>Sign out</a>
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
