import { createSlice } from "@reduxjs/toolkit";

// Retrieve wishlist from local storage if available
const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
const initialState = Array.isArray(storedWishlist) ? storedWishlist : [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const existingItemIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex === -1) {
        state.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state)); // Update local storage
      }
    },
    removeFromWishlist: (state, action) => {
      const indexToRemove = state.findIndex(item => item.id === action.payload);
      if (indexToRemove !== -1) {
        state.splice(indexToRemove, 1);
        localStorage.setItem("wishlist", JSON.stringify(state)); // Update local storage
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
