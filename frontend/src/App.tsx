import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./modules/layout/pages/home/Home";
import NotFound404 from "./modules/layout/pages/not-found/NotFound404";
import ContactsAdmin from "./modules/contacts/pages/contacts-admin/ContactsAdmin";
import AddContact from "./modules/contacts/pages/add-contact/AddContact";
import EditContact from "./modules/contacts/pages/edit-contact/EditContact";
import ViewContact from "./modules/contacts/pages/view-contact/ViewContact";
import {ToastContainer} from "react-toastify";
import LoginUser from "./modules/users/pages/LoginUser";
import RegisterUser from "./modules/users/pages/RegisterUser";
import {AppDispatch, useAppDispatch} from "./redux/store";
import {TokenUtil} from "./util/TokenUtil";
import * as userActions from "./redux/users/users.actions";

const App: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();


    useEffect(() => {
        if (TokenUtil.isLoggedIn()) {
            dispatch(userActions.getUserInfoAction());
        }
    }, [])

    return (
        <>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/contacts/admin'} element={<ContactsAdmin/>}/>
                    <Route path={'/contacts/add'} element={<AddContact/>}/>
                    <Route path={'/contacts/edit/:contactId'} element={<EditContact/>}/>
                    <Route path={'/contacts/view/:contactId'} element={<ViewContact/>}/>
                    <Route path={'/users/login'} element={<LoginUser/>}/>
                    <Route path={'/users/register'} element={<RegisterUser/>}/>
                    <Route path={'*'} element={<NotFound404/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
