import React, {useState} from 'react';
import NavBar from "../../layout/pages/navbar/NavBar";
import Heading from "../../layout/components/heading/Heading";
import {Link, useNavigate} from "react-router-dom";
import {AppDispatch, useAppDispatch} from "../../../redux/store";
import {IUserView} from "../models/IUserView";
import * as userActions from "../../../redux/users/users.actions";

export const LoginUser: React.FC = () => {

    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();

    const [user, setUser] = useState<IUserView>({
        email: "",
        password: ""
    });

    const updateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(userActions.loginUserAction({user: user})).then((response: any) => {
            if (!response.error) {
                navigate("/contacts/admin");
            }
        });
    };

    return (
        <>
            <NavBar color={'bg-dark'}/>
            <Heading heading={'Login Here'} color={'text-success'}/>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <form onSubmit={e => handleSubmit(e)}>
                            <div className="mb-2">
                                <input
                                    name={'email'}
                                    onChange={e => updateInput(e)}
                                    value={user.email}
                                    required type="email" className="form-control" placeholder="Email"/>
                            </div>
                            <div className="mb-2">
                                <input
                                    name={'password'}
                                    onChange={e => updateInput(e)}
                                    value={user.password}
                                    required type="password" className="form-control" placeholder="Password"/>
                            </div>
                            <div className="mb-2">
                                <input type="submit" className="btn btn-success" value="Login"/>
                                <Link to={'/'} className="btn btn-dark ms-2">Cancel</Link>
                            </div>
                        </form>
                        <small>Don't have an account?
                            <Link to={'/users/register'}
                                  className="text-primary text-decoration-none fw-bold"> Register</Link>
                        </small>
                    </div>
                </div>
            </div>
        </>
    )
};
export default LoginUser;