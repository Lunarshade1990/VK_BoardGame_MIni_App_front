import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId: 0,
}

export const rootReducer = createSlice({
    name: 'rootReducer',
    initialState,
    reducers: {
        setUserId (state, action) {
            console.log(action);
            state.userId = action.payload;
            console.log(state.userId);
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUserId } = rootReducer.actions

export default rootReducer.reducer