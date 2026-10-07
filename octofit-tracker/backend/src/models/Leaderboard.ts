import { model, models, Schema } from 'mongoose';

export const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, default: 0, min: 0 },
    rank: { type: Number, min: 1 },
    period: { type: String, required: true, trim: true },
  },
  { timestamps: true, collection: 'leaderboard' },
);

export default models.Leaderboard ?? model('Leaderboard', leaderboardSchema);
