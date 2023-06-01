import { configureStore } from '@reduxjs/toolkit'
import cryptoCoin from './reducers/crypto';

const store = configureStore({
  reducer: {
    crypto: cryptoCoin,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //   immutableCheck: false,
    //   serializableCheck: false,
    // })
  }
});

export default store;