import {createAsyncThunk} from "@reduxjs/toolkit";
import {IUserView} from "../../modules/users/models/IUserView";
import {UserService} from "../../modules/users/services/UserService";
import {AuthUtil} from "../../util/AuthUtil";

/**
 * register a User
 */
export const registerUserAction: any = createAsyncThunk("users/registerUserAction",
    async (payload: { user: IUserView }, {rejectWithValue}): Promise<{ status: string, msg: string; data: IUserView } | any> => {
        try {
            const {user} = payload;
            const response = await UserService.registerUser(user);
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 * login a User
 */
export const loginUserAction: any = createAsyncThunk("users/loginUserAction",
    async (payload: { user: IUserView }, {rejectWithValue}): Promise<{ status: string, msg: string; data: IUserView; token: string } | any> => {
        try {
            const {user} = payload;
            const response = await UserService.loginUser(user);
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 * get user Info
 * PRIVATE
 */
export const getUserInfoAction: any = createAsyncThunk("users/getUserInfoAction",
    async (payload: {}, {rejectWithValue}): Promise<{ status: string, msg: string; data: IUserView } | any> => {
        try {
            if (AuthUtil.isSetTokenToRequestHeader()) { // PRIVATE
                const response = await UserService.getUserInfo();
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });