import mongoose, { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  readonly email: string;
  password: string;
  customer: mongoose.Schema.Types.ObjectId[];
  groups: mongoose.Schema.Types.ObjectId[];
  delete: boolean;
}
