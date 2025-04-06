import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
import {
  getContactsController,
  getcontactByIdController,
  addContactController,
  patchContactController,
  deleteContactController,
} from '../controlles/contacts.js';
const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:id', ctrlWrapper(getcontactByIdController));

contactsRouter.post('/', ctrlWrapper(addContactController));
contactsRouter.patch('/:id', ctrlWrapper(patchContactController));
contactsRouter.delete('/:id', ctrlWrapper(deleteContactController));

export default contactsRouter;
