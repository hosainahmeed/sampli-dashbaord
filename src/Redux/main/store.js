import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApis } from './baseApis'
import counterSlice from '../slices/CampaingSlice'

export const store = configureStore({
  reducer: {
    [baseApis.reducerPath]: baseApis.reducer,
    campaign: counterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApis.middleware),
})

setupListeners(store.dispatch)



