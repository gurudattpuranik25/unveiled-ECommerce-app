import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartArray: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartArray.some(
        (item) => item.id === action.payload.id
      );
      if (itemIndex) return;
      else {
        state.cartArray.push({ ...action.payload });
      }
    },
    removeFromCart(state, action) {
      state.cartArray = state.cartArray.filter(
        (item) => item.id !== action.payload.id
      );
    },
    increaseProductQuantity(state, action) {
      const itemIndex = state.cartArray.findIndex(
        (item) => item.id === action.payload.id
      );
      state.cartArray[itemIndex].quantity += 1;
    },
    decreaseProductQuantity(state, action) {
      const itemIndex = state.cartArray.findIndex(
        (item) => item.id === action.payload.id
      );
      if (action.payload.quantity === 1) {
        state.cartArray = state.cartArray.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.cartArray[itemIndex].quantity -= 1;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseProductQuantity,
  decreaseProductQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
