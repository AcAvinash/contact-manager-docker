import React from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import * as userReducer from "../../../../redux/users/users.slice";
import {TokenUtil} from "../../../../util/TokenUtil";

interface IProps {
    color: string;
    heading?: string;
}

const NavBar: React.FC<IProps> = (props) => {
    const dispatch: AppDispatch = useAppDispatch();

    const userState = useSelector((state: RootState) => {
        return state[userReducer.userFeatureKey];
    });

    const {isAuthenticated, user} = userState;

    const clickLogOut = () => {
        dispatch({
            type: `${userReducer.logOutAction}`
        })
    };

    return (
        <>
            <nav className={`navbar navbar-dark ${props.color} navbar-expand-sm`}>
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <i className="bi bi-phone"></i> Contacts <span className="text-warning">Manager</span></Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contacts/admin" className="nav-link">Admin</Link>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <ul className="navbar-nav">
                                {
                                    user && Object.keys(user).length > 0 &&
                                    <li className="nav-item">
                                        <span className="nav-link">
                                           <img src={user.imageUrl} width={25} height={25} className="rounded-circle"
                                                alt=""/> {user.username}</span>
                                    </li>
                                }
                                {
                                    !isAuthenticated && !TokenUtil.isLoggedIn() ?
                                        <li className="nav-item">
                                            <Link to="/users/login" className="nav-link">Login</Link>
                                        </li> :
                                        <li className="nav-item">
                                            <Link to="/" className="nav-link" onClick={clickLogOut}>
                                                <i className="bi bi-power"></i>
                                            </Link>
                                        </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
};
export default NavBar;