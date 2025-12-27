import axios from 'axios';
import {IUserView} from "../models/IUserView";

export class UserService {
    private static serverUrl: string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    /**
     * @usage : register a user
     *  @method : POST
     *  @params : username, email, password
     *  @url : http://localhost:9000/users/register
     *   @access : PUBLIC
     */
    public static registerUser(user: IUserView): Promise<{ data: { status: string, msg: string; data: IUserView } }> {
        let dataUrl: string = `${this.serverUrl}/users/register`;
        return axios.post(dataUrl, user);
    }

    /**
     * @usage : login a user
     *  @method : POST
     *  @params : email, password
     *  @url : http://localhost:9000/users/login
     *   @access : PUBLIC
     */
    public static loginUser(user: IUserView): Promise<{ data: { status: string, msg: string; data: IUserView; token: string } }> {
        let dataUrl: string = `${this.serverUrl}/users/login`;
        return axios.post(dataUrl, user);
    }

    /**
     * @usage : Get User Info
     *  @method : GET
     *  @params : no-params
     *  @url : http://localhost:9000/users/me
     *  @access : PRIVATE
     */
    public static getUserInfo(): Promise<{ data: { status: string, msg: string; data: IUserView } }> {
        let dataUrl: string = `${this.serverUrl}/users/me`;
        return axios.get(dataUrl);
    }

}