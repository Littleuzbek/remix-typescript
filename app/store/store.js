import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice";

const store = configureStore({
  reducer: {
    cart: CartSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.createdAt'],
      ignoredPaths: ['cart.user.createdAt']
    }
  })
});

export default store;