import createHttpError from 'http-errors';
import * as contactServices from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const data = await contactServices.getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactServices.getContactById(contactId);

  if (!data) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const postContactsController = async (req, res) => {
  const data = await contactServices.postContacts(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactsController = async (req, res) => {
  const { contactId: _id } = req.params;
  const result = await contactServices.updateContacts({
    _id,
    payload: req.body,
    options: { upsert: true },
  });

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully patched a contact!`,
    data: result.data,
  });
};

export const deleteContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactServices.deleteContactById(contactId);

  if (!data) throw createHttpError(404, 'Contact not found');

  res.status(204).send();
};
