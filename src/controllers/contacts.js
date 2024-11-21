import createHttpError from 'http-errors';
import * as contactServices from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  console.log(req.query);

  const { page, perPage } = parsePaginationParams(req.query);

  const data = await contactServices.getContacts({
    page,
    perPage,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;

  const data = await contactServices.getContactById(contactId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

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

export const patchContactsController = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactServices.patchContacts(contactId, req.body);

  if (!data) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data,
  });
};

export const deleteContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const data = await contactServices.deleteContactById(contactId);

  if (!data) throw createHttpError(404, 'Contact not found');

  res.status(204).send();
};
