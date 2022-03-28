import { configureStore } from "@reduxjs/toolkit";
import musicReducer from './slicers'
export default configureStore({
    reducer:{
        music:musicReducer
    }
})