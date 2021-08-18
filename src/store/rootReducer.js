import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    gameCollectionLoadingStatus: 'idle',
    activeView: "view1",
    activePanel: "panel1.1",
    loading: true,
    userId: 0,
    user: {},
    gameList: [],
    activeModal: null,
    isModalOpen: false,
    collectionFilterParams: {
        playersFilter: [0,0],
        timeFilter: [0,0]
    },
    collectionFilter: new Map()
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
            const minPlayerCount = state.gameList.map(game => game.minPlayers);
            const maxPlayerCount = state.gameList.map(game => game.maxPlayers);
            state.collectionFilterParams.playersFilter = [Math.min.apply(Math, minPlayerCount), Math.max.apply(Math, maxPlayerCount)]
            const minTime = state.gameList.map(game => game.minTime);
            const maxTime = state.gameList.map(game => game.maxTime);
            state.collectionFilterParams.timeFilter = [Math.min.apply(Math, minTime), Math.max.apply(Math, maxTime)]
        },
        setActiveModal (state, action) {
            state.activeModal = action.payload;
        },
        setIsModalOpen (state, action) {
            state.isModalOpen = action.payload;
        },
        setCollectionFilter (state, action) {
            state.collectionFilter.set(action.payload.name, action.payload.config)
        },
        deleteCollectionFilter (state, action) {
            state.collectionFilter.delete(action.payload)
        },
        setCollectionFilterParams (state, action) {
            state.collectionFilterParams = action.payload;
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
    setGameList,
    setCollectionFilter,
    deleteCollectionFilter,
    setActiveModal,
    setIsModalOpen
} = rootReducer.actions

export default rootReducer.reducer