import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {IUserView} from "../../modules/users/models/IUserView";
import * as userActions from "./users.actions";
import {ToastUtil} from "../../util/ToastUtil";
import {TokenUtil} from "../../util/TokenUtil";

export const userFeatureKey = "userFeature";

export interface InitialState {
    loading: boolean;
    error: SerializedError;
    user: IUserView;
    token: string;
    isAuthenticated: boolean;
}

const initialState: InitialState = {
    loading: false,
    error: {} as SerializedError,
    user: {} as IUserView,
    token: "",
    isAuthenticated: false
};


export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        logOutAction: (state, action) => {
            state.user = {} as IUserView;
            state.token = "";
            state.isAuthenticated = false;
            TokenUtil.deleteToken(); // remove the token from session storage
            ToastUtil.displayInfoToast("LogOut is Success!");
        }
    },
    extraReducers: (builder) => {
        // register a User
        builder.addCase(userActions.registerUserAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userActions.registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            ToastUtil.displaySuccessToast("Registration is Success!");
        }).addCase(userActions.registerUserAction.rejected, (state, action) => {
            state.loading = false;
            ToastUtil.displayErrorToast("Registration is Failed!");
            if (isRejectedWithValue(action)) {
                state.error = action.error
            }
        })

        // login a User
        builder.addCase(userActions.loginUserAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userActions.loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
            state.token = action.payload.token;
            TokenUtil.saveToken(action.payload.token); // saves token to session storage
            state.isAuthenticated = true;
            ToastUtil.displaySuccessToast("Login is Success!");
        }).addCase(userActions.loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.user = {} as IUserView;
            state.token = "";
            state.isAuthenticated = false;
            TokenUtil.deleteToken(); // remove the token from session storage
            ToastUtil.displayErrorToast("Login is Failed!");
            if (isRejectedWithValue(action)) {
                state.error = action.error
            }
        })

        // get user info
        builder.addCase(userActions.getUserInfoAction.pending, (state, action) => {
            state.loading = true;
        }).addCase(userActions.getUserInfoAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.data;
            state.isAuthenticated = true;
        }).addCase(userActions.getUserInfoAction.rejected, (state, action) => {
            state.loading = false;
            state.user = {} as IUserView;
            ToastUtil.displayErrorToast("Get UserInfo is Failed!");
            if (isRejectedWithValue(action)) {
                state.error = action.error
            }
        })
    }
});

export const {logOutAction} = userSlice.actions;











