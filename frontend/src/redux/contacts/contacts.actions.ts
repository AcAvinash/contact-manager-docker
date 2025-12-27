import {createAsyncThunk} from "@reduxjs/toolkit";
import {IContactView} from "../../modules/contacts/models/IContactView";
import {ContactService} from "../../modules/contacts/services/ContactService";
import {IGroupView} from "../../modules/contacts/models/IGroupView";
import {AuthUtil} from "../../util/AuthUtil";

/**
 * to get all contacts
 */
export const getAllContactsAction: any = createAsyncThunk("contacts/getAllContactsAction",
    async (payload: {}, {rejectWithValue}): Promise<IContactView[] | any> => {
        try {
            if (AuthUtil.isSetTokenToRequestHeader()) { // PRIVATE
                const response = await ContactService.getAllContacts();
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 *  get a contact
 */
export const getContactAction: any = createAsyncThunk("contacts/getContactAction",
    async (payload: { contactId: string }, {rejectWithValue, dispatch}): Promise<IContactView | any> => {
        try {
            const {contactId} = payload;
            if (AuthUtil.isSetTokenToRequestHeader()) { // PRIVATE
                const response = await ContactService.getContact(contactId);
                if (response && response.data) {
                    dispatch(getGroupAction({contact: response.data})); // get the group information when we get the contact object
                }
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 * create a contact
 */
export const createContactAction: any = createAsyncThunk("contacts/createContactAction",
    async (payload: { contact: IContactView }, {rejectWithValue}): Promise<IContactView | any> => {
        try {
            const {contact} = payload;
            if (AuthUtil.isSetTokenToRequestHeader()) { // PRIVATE
                const response = await ContactService.createContact(contact);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 * Update a contact
 */
export const updateContactAction: any = createAsyncThunk("contacts/updateContactAction",
    async (payload: { contact: IContactView, contactId: string }, {rejectWithValue}): Promise<IContactView | any> => {
        try {
            const {contact, contactId} = payload;
            if (AuthUtil.isSetTokenToRequestHeader()) { // PRIVATE
                const response = await ContactService.updateContact(contact, contactId);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });


/**
 * Delete a contact
 */
export const deleteContactAction: any = createAsyncThunk("contacts/deleteContactAction",
    async (payload: { contactId: string }, {rejectWithValue, dispatch}): Promise<{} | any> => {
        try {
            const {contactId} = payload;
            if (AuthUtil.isSetTokenToRequestHeader()) { // PRIVATE
                const response = await ContactService.deleteContact(contactId);
                if (response && response.data) {
                    dispatch(getAllContactsAction()); // get the fresh data when the delete was success
                }
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 * Get all groups
 */
export const getAllGroupsAction: any = createAsyncThunk("contacts/getAllGroupsAction",
    async (payload: {}, {rejectWithValue}): Promise<IGroupView[] | any> => {
        try {
            if (AuthUtil.isSetTokenToRequestHeader()) { // PRIVATE
                const response = await ContactService.getAllGroups();
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });

/**
 * Get a group
 */
export const getGroupAction: any = createAsyncThunk("contacts/getGroupAction",
    async (payload: { contact: IContactView }, {rejectWithValue}): Promise<IGroupView | any> => {
        try {
            const {contact} = payload;
            if (AuthUtil.isSetTokenToRequestHeader()) { // PRIVATE
                const response = await ContactService.getGroup(contact);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    });





