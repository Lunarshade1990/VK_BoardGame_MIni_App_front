import {createSlice} from '@reduxjs/toolkit';
import ViewStartingPanels from "../components/ViewStartingPanels";

const lodash = require('lodash');

const initialState = {
    gameCollectionLoadingStatus: 'idle',
    activeView: "profile",
    activePanel: "panel1.1",
    loading: true,
    userId: 0,
    user: {},
    gameList: [],
    gameListPage: {
        content: [],
        totalPages: 0,
        totalElements: 0
    },
    gameListInfo: {
        totalPages: 0,
        totalElements: 0
    },
    activeModal: null,
    isModalOpen: false,
    collectionFilterParams: {
        filters: {
            players: [0, 999],
            time: [0, 999],
            mode: [0, 999],
            modeName: '',
            search: '',
        }
    },
    collectionFilter: {
        filterConfig: {
            activeFilters: []
        },
        filters: {
            players: [0, 999],
            time: [0, 999],
            mode: [0, 999],
            modeName: '',
            search: '',
        }
    },
    countOfActiveFilters: 0,
    filtersChange: false,
    filterQuery: {
        minTime: 0,
        maxTime: 999,
        minPlayers: 0,
        maxPlayers: 999
    },
    panelStack: ['panel1.1']
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
            state.panelStack = [ViewStartingPanels[action.payload]]
        },

        addPanelInStack (state, action) {
            state.panelStack.push(action.payload);
            const ind = state.panelStack.length - 1;
            state.activePanel = state.panelStack[ind];
        },

        goToPreviousPanel (state) {
            state.panelStack.pop();
            const ind = state.panelStack.length - 1;
            state.activePanel = state.panelStack[ind];
        },
        setActivePanel (state, action) {
            state.activePanel = action.payload;
        },
        setGameCollectionLoadingStatus (state, action) {
            state.gameCollectionLoadingStatus = action.payload;
        },
        setGameList (state, action) {
            state.gameListPage = action.payload.data.response;
            state.gameListInfo.totalElements = action.payload.data.collectionInfo.totalElements;
            state.collectionFilterParams.filters.players = [action.payload.data.collectionInfo.minPlayerNumber, action.payload.data.collectionInfo.maxPlayerNumber];
            state.collectionFilterParams.filters.mode = [action.payload.data.collectionInfo.minPlayerNumber === 0 ? 1 : action.payload.data.collectionInfo.minPlayerNumber, action.payload.data.collectionInfo.maxPlayerNumber];
            state.collectionFilterParams.filters.time = [action.payload.data.collectionInfo.minTime, action.payload.data.collectionInfo.maxTime];
            if (action.payload.setFilter) {
                state.collectionFilter.filters = {...state.collectionFilterParams.filters};
            }
        },
        setActiveModal (state, action) {
            state.activeModal = action.payload;
        },
        setIsModalOpen (state, action) {
            state.isModalOpen = action.payload;
        },
        setCollectionFilter (state, action) {

            const oldFilters = state.collectionFilter.filters;

            if (action.payload.filters) {

                if (Object.keys(action.payload.filters).length === 1) {
                    const filter = Object.keys(action.payload.filters)[0];
                    let initValue, newValue;
                    if (typeof action.payload.filters[filter] === 'string') {
                        newValue = action.payload.filters[filter].split();
                        initValue = state.collectionFilterParams.filters[filter].split();
                    } else {
                        newValue = action.payload.filters[filter];
                        initValue = state.collectionFilterParams.filters[filter];
                    }
                    const diff = lodash.difference(initValue, newValue);
                    const filterChanges = (diff.length > 0);
                    const isNewFilter = !state.collectionFilter.filterConfig.activeFilters.includes(filter);
                    if (filterChanges) {
                        if (isNewFilter) {
                            state.collectionFilter.filterConfig.activeFilters.push(filter);
                        }
                        state.collectionFilter.filters = {
                            ...state.collectionFilter.filters,
                            ...action.payload.filters,
                            ...action.payload.filterConfig
                        }
                    } else if (!filterChanges){
                        lodash.pull(state.collectionFilter.filterConfig.activeFilters, filter);
                        state.collectionFilter.filters = {
                            ...state.collectionFilter.filters,
                            [filter]: state.collectionFilterParams.filters[filter],
                            modeName: ''
                        }
                    }
                } else {
                    state.collectionFilter.filters = {
                        ...state.collectionFilter.filters,
                        ...action.payload.filters,
                        ...action.payload.filterConfig
                    }
                    state.collectionFilter.filterConfig.activeFilters = [];
                }
            } else {
                state.collectionFilter.filters = {
                    ...state.collectionFilter.filters,
                    ...action.payload.filterConfig
                }
            }

            state.filtersChange = lodash.difference(oldFilters, state.collectionFilter.filters);
            state.countOfActiveFilters = state.collectionFilter.filterConfig.activeFilters.length;
        },

        resetCollectionModeFilter (state, _action) {
            state.collectionFilter.filters.mode = state.collectionFilterParams.filters.mode;
        },
        clearCollectionFilter (state) {
            state.collectionFilter.filters = {
                ...state.collectionFilterParams.filters
            };
            state.filtersChange = true;
            state.countOfActiveFilters = 0;
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
    resetCollectionModeFilter,
    clearCollectionFilter,
    setActiveModal,
    setIsModalOpen,
    goToPreviousPanel,
    addPanelInStack,
} = rootReducer.actions

export default rootReducer.reducer


