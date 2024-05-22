import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/wishlistSlice";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";
import './wishlist.css'

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist || []);  // Default to an empty array
  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <Layout>
      <div className="wishlist-container">
        <h1 className="heading">My Wishlist</h1>
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.imageUrl} alt={item.title} />
              <div className="wishlist-item-info">
                <h2>{item.title}</h2>
                <p>₹{item.price}</p>
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="remove-button"
                >
                  Remove
                </button>
                <Link to={`/productinfo/${item.id}`} className="view-button">
                  View
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="Wl-para">Your wishlist is empty</p>
        )}
      </div>
    </Layout>
  );
}

export default Wishlist;
