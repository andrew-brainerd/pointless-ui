import { Pool } from '../types/pools';

export const EMPTY_POOL: Pool = {
  _id: '-1',
  name: 'New Pool',
  users: [],
  wagers: [],
  pointTotals: {},
  startingPoints: {},
  pendingPoints: {}
};
