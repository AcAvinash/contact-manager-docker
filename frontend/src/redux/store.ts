import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: rootReducer,
    middleware: [logger, thunk]
});
export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();