import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "./Hero.module.css";

const Hero = () => {
  const [type, setType] = useState("beach");
  const [continent, setContinent] = useState("0");
  const [priceRange, setPriceRange] = useState("0");

  const handleSearch = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Find your dram place right now</h2>
        <h5>We have the best selection of properties</h5>
        <div className={styles.options}>
          <select onChange={(e) => setType(e.target.value)}>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="village">Village</option>
          </select>
          <select onChange={(e) => setPriceRange(e.target.value)}>
            <option value="0">0-100,000</option>
            <option value="1">100,000-200,000</option>
            <option value="2">200,000-300,000</option>
            <option value="3">300,000-400,000</option>
            <option value="4">400,000-500,000</option>
          </select>
          <select onChange={(e) => setContinent(e.target.value)}>
            <option value="0">Europe</option>
            <option value="1">Asia</option>
            <option value="2">Africa</option>
            <option value="3">South America</option>
            <option value="4">North America</option>
            <option value="5">Oceania</option>
          </select>
          <AiOutlineSearch className={styles.searchIcon} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
