import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { SchoolDirectorState, schoolReducer } from "./SchoolDirectorState";



const reducers = combineReducers({ authState: authReducer, schoolState: schoolReducer});
const store = createStore(reducers);

export default store;
