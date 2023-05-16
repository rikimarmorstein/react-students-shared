import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";

const reducers = combineReducers({
  //  companiesState: companyReducer, customersState: customerReducer, couponsState: couponReducer,
  authState: authReducer
});
const store = createStore(reducers);

export default store;
