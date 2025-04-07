import contactCollection from '../db/models/Contacts.js';

export const getcontacts = () => contactCollection.find();

export const getcontactById = (id) => contactCollection.findOne({ _id: id });
export const addContact = (payload) => contactCollection.create(payload);

export const updateContact = async (_id, payload) => {
  const data = await contactCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
  });

  return data;
};

export const deleteContactById = (_id) =>
  contactCollection.findOneAndDelete({ _id });
