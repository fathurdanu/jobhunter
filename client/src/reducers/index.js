import { combineReducers } from "redux";
import userReducer from "./userReducer";
import jobReducer from "./jobReducer";

export default combineReducers({ userReducer, jobReducer});