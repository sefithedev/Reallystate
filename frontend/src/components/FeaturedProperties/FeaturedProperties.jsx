import React, { useEffect, useState } from "react";
import styles from "./FeaturedProperties.module.css";
import { request } from "../../utils/fetchAPI";
import { Link } from "react-router-dom";
import { FaBed, FaSquareFull } from "react-icons/fa";
import img from "../../assets/estate3.jpg";
import person from "../../assets/person.jpg";

const FeaturedProperties = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await request("/property/get-featured", "GET");
        setFeaturedProperties(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titles}>
          <h5>Properties we think you would like</h5>
          <h2>Oure featured properties</h2>
        </div>
        <div className={styles.featuredProperties}>
          {featuredProperties?.map((property) => (
            <div key={property._id} className={styles.featuredProperty}>
              <Link
                to={`/property-details/${property._id}`}
                className={styles.imgContainer}
              >
                <img
                  src={
                    property.img
                      ? `http://localhost:5000/images/${property.img}`
                      : img
                  }
                  alt=""
                />
              </Link>

              <div className={styles.details}>
                <div className={styles.priceAndOwner}>
                  <span className={styles.price}>$ {property?.price}</span>
                  <img src={person} alt="" className={styles.owner} />
                </div>
                <div className={styles.moreDetails}>
                  <span>
                    {property?.beds} beds{" "}
                    <FaBed className={styles.icon}></FaBed>
                  </span>
                  <span>
                    {property?.sqmeters} sqaure meters{" "}
                    <FaSquareFull className={styles.icon}></FaSquareFull>
                  </span>
                </div>
                <div className={styles.desc}>{property.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
