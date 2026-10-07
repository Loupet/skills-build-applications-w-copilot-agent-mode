import { model, models, Schema } from 'mongoose';

export const workoutSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, min: 1 },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, min: 1 },
        reps: { type: Number, min: 1 },
      },
    ],
  },
  { timestamps: true, collection: 'workouts' },
);

export default models.Workout ?? model('Workout', workoutSchema);
