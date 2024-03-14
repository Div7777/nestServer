import mongoose, { model } from 'mongoose';
import validator from 'validator';

export const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: (props: { value: string }) =>
          `${props.value} is not a valid email address!`,
      },
    },
    password: { type: String, required: true, minlength: 8 },
    customer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
    delete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);
export default model('User', UserSchema);
