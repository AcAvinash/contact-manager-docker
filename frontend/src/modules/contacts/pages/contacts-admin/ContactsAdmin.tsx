import React, {useEffect, useState} from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import {Link, useSearchParams} from "react-router-dom";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import ContactCard from "../../components/ContactCard";
import * as contactActions from "../../../../redux/contacts/contacts.actions";
import * as contactReducer from "../../../../redux/contacts/contacts.slice";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";

export const ContactsAdmin: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const [searchQuery, setSearchQuery] = useState<string>("");
    let [searchParams, setSearchParams] = useSearchParams();

    /**
     * get the data from redux
     */
    const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
        return store[contactReducer.contactFeatureKey];
    })

    const {loading, contacts, error} = contactState;

    useEffect(() => {
        dispatch(contactActions.getAllContactsAction());
    }, []);

    const makeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        // TODO
    };

    const clickDeleteContact = (contactId: string | undefined): void => {
        if (contactId) {
            dispatch(contactActions.deleteContactAction({contactId: contactId}));
        }
    };

    return (
        <>
            {loading && <Spinner/>}
            <NavBar color={'bg-dark'}/>
            <Heading heading={'Manage Contacts'} color={'text-dark'}/>
            {!loading && Object.keys(error).length > 0 && <ErrorMessage message={JSON.stringify(error)}/>}
            {/* <pre>Query : {JSON.stringify(searchParams.get("query"))} Page : {JSON.stringify(searchParams.get("page"))}</pre>*/}
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <form>
                            <div className="row">
                                <div className="col">
                                    <input
                                        value={searchQuery}
                                        onChange={e => makeSearch(e)}
                                        className="form-control" placeholder="Search here" type="text"/>
                                </div>
                                <div className="col">
                                    <input className="btn btn-dark me-2" type="submit"/>
                                    <Link className="btn btn-success" to={'/contacts/add'}>
                                        <i className="bi bi-plus-circle-fill"></i> New</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {
                !loading && contacts.length > 0 ? <section className="mt-3">
                    <div className="container">
                        <div className="row">
                            {
                                contacts.map((contact, index) => {
                                    return (
                                        <div className="col-sm-6 mt-3" key={contact._id}>
                                            {
                                                contact &&
                                                <ContactCard contact={contact} clickDeleteContact={clickDeleteContact}/>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </section> : <>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col text-center">
                                <p className="h4 text-danger">No Contacts Found</p>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
};
export default ContactsAdmin;