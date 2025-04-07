import createHttpError from 'http-errors';
import {
  getcontacts,
  getcontactById,
  addContact,
  updateContact,
  deleteContactById,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const data = await getcontacts();
  res.json({
    status: 200,
    messege: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;

  const data = await getcontactById(id);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully find contacts with id =${id}`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const data = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body);
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    result,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteContactById(id);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
