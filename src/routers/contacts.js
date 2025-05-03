import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  addContactController,
  patchContactController,
  deleteContactController,
} from '../controlles/contacts.js';

import { upload } from '../middlewares/multer.js';

import { authenticate } from '../middlewares/authenticate.js';

import { isValidId } from '../middlewares/isValidId.js';

import { validateBody } from '../utils/validateBody.js';

import { contactAddShema, contactUpdateShema } from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactAddShema),
  ctrlWrapper(addContactController),
);

contactsRouter.patch(
  '/:id',
  isValidId,
  upload.single('photo'),

  validateBody(contactUpdateShema),
  ctrlWrapper(patchContactController),
);
contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;

// src/routers/students.js

/* Інший код файлу */

// contactsRouter.post(
//   '/',
//   checkRoles(ROLES.TEACHER),
//   upload.single('photo'), // додаємо цю middleware
//   validateBody(createStudentSchema),
//   ctrlWrapper(createStudentController),
// );

// contactsRouter.put(
//   '/:studentId',
//   checkRoles(ROLES.TEACHER),
//   isValidId,
//   upload.single('photo'), // додаємо цю middleware
//   validateBody(createStudentSchema),
//   ctrlWrapper(upsertStudentController),
// );

// contactsRouter.patch(
//   '/:studentId',
//   checkRoles(ROLES.TEACHER, ROLES.PARENT),
//   isValidId,
//   upload.single('photo'), // додаємо цю middleware
//   validateBody(updateStudentSchema),
//   ctrlWrapper(patchStudentController),
// );
