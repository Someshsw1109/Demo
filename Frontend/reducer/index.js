import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import loadingBarReducer from "../slices/loadingBarSlice.jsx"


const rootReducer=combineReducers({
    auth:authReducer, 
    loadingBar:loadingBarReducer
})
export default rootReducer;