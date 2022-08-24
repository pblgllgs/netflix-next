import React from "react";
import styles from "../styles/test.module.css";
import { Footer } from "../components";

const test = () => {
  return (
    <div className={styles.container}>
      <div className={styles.test}>test</div>
      <Footer />
    </div>
  );
};

export default test;
