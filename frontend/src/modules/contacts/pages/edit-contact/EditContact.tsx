import React, {useEffect, useState} from 'react';
import NavBar from "../../../layout/pages/navbar/NavBar";
import Heading from "../../../layout/components/heading/Heading";
import {Link, useNavigate, useParams} from "react-router-dom";
import {IContactView} from "../../models/IContactView";
import Spinner from "../../../layout/components/spinner/Spinner";
import ErrorMessage from "../../../layout/components/error-message/ErrorMessage";
import * as contactActions from "../../../../redux/contacts/contacts.actions";
import * as contactReducer from "../../../../redux/contacts/contacts.slice";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";

export const EditContact: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const {contactId} = useParams();

    /**
     * get the data from redux
     */
    const contactState: contactReducer.InitialState = useSelector((store: RootState) => {
        return store[contactReducer.contactFeatureKey];
    })

    const {loading, contact: contactRedux, groups, error} = contactState;

    const [contact, setContact] = useState<IContactView>({
        name: "",
        imageUrl: "",
        mobile: "",
        email: "",
        company: "",
        title: "",
        groupId: ""
    });

    /**
     * when the page is loaded, get all groups for dropdown
     */
    useEffect(() => {
        dispatch(contactActions.getAllGroupsAction());
    }, []);

    /**
     * when contactId, then get the contact from server
     */
    useEffect(() => {
        if (contactId) {
            dispatch(contactActions.getContactAction({contactId: contactId}));
        }
    }, [contactId]);

    /**
     * if change in the contact Redux, populate the data
     */
    useEffect(() => {
        if (contactRedux && Object.keys(contactRedux).length > 0) {
            setContact({
                ...contact,
                name: contactRedux.name ? contactRedux.name : "",
                imageUrl: contactRedux.imageUrl ? contactRedux.imageUrl : "",
                mobile: contactRedux.mobile ? contactRedux.mobile : "",
                email: contactRedux.email ? contactRedux.email : "",
                company: contactRedux.company ? contactRedux.company : "",
                title: contactRedux.title ? contactRedux.title : "",
                groupId: contactRedux.groupId ? contactRedux.groupId : ""
            })
        }
    }, [contactRedux])


    /**
     * when the form field data changes, update the local state
     * @param event
     */
    const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        })
    };

    /**
     * form submit for update
     * @param event
     */
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (contactId) {
            dispatch(contactActions.updateContactAction({
                contact: contact,
                contactId: contactId
            })).then((response: any) => {
                if (!response.error) {
                    navigate("/contacts/admin");
                }
            });
        }
    };

    return (
        <>
            {loading && <Spinner/>}
            <NavBar color={'bg-dark'}/>
            <Heading heading={'Edit Contact'} color={'text-primary'}/>
            {!loading && Object.keys(error).length > 0 && <ErrorMessage message={JSON.stringify(error)}/>}
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'name'}
                                        value={contact.name}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Name" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'imageUrl'}
                                        value={contact.imageUrl}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Image Url" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'mobile'}
                                        value={contact.mobile}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Mobile" type="number"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'email'}
                                        value={contact.email}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Email" type="email"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'company'}
                                        value={contact.company}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Company" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name={'title'}
                                        value={contact.title}
                                        onChange={e => updateInput(e)}
                                        className="form-control" placeholder="Title" type="text"/>
                                </div>
                                <div className="mb-2">
                                    <select
                                        required={true}
                                        name={'groupId'}
                                        value={contact.groupId}
                                        onChange={e => updateInput(e)}
                                        className="form-control">
                                        <option value="">Select a Group</option>
                                        {
                                            groups.map((group, index) => {
                                                return (
                                                    <option key={index} value={group._id}>{group.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="mb-2">
                                    <input className="btn btn-primary me-2" type="submit" value="Update"/>
                                    <Link className="btn btn-dark" to="/contacts/admin">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-3">
                            {
                                contact && contact.imageUrl &&
                                <img alt="" className="img-fluid rounded-circle shadow-lg" src={contact.imageUrl}/>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};
export default EditContact;