import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['SET_TODOS'], // Ignore SET_TODOS action
        ignoredPaths: ['todos.createdAt'], // Ignore createdAt in todos state
      },
    }),
});