import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getContacts = async ({ page = 1, perPage = 10 }) => {
  const skipQuery = (page - 1) * perPage;
  const data = await ContactCollection.find().skip(skipQuery).limit(perPage);
  const totalItems = await ContactCollection.countDocuments();
  const paginationData = calculatePaginationData({ totalItems, page, perPage });
  return {
    data,
    ...paginationData,
  };
};

export const getContactById = (contactId) =>
  ContactCollection.findById(contactId);

export const postContacts = (payload) => ContactCollection.create(payload);

export const patchContacts = (contactId, payload) =>
  ContactCollection.findOneAndUpdate({ _id: contactId }, payload, {
    new: true,
  });

export const deleteContactById = (contactId) =>
  ContactCollection.findByIdAndDelete({ _id: contactId });
