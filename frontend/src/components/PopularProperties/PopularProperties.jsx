import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PopularProperties.module.css";
import img1 from "../../assets/realestatebeach.jpg";
import img2 from "../../assets/realestatemountain.jpg";
import img3 from "../../assets/realestatecountryside.jpg";
import { request } from "../../utils/fetchAPI";

const PopularProperties = () => {
  const [numProperties, setNumProperties] = useState({});

  useEffect(() => {
    const fetchNumProperties = async () => {
      try {
        const data = await request("/property/get-count", "GET");
        setNumProperties(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchNumProperties();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titles}>
          <h5>Several property types to choose from</h5>
          <h2>Some of our popular properties</h2>
        </div>
        <div className={styles.properties}>
          <Link
            className={styles.property}
            to={`/properties?type=beach&continent=1&priceRange=2`}
          >
            <img src={img1} alt="" />
            <div className={styles.quantity}>
              {numProperties?.beach} properties
            </div>
            <h5>Beach properites</h5>
          </Link>
          <Link
            className={styles.property}
            to={`/properties?type=beach&continent=1&priceRange=2`}
          >
            <img src={img2} alt="" />
            <div className={styles.quantity}>
              {numProperties?.mountain} properties
            </div>
            <h5>Mountain properites</h5>
          </Link>
          <Link
            className={styles.property}
            to={`/properties?type=beach&continent=1&priceRange=2`}
          >
            <img src={img3} alt="" />
            <div className={styles.quantity}>
              {numProperties?.village} properties
            </div>
            <h5>Village properites</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopularProperties;
