import React from "react";
import styles from "./propertyDetails.module.css";
import emailjs from "@emailjs/browser";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { request } from "../../utils/fetchAPI";
import { FaBed, FaSquareFull } from "react-icons/fa";
import { useRef } from "react";

const PropertyDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const [propertyDetail, setPropertyDetail] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { id } = useParams();
  const formRef = useRef();

  // email js variables
  const serviceID = process.env.REACT_APP_SERVICE_ID;
  const templateID = process.env.REACT_APP_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await request(`/property/get-single/${id}`, "GET");
        setPropertyDetail(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDetails();
  }, [id]);

  const handleCloseForm = () => {
    setShowForm(false);
    setTitle("");
    setDesc("");
  };

  const handleContactOwner = async (e) => {
    e.preventDefault();
    console.log(serviceID, templateID, formRef.current, publicKey);
    emailjs
      .sendForm(serviceID, templateID, formRef.current, publicKey)
      .then((result) => console.log(result.text))
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <img src={`http://localhost:5000/images/${propertyDetail?.img}`} />
        </div>
        <div className={styles.right}>
          <h3 className={styles.title}>Title: {`${propertyDetail?.title}`}</h3>
          <div className={styles.details}>
            <div className={styles.typeAndContinent}>
              <div>
                Type: <span>{`${propertyDetail?.type}`}</span>
              </div>
              <div>
                Continent: <span>{`${propertyDetail?.continent}`}</span>
              </div>
            </div>
            <div className={styles.priceAndOwner}>
              <span className={styles.price}>
                <span>Price: $ </span>
                {`${propertyDetail?.price}`}
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                Owner:{" "}
                <img
                  src={`http://localhost:5000/images/${propertyDetail?.currentOwner?.profileImg}`}
                  className={styles.owner}
                />
              </span>
            </div>
            <div className={styles.moreDetails}>
              <span>
                {propertyDetail?.beds} <FaBed className={styles.icon} />
              </span>
              <span>
                {propertyDetail?.sqmeters} square meters{" "}
                <FaSquareFull className={styles.icon} />
              </span>
            </div>
          </div>
          <p className={styles.desc}>
            Desc: <span>{`${propertyDetail?.desc}`}</span>
          </p>
          <button
            onClick={() => setShowForm(true)}
            className={styles.contactOwner}
          >
            Contact owner
          </button>
        </div>
      </div>
      {showForm && (
        <div className={styles.contactForm} onClick={handleCloseForm}>
          <div
            className={styles.contactFormWrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Send Email To Owner</h2>
            <form onSubmit={handleContactOwner} ref={formRef}>
              <input
                value={user?.email}
                type="text"
                placeholder="My email"
                name="from_email"
              />
              <input
                value={user?.username}
                type="text"
                placeholder="My username"
                name="from_username"
              />
              <input
                value={propertyDetail?.currentOwner?.email}
                type="email"
                placeholder="Owner email"
                name="to_email"
              />
              <input
                value={title}
                type="text"
                placeholder="Title"
                name="from_title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                value={desc}
                type="text"
                placeholder="Desc"
                name="message"
                onChange={(e) => setDesc(e.target.value)}
              />
              <button>Send</button>
            </form>
            <AiOutlineClose
              onClick={handleCloseForm}
              className={styles.removeIcon}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
