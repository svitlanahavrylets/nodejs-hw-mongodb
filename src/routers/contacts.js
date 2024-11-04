import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import * as contactController from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactController.getContactsController));

contactsRouter.get(
  '/:contactId',
  ctrlWrapper(contactController.getContactsByIdController),
);

contactsRouter.post('/', ctrlWrapper(contactController.postContactsController));

contactsRouter.patch(
  '/:contactId',
  ctrlWrapper(contactController.upsertContactsController),
);

contactsRouter.delete(
  '/:contactId',
  ctrlWrapper(contactController.deleteContactsByIdController),
);

export default contactsRouter;
