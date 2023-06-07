import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineFileImage } from "react-icons/ai";
import { request } from "../../utils/fetchAPI";
import { useDispatch } from "react-redux";
import { register } from "../../redux/authSlice";
import styles from "./Signup.module.css";

const Signup = () => {
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let filename = null;
      if (photo) {
        const formData = new FormData();
        filename = crypto.randomUUID() + photo.name;
        formData.append("filename", filename);
        formData.append("image", photo);

        await request("/upload/image", "POST", {}, formData, true);
      } else {
        return;
      }

      const data = await request(
        "/auth/register",
        "POST",
        { "Content-Type": "application/json" },
        { ...state, profileImg: filename }
      );
      dispatch(register(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username..."
            onChange={handleState}
          />
          <input
            type="text"
            name="email"
            placeholder="Email..."
            onChange={handleState}
          />
          <label htmlFor="photo">
            Upload photo <AiOutlineFileImage />
          </label>
          <input
            id="photo"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <input
            type="text"
            name="password"
            placeholder="Password..."
            onChange={handleState}
          />
          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
