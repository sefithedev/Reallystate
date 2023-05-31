import React from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { BsHouseDoor } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link to="/" className={styles.left}>
          Reallystate <BsHouseDoor />
        </Link>
        <ul className={styles.center}>
          <li className={styles.listItem}>Home</li>
          <li className={styles.listItem}>About</li>
          <li className={styles.listItem}>Featured</li>
          <li className={styles.listItem}>Contacts</li>
        </ul>
        <div className={styles.right}>
          <Link to="/signup">Sign up</Link>
          <Link to="/signin">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
