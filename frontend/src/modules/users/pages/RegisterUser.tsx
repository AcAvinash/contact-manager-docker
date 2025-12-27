import React, {useState} from 'react';
import NavBar from "../../layout/pages/navbar/NavBar";
import Heading from "../../layout/components/heading/Heading";
import {Link, useNavigate} from "react-router-dom";
import {IUserView} from "../models/IUserView";
import * as userActions from "../../../redux/users/users.actions";
import {AppDispatch, useAppDispatch} from "../../../redux/store";

export const RegisterUser: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useAppDispatch();

    const [user, setUser] = useState<IUserView>({
        username: "",
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
        dispatch(userActions.registerUserAction({user: user})).then((response: any) => {
            if (!response.error) {
                navigate("/users/login");
            }
        });
    };

    return (
        <>
            <NavBar color={'bg-dark'}/>
            <Heading heading={'Register Here'} color={'text-primary'}/>
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <form onSubmit={e => handleSubmit(e)}>
                            <div className="mb-2">
                                <input
                                    name={'username'}
                                    onChange={e => updateInput(e)}
                                    value={user.username}
                                    required type="text" className="form-control" placeholder="Username"/>
                            </div>
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
                                <input type="submit" className="btn btn-primary" value="Register"/>
                                <Link to={'/'} className="btn btn-dark ms-2">Cancel</Link>
                            </div>
                        </form>
                        <small>Already have an account?
                            <Link to={'/users/login'}
                                  className="text-success text-decoration-none fw-bold"> Login</Link>
                        </small>
                    </div>
                </div>
            </div>
        </>
    )
};
export default RegisterUser;