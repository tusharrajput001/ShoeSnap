// redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state[itemIndex].quantity += 1; // increment quantity if item already exists
      } else {
        state.push({ ...action.payload, quantity: 1 }); // set initial quantity to 1
      }
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.findIndex(item => item.id === id);
      if (itemIndex >= 0) {
        state[itemIndex].quantity = quantity;
      }
    },
    deleteFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    }
  }
});

export const { addToCart, updateCartItemQuantity, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
