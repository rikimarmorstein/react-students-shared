import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
<<<<<<< HEAD
import { SchoolDirectorState, schoolReducer } from "./SchoolDirectorState";



const reducers = combineReducers({ authState: authReducer, schoolState: schoolReducer});
=======
import { schoolReducer } from "./SchoolDirectorState";


const reducers = combineReducers({ authState: authReducer, schoolDirectorState: schoolReducer});
>>>>>>> 94f5bddde517b1a2e2ac96b0d91950b8e057c8e3
const store = createStore(reducers);

export default store;
