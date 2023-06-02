import { configureStore } from '@reduxjs/toolkit';
import cryptoCoin from './reducers/crypto';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    crypto: cryptoCoin,
  },
  middleware: [thunk],
});


export default store;