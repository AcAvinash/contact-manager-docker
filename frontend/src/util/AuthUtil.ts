import axios from 'axios';
import {TokenUtil} from "./TokenUtil";

export class AuthUtil {

    public static isSetTokenToRequestHeader() {
        let isLoggedIn: boolean = TokenUtil.isLoggedIn();
        let token = TokenUtil.getToken();
        if (token && isLoggedIn) {
            axios.defaults.headers['x-auth-token'] = token;
            return true;
        } else {
            delete axios.defaults.headers['x-auth-token'];
            return false;
        }
    }
}