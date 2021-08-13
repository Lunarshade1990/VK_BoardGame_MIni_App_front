import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    gameCollectionLoadingStatus: 'idle',
    activeView: "view1",
    activePanel: "panel1.1",
    loading: true,
    userId: 0,
    user: {},
    gameList: []
}

export const rootReducer = createSlice({
    name: 'rootReducer',
    initialState,
    reducers: {
        setUserId (state, action) {
            state.userId = action.payload;
        },
        setUserFromDb (state, action) {
            state.user = action.payload;
        },
        setLoading (state, action) {
            state.loading = action.payload;
        },
        setActiveView (state, action) {
            state.activeView = action.payload;
        },
        setActivePanel (state, action) {
            state.activePanel = action.payload;
        },
        setGameCollectionLoadingStatus (state, action) {
            state.gameCollectionLoadingStatus = action.payload;
        },

        setGameList (state, action) {
            state.gameList = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    setUserId,
    setUserFromDb,
    setLoading,
    setActiveView,
    setActivePanel,
    setGameCollectionLoadingStatus,
    setGameList
} = rootReducer.actions

export default rootReducer.reducer