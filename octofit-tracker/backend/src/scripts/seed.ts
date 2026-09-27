import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const userIds = [
      new mongoose.Types.ObjectId('66f000000000000000000001'),
      new mongoose.Types.ObjectId('66f000000000000000000002'),
      new mongoose.Types.ObjectId('66f000000000000000000003'),
      new mongoose.Types.ObjectId('66f000000000000000000004'),
    ];
    const teamIds = [
      new mongoose.Types.ObjectId('66f000000000000000000101'),
      new mongoose.Types.ObjectId('66f000000000000000000102'),
    ];
    const userRecords = [
      { _id: userIds[0], username: 'maya.chen', email: 'maya.chen@example.com', name: 'Maya Chen', points: 185 },
      { _id: userIds[1], username: 'leo.martin', email: 'leo.martin@example.com', name: 'Leo Martin', points: 160 },
      { _id: userIds[2], username: 'amara.jones', email: 'amara.jones@example.com', name: 'Amara Jones', points: 145 },
      { _id: userIds[3], username: 'noah.patel', email: 'noah.patel@example.com', name: 'Noah Patel', points: 120 },
    ];
    const teamRecords = [
      {
        _id: teamIds[0],
        name: 'Northstar Runners',
        description: 'A team focused on building endurance one run at a time.',
        members: [userIds[0], userIds[1]],
      },
      {
        _id: teamIds[1],
        name: 'Peak Performers',
        description: 'Strength and conditioning for steady progress.',
        members: [userIds[2], userIds[3]],
      },
    ];
    const activityRecords = [
      { _id: new mongoose.Types.ObjectId('66f000000000000000000201'), userId: userIds[0], type: 'Running', durationMinutes: 32, points: 45, performedAt: new Date(Date.now() - 86_400_000) },
      { _id: new mongoose.Types.ObjectId('66f000000000000000000202'), userId: userIds[1], type: 'Cycling', durationMinutes: 40, points: 40, performedAt: new Date(Date.now() - 2 * 86_400_000) },
      { _id: new mongoose.Types.ObjectId('66f000000000000000000203'), userId: userIds[2], type: 'Strength training', durationMinutes: 35, points: 35, performedAt: new Date(Date.now() - 86_400_000) },
      { _id: new mongoose.Types.ObjectId('66f000000000000000000204'), userId: userIds[3], type: 'Walking', durationMinutes: 50, points: 30, performedAt: new Date(Date.now() - 3 * 86_400_000) },
      { _id: new mongoose.Types.ObjectId('66f000000000000000000205'), userId: userIds[0], type: 'Yoga', durationMinutes: 25, points: 25, performedAt: new Date(Date.now() - 4 * 86_400_000) },
    ];
    const leaderboardRecords = userIds.map((userId, index) => ({
      _id: new mongoose.Types.ObjectId(`66f00000000000000000030${index + 1}`),
      userId,
      teamId: teamIds[index < 2 ? 0 : 1],
      points: [185, 160, 145, 120][index],
      period: '2026-09',
    }));
    const workoutRecords = [
      {
        _id: new mongoose.Types.ObjectId('66f000000000000000000401'),
        title: 'Easy Pace Run',
        description: 'A conversational-pace run to build aerobic endurance.',
        category: 'Cardio',
        durationMinutes: 30,
        difficulty: 'Beginner',
        exercises: ['5-minute warm-up walk', '20-minute easy run', '5-minute cool-down'],
      },
      {
        _id: new mongoose.Types.ObjectId('66f000000000000000000402'),
        title: 'Bodyweight Strength',
        description: 'A balanced strength session using bodyweight movements.',
        category: 'Strength',
        durationMinutes: 25,
        difficulty: 'Intermediate',
        exercises: ['Squats', 'Incline push-ups', 'Reverse lunges', 'Plank'],
      },
      {
        _id: new mongoose.Types.ObjectId('66f000000000000000000403'),
        title: 'Mobility Reset',
        description: 'Gentle movement to improve flexibility and recovery.',
        category: 'Recovery',
        durationMinutes: 20,
        difficulty: 'Beginner',
        exercises: ['Cat-cow stretch', 'Hip flexor stretch', 'Thoracic rotations', 'Hamstring stretch'],
      },
    ];

    await Promise.all(userRecords.map((record) =>
      User.findByIdAndUpdate(record._id, record, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }),
    ));
    await Promise.all(teamRecords.map((record) =>
      Team.findByIdAndUpdate(record._id, record, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }),
    ));
    await Promise.all(activityRecords.map((record) =>
      Activity.findByIdAndUpdate(record._id, record, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }),
    ));
    await Promise.all(leaderboardRecords.map((record) =>
      LeaderboardEntry.findByIdAndUpdate(record._id, record, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }),
    ));
    await Promise.all(workoutRecords.map((record) =>
      Workout.findByIdAndUpdate(record._id, record, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }),
    ));

    console.log('Database seeding complete', {
      users: userRecords.length,
      teams: teamRecords.length,
      activities: activityRecords.length,
      leaderboard: leaderboardRecords.length,
      workouts: workoutRecords.length,
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
