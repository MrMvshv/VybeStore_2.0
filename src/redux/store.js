import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamCoreApi } from './services/shazamCore';
import { youtubeV3Api } from './services/youtubeV3';
export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    [youtubeV3Api.reducerPath]: youtubeV3Api.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    shazamCoreApi.middleware,
    youtubeV3Api.middleware),
});
