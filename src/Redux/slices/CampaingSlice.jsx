import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    product: null,
    name: null,
    reviewType: null,
    numberOfReviewers: null,
    minAge: null,
    maxAge: null,
    startDate: null,
    endDate: null,
    gender: null,
    country: [],
    state: [],
    city: [],
    paymentMethod: 'Stripe',
}

const counterSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {
        setCampaignData(state, action) {
            return { ...state, ...action.payload };
        },
        reset() {
            return initialState
        },
    },
})

export const { reset, setCampaignData } = counterSlice.actions

export default counterSlice