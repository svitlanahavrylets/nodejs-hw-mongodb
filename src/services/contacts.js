import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();

export const getContactById = (contactId) =>
  ContactCollection.findById(contactId);

export const postContacts = (payload) => ContactCollection.create(payload);

export const patchContacts = (contactId, payload) =>
  ContactCollection.findOneAndUpdate({ _id: contactId }, payload, {
    new: true,
  });

export const deleteContactById = (contactId) =>
  ContactCollection.findByIdAndDelete({ _id: contactId });
