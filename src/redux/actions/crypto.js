import { types } from './types';

export const coinTransferred = (user) => ({
  type: types.TRANSFER_COIN,
  payload: { user },
});