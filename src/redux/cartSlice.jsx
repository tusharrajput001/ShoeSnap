import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    deleteFromCart: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    updateCartItemSize: (state, action) => {
      const { id, size } = action.payload;
      const item = state.find(item => item.id === id);
      if (item) {
        item.size = size;
      }
    }
  }
});

export const { addToCart, deleteFromCart, updateCartItemQuantity, updateCartItemSize } = cartSlice.actions;
export default cartSlice.reducer;
