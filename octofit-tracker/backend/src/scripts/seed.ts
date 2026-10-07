import 'dotenv/config';
import { mongoose } from '../config/database.js';
import activity from '../models/Activity.js';
import leaderboard from '../models/Leaderboard.js';
import team from '../models/Team.js';
import user from '../models/User.js';
import workout from '../models/Workout.js';

const teamData = [
  { name: 'Octocats', points: 245 },
  { name: 'Fit Kittens', points: 210 },
];

const userData = [
  { name: 'Mona Lisa', email: 'mona@example.com', team: 'Octocats' },
  { name: 'Ada Lovelace', email: 'ada@example.com', team: 'Octocats' },
  { name: 'Grace Hopper', email: 'grace@example.com', team: 'Fit Kittens' },
  { name: 'Katherine Johnson', email: 'katherine@example.com', team: 'Fit Kittens' },
];

const activityData = [
  { email: 'mona@example.com', type: 'Running', duration: 35, points: 70, date: '2026-10-06T08:00:00.000Z' },
  { email: 'ada@example.com', type: 'Cycling', duration: 45, points: 90, date: '2026-10-05T07:30:00.000Z' },
  { email: 'grace@example.com', type: 'Strength training', duration: 40, points: 80, date: '2026-10-04T17:00:00.000Z' },
  { email: 'katherine@example.com', type: 'Walking', duration: 30, points: 30, date: '2026-10-03T12:00:00.000Z' },
];

const workoutData = [
  {
    name: 'Beginner Full-Body Circuit',
    description: 'A balanced introduction to strength training.',
    difficulty: 'beginner',
    durationMinutes: 30,
    exercises: [
      { name: 'Bodyweight squats', sets: 3, reps: 12 },
      { name: 'Incline push-ups', sets: 3, reps: 10 },
      { name: 'Glute bridges', sets: 3, reps: 15 },
    ],
  },
  {
    name: 'Tempo Run',
    description: 'A steady-paced run to build cardiovascular endurance.',
    difficulty: 'intermediate',
    durationMinutes: 35,
    exercises: [{ name: 'Tempo running', sets: 1, reps: 1 }],
  },
  {
    name: 'Core and Mobility',
    description: 'A short session focused on core stability and flexibility.',
    difficulty: 'beginner',
    durationMinutes: 25,
    exercises: [
      { name: 'Plank', sets: 3, reps: 30 },
      { name: 'Bird dogs', sets: 3, reps: 10 },
      { name: "World's greatest stretch", sets: 2, reps: 6 },
    ],
  },
];

const emails = userData.map(({ email }) => email);
const teamNames = teamData.map(({ name }) => name);
const workoutNames = workoutData.map(({ name }) => name);
const activityDates = activityData.map(({ date }) => new Date(date));
const leaderboardPeriod = '2026-10';

/**
 * Seed the octofit_db database with test data.
 * Existing records belonging to these sample identities are refreshed on each run.
 */
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db');
    console.log('Connected to octofit_db');

    const [existingUsers, existingTeams] = await Promise.all([
      user.find({ email: { $in: emails } }).select('_id').lean().exec(),
      team.find({ name: { $in: teamNames } }).select('_id').lean().exec(),
    ]);
    const userIds = existingUsers.map(({ _id }) => _id);
    const teamIds = existingTeams.map(({ _id }) => _id);

    await Promise.all([
      activity.deleteMany({ user: { $in: userIds }, completedAt: { $in: activityDates } }),
      leaderboard.deleteMany({
        period: leaderboardPeriod,
        $or: [{ user: { $in: userIds } }, { team: { $in: teamIds } }],
      }),
      user.deleteMany({ email: { $in: emails } }),
      team.deleteMany({ name: { $in: teamNames } }),
      workout.deleteMany({ name: { $in: workoutNames } }),
    ]);

    const teams = await team.insertMany(teamData);
    const teamsByName = new Map(teams.map((savedTeam) => [savedTeam.name, savedTeam]));
    const users = await user.insertMany(
      userData.map(({ team: teamName, ...sampleUser }) => ({
        ...sampleUser,
        team: teamsByName.get(teamName)?._id,
      })),
    );
    const usersByEmail = new Map(users.map((savedUser) => [savedUser.email, savedUser]));

    await Promise.all([
      ...teams.map((savedTeam) =>
        team.updateOne(
          { _id: savedTeam._id },
          { $set: { members: users.filter((savedUser) => savedUser.team?.equals(savedTeam._id)).map(({ _id }) => _id) } },
        ),
      ),
      activity.insertMany(
        activityData.map(({ email, type, duration, points, date }) => {
          const activityUser = usersByEmail.get(email);
          if (!activityUser) {
            throw new Error(`Unable to find seeded user ${email}`);
          }

          return {
            user: activityUser._id,
            team: activityUser.team,
            activityType: type,
            durationMinutes: duration,
            points,
            completedAt: new Date(date),
          };
        }),
      ),
      leaderboard.insertMany([
        ...users.map((savedUser, index) => ({
          user: savedUser._id,
          team: savedUser.team,
          points: [70, 90, 80, 30][index],
          rank: index + 1,
          period: leaderboardPeriod,
        })),
        ...teams.map((savedTeam, index) => ({
          team: savedTeam._id,
          points: savedTeam.points,
          rank: index + 1,
          period: leaderboardPeriod,
        })),
      ]),
      workout.insertMany(workoutData),
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    try {
      await mongoose.disconnect();
    } catch (error) {
      console.error('Error disconnecting from octofit_db:', error);
      process.exitCode = 1;
    }
  }
}

void seedDatabase();
