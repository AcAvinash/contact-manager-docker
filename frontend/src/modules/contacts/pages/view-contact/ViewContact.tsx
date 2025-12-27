import React, {useEffect} from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import {Link, useParams} from "react-router-dom";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import * as contactActions from "../../../../redux/contacts/contacts.actions";
import * as contactReducer from "../../../../redux/contacts/contacts.slice";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";

export const ViewContact: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const {contactId} = useParams();

    /**
     * get the data from redux
     */
    const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
        return store[contactReducer.contactFeatureKey];
    })

    const {loading, contact, group, error} = contactState;

    useEffect(() => {
        if (contactId) {
            dispatch(contactActions.getContactAction({contactId: contactId}));
        }
    }, [contactId]);

    return (
        <>
            {loading && <Spinner/>}
            <NavBar color={'bg-dark'}/>
            <Heading heading={'View Contact'} color={'text-warning'}/>
            {!loading && Object.keys(error).length > 0 && <ErrorMessage message={JSON.stringify(error)}/>}
            {
                !loading && contact && group && Object.keys(contact).length > 0 && Object.keys(group).length > 0 &&
                <section className="mt-3">
                    <div className="container">
                        <div className="row mt-3 align-items-center">
                            <div className="col-sm-3">
                                <img alt=""
                                     className="img-fluid rounded-circle shadow-lg"
                                     src={contact.imageUrl}/>
                            </div>
                            <div className="col-sm-8 offset-1">
                                <ul className="list-group">
                                    <li className="list-group-item">
                                        Name : <span className="fw-bold">{contact.name}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Email : <span className="fw-bold">{contact.email}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Mobile : <span className="fw-bold">{contact.mobile}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Company : <span className="fw-bold">{contact.company}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Title : <span className="fw-bold">{contact.title}</span>
                                    </li>
                                    <li className="list-group-item">
                                        Group : <span className="fw-bold">{group.name}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <Link className="btn btn-warning" to="/contacts/admin">
                                    <i className="bi bi-arrow-left-circle-fill"></i> Back</Link>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
};
export default ViewContact;