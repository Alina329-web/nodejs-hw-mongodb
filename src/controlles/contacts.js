import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { contactSortFields } from '../db/models/Contacts.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

import {
  getcontacts,
  getcontactById,
  addContact,
  updateContact,
  deleteContactById,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, contactSortFields);
  const filters = parseContactFilterParams(req.query);
  filters.userId = req.user._id;
  const data = await getcontacts({
    ...paginationParams,
    ...sortParams,
    filters,
  });
  res.json({
    status: 200,
    messege: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const data = await getcontactById(id, userId);

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
  const { _id: userId } = req.user;
  let photoUrl;
  if (req.file) {
    photoUrl = await saveFileToCloudinary(req.file);
  }
  const data = await addContact({ ...req.body, userId, photo: photoUrl });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { _id: userId } = req.user;

    const photo = req.file;
    let photoUrl;

    if (photo) {
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }

    const data = await updateContact(contactId, userId, {
      ...req.body,
      photo: photoUrl,
    });
    if (!data) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const data = await deleteContactById(id, userId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
