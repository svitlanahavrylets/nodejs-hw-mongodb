import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import * as contactServices from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { sortByList } from '../db/models/Contact.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseContactFilterParams } from '../utils/parseContactFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseContactFilterParams(req.query);
  const { _id: userId } = req.user;
  filter.userId = userId;

  const data = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    throw createHttpError(404, 'Contact not found');
  }

  const data = await contactServices.getContactById(contactId, userId);

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
  const { _id: userId } = req.user;

  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const data = await contactServices.postContacts({
    ...req.body,
    userId,
    photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const data = await contactServices.patchContacts(
    contactId,
    userId,
    req.body,
    { photo: photoUrl },
  );

  if (!data) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data,
  });
};

export const deleteContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const data = await contactServices.deleteContactById(contactId, userId);

  if (!data) throw createHttpError(404, 'Contact not found');

  res.status(204).send();
};
