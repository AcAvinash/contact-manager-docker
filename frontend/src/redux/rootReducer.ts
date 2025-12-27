import {combineReducers} from "@reduxjs/toolkit";
import * as contactReducer from "./contacts/contacts.slice";
import * as userReducer from "./users/users.slice";

/**
 *
 */
const rootReducer = combineReducers({
    [contactReducer.contactFeatureKey]: contactReducer.contactSlice.reducer,
    [userReducer.userFeatureKey]: userReducer.userSlice.reducer
});
export default rootReducer;