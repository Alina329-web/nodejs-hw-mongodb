import contactCollection from '../db/models/Contacts.js';

import { calcPaginationData } from '../utils/calcPaginationData.js';

import { sortList } from '../constants/index.js';

export const getcontacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const contactQuery = contactCollection.find();
  if (filters.type) {
    contactQuery.where('contactType').equals(filters.type);
  }
  if (filters.isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(filters.isFavourite);
  }
  const totalItems = await contactCollection
    .find()
    .merge(contactQuery)
    .countDocuments();

  const data = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcPaginationData({ page, perPage, totalItems });

  return {
    data,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getcontactById = (id) => contactCollection.findOne({ _id: id });
export const addContact = (payload) => contactCollection.create(payload);

export const updateContact = async (_id, payload) => {
  const data = await contactCollection.findOneAndUpdate({ _id }, payload, {});

  return data;
};

export const deleteContactById = (_id) =>
  contactCollection.findOneAndDelete({ _id });
