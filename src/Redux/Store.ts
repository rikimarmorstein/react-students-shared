import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { schoolReducer } from "./SchoolDirectorState";


const reducers = combineReducers({ authState: authReducer, schoolDSchoolDirectorState: schoolReducer});
const store = createStore(reducers);

export default store;
