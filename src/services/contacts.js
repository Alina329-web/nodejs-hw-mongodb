import contactCollection from '../db/models/Contacts.js';

export const getcontacts = () => contactCollection.find();

export const getcontactById = (id) => contactCollection.findOne({ _id: id });
