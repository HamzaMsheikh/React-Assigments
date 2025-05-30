import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './Services/api';
import cartReducer from './Features/cartSlice';
import searchReducer from './Features/searchSlice';

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});