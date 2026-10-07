import { model, models, Schema } from 'mongoose';

export const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, select: false },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    profileImage: String,
  },
  { timestamps: true, collection: 'users' },
);

export default models.User ?? model('User', userSchema);
