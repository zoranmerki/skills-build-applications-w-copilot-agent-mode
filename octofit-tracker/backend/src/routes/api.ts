import { Router, type RequestHandler } from 'express';
import type { Model } from 'mongoose';
import { apiBaseUrl } from '../config/api.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const router = Router();

function listHandler<T>(model: Model<T>, sort: Record<string, 1 | -1> = {}): RequestHandler {
  return async (_request, response) => {
    try {
      const records = await model.find().sort(sort).lean().exec();
      response.json(records);
    } catch {
      response.status(503).json({ error: 'Database unavailable' });
    }
  };
}

router.get('/', (_request, response) => {
  response.json({ baseUrl: apiBaseUrl });
});
router.get('/users/', listHandler(User));
router.get('/teams/', listHandler(Team));
router.get('/activities/', listHandler(Activity));
router.get('/leaderboard/', listHandler(LeaderboardEntry, { points: -1 }));
router.get('/workouts/', listHandler(Workout));

export default router;