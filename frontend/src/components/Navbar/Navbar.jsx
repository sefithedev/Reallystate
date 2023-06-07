import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsHouseDoor } from "react-icons/bs";
import { AiOutlineClose, AiOutlineFileImage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { request } from "../../utils/fetchAPI";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [state, setState] = useState({});
  const [photo, setPhoto] = useState("");
  const [mobile, setMobile] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageClick = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  const handleAddProperty = () => {
    setShowAddProperty(true);
    setShowMenu(false);
  };

  const handleState = (e) => {
    setState((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCloseForm = () => {
    setShowAddProperty(false);
    setState({});
    setPhoto(null);
  };

  const handleSubmitAddProperty = async (e) => {
    e.preventDefault();
    let filename = "";
    if (photo) {
      const formData = new FormData();
      filename = crypto.randomUUID() + photo.name;
      formData.append("filename", filename);
      formData.append("image", photo);
      await request("/upload/image", "POST", {}, formData, true);
    } else {
      return;
    }

    try {
      const options = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await request("/property/new", "POST", options, {
        ...state,
        img: filename,
      });
      handleCloseForm();
    } catch (error) {
      console.log(error);
    }
  };

  const size = mobile ? styles.small : "";
  const burger = mobile ? "" : styles.small;

  return (
    <div onClick={() => setMobile(!mobile)} className={styles.container}>
      <div className={styles.outerWrapper}>
        <div className={styles.mobile}>
          <GiHamburgerMenu
            className={`${styles.burgerIcon} ${burger}`}
            onClick={() => setMobile((prev) => !prev)}
          ></GiHamburgerMenu>
        </div>
        <Link to="/" className={`${styles.left} ${size}`}>
          Reallystate <BsHouseDoor />
        </Link>
        <button className={`${styles.close} ${size}`}>X</button>
        <ul className={`${styles.center} ${size}`}>
          <li onClick={(e) => navigate("/")} className={styles.listItem}>
            Home
          </li>
          <li className={styles.listItem}>About</li>
          <li className={styles.listItem}>Featured</li>
          <li className={styles.listItem}>Contacts</li>
        </ul>

        {user ? (
          <>
            <div className={`${styles.userContainer} ${size}`}>
              <span>Welcom: {user.username}</span>

              <img
                src={`http://localhost:5000/images/${user.profileImg}`}
                alt="user"
                onClick={handleImageClick}
              />
              {showMenu && (
                <div className={`${styles.userMenuContainer}`}>
                  <ul>
                    <li onClick={handleLogout}>Logout</li>
                    <li onClick={handleAddProperty}>Add Property</li>
                  </ul>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className={`${styles.right} ${size}`}>
            <Link to="/signup">Sign up</Link>
            <Link to="/signin">Sign in</Link>
          </div>
        )}
      </div>
      {showAddProperty && (
        <div className={styles.addPropertyContainer} onClick={handleCloseForm}>
          <div
            className={styles.addPropertyWrapper}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add Property</h2>
            <form onSubmit={handleSubmitAddProperty}>
              <input
                type="text"
                placeholder="Title..."
                name="title"
                onChange={handleState}
              />
              <input
                type="text"
                placeholder="Type..."
                name="type"
                onChange={handleState}
              />
              <input
                type="text"
                placeholder="Desc..."
                name="desc"
                onChange={handleState}
              />
              <input
                type="text"
                placeholder="Continent..."
                name="continent"
                onChange={handleState}
              />
              <input
                type="number"
                placeholder="price..."
                name="price"
                onChange={handleState}
              />
              <input
                type="number"
                placeholder="sq. meters..."
                name="sqmeters"
                onChange={handleState}
              />
              <input
                type="number"
                placeholder="Beds..."
                name="beds"
                step={1}
                min={2}
                onChange={handleState}
              />
              <div className={styles.photoContainer}>
                <label htmlFor="photo">
                  Property picture <AiOutlineFileImage></AiOutlineFileImage>
                </label>
                <input
                  type="file"
                  id="photo"
                  style={{ display: "none" }}
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </div>
              <button type="submit">Add</button>
            </form>
            <AiOutlineClose
              className={styles.removeIcon}
              onClick={handleCloseForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
