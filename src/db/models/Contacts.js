import { request } from 'express';
import { Schema, model, version } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';
import { typeList } from '../../constants/contact.js';

const contactShema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: typeList,
      required: true,
      default: 'personal',
    },
  },

  { timestamps: true, versionKey: false },
);
contactShema.post('save', handleSaveError);
contactShema.pre('findOneAndUpdate', setUpdateSettings);
contactShema.post('findOneAndUpdate', handleSaveError);

export const contactSortFields = [
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
];

const contactCollection = model('contacts', contactShema);

export default contactCollection;
