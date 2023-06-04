import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.col}>
          <h2>About the App</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
            voluptas quasi accusantium voluptate nam doloremque reprehenderit
            laboriosam nisi consectetur voluptatum, consequuntur sint recusandae
            inventore nobis deserunt distinctio cupiditate perspiciatis illo!
          </p>
        </div>
        <div className={styles.col}>
          <h2>Contacts</h2>
          <span>Phone: +123 456 789</span>
          <span>YouTube: SefiTheDev</span>
          <span>GitHub: SefiTheDev</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
