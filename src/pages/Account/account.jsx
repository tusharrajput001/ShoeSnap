import React from "react";
import "./account.css";
import { Link } from "react-router-dom";

const logout = () => {
  localStorage.clear('user');
  window.location.href = '/login'
}

function Account() {
  return (
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
            <h1>Name</h1>
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
        <div><Link to="/order">My Orders</Link></div>
        <div><Link to="/allproducts">Explore</Link></div>
      </div>
    </div>
  );
}

export default Account;
