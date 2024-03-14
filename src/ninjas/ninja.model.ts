import { Schema, Document } from 'mongoose';

export interface Ninja extends Document {
  name: string;
  weapon: string;
}

export const NinjaSchema = new Schema({
  name: String,
  weapon: String,
});
