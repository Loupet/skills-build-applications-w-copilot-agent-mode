import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import type { ErrorRequestHandler, RequestHandler } from 'express';
import type { InferSchemaType, Model } from 'mongoose';
import { connectDatabase } from './config/database.js';
import Activity, { activitySchema } from './models/Activity.js';
import Leaderboard, { leaderboardSchema } from './models/Leaderboard.js';
import Team, { teamSchema } from './models/Team.js';
import User, { userSchema } from './models/User.js';
import Workout, { workoutSchema } from './models/Workout.js';

const app = express();
const port = Number(process.env.PORT || 8000);

export const baseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use(cors());

app.get('/api/health/', (_request, response) => {
  response.json({ status: 'ok' });
});

function collectionHandler<T>(model: Model<T>): RequestHandler {
  return async (_request, response, next) => {
    try {
      response.json(await model.find().lean().exec());
    } catch (error) {
      next(error);
    }
  };
}

app.get('/api/users/', collectionHandler<InferSchemaType<typeof userSchema>>(User));
app.get('/api/teams/', collectionHandler<InferSchemaType<typeof teamSchema>>(Team));
app.get('/api/activities/', collectionHandler<InferSchemaType<typeof activitySchema>>(Activity));
app.get(
  '/api/leaderboard/',
  collectionHandler<InferSchemaType<typeof leaderboardSchema>>(Leaderboard),
);
app.get('/api/workouts/', collectionHandler<InferSchemaType<typeof workoutSchema>>(Workout));

app.use((_request, response) => {
  response.status(404).json({ error: 'Not found' });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};
app.use(errorHandler);

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`OctoFit API listening at ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start OctoFit API:', error);
    process.exitCode = 1;
  }
}

void startServer();