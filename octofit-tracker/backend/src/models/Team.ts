import { model, models, Schema } from 'mongoose';

export const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    points: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true, collection: 'teams' },
);

export default models.Team ?? model('Team', teamSchema);
