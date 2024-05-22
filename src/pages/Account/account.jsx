import React, { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import MyContext from '../../context/data/myContext';
import { fireDB } from '../../fireabase/FirebaseConfig'; // Adjust the import path accordingly
import "./account.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
}

function Account() {
  const email = JSON.parse(localStorage.getItem("user")).user.email;
  

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const userDoc = doc(fireDB, "users", parsedUser.uid);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            setUser(userSnapshot.data());
          } else {
            console.error("No such user document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.warn("No user data found in localStorage");
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="fullScreen">
        <div className="main-container">
          <div className="profileContainer">
            <div className="profileImg">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
                alt="Profile"
              />
            </div>
            <div className="profileName">
              <h1>{email}</h1>
            </div>
            <div>
              <button className="btnLogout" onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
        <div className="options-container">
          <div>
            <Link to="/cart">Bag</Link>
          </div>
          <div>
            <Link to="/order">My Orders</Link>
          </div>
          <div>
            <Link to="/allproducts">Explore</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Account;
