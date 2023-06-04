import React from "react";
import { FiSend } from "react-icons/fi";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titles}>
          <h5>Want to get our latest offers?</h5>
          <h2>Send us your email and we will do the rest</h2>
        </div>
        <div className={styles.inputContainer}>
          <input type="email" placeholder="Type email..." />
          <FiSend className={styles.sendIcon}></FiSend>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
