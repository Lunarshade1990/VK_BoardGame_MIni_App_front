import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./rootReducer";
import { enableMapSet } from 'immer';
enableMapSet();

const store = configureStore({
    reducer: {
        rootReducer: rootReducer
    }
})

export default store