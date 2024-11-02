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
  '/',
  ctrlWrapper(contactController.patchContactsController),
);

contactsRouter.delete(
  '/',
  ctrlWrapper(contactController.deleteContactsController),
);

export default contactsRouter;
