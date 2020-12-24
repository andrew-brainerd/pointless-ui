const PREFIX = 'POOLS';

export const LOAD_POOLS = `${PREFIX}/LOAD_POOLS`;
export const POOLS_LOADED = `${PREFIX}/POOLS_LOADED`;
export const LOAD_POOL = `${PREFIX}/LOAD_POOL`;
export const POOL_LOADED = `${PREFIX}/POOL_LOADED`;
export const CREATE_POOL = `${PREFIX}/CREATE_POOL`;
export const POOL_CREATED = `${PREFIX}/POOL_CREATED`;
export const DELETE_POOL = `${PREFIX}/DELETE_POOL`;
export const POOL_DELETED = `${PREFIX}/POOL_DELETED`;
export const CREATE_WAGER = `${PREFIX}/CREATE_WAGER`;
export const WAGER_CREATED = `${PREFIX}/WAGER_CREATED`;
export const DELETE_WAGER = `${PREFIX}/DELETE_WAGER`;
export const WAGER_DELETED = `${PREFIX}/WAGER_DELETED`;

export const loadPools = userEmail => ({ type: LOAD_POOLS, userEmail });
export const poolsLoaded = pools => ({ type: POOLS_LOADED, pools });
export const loadPool = poolId => ({ type: LOAD_POOL, poolId });
export const poolLoaded = pool => ({ type: POOL_LOADED, pool });
export const createPool = (name, createdBy) => ({ type: CREATE_POOL, name, createdBy });
export const poolCreated = pool => ({ type: POOL_CREATED, pool });
export const deletePool = poolId => ({ type: DELETE_POOL, poolId });
export const poolDeleted = pool => ({ type: POOL_DELETED, pool });
export const createWager = (poolId, createdBy, wager) => ({ type: CREATE_WAGER, poolId, createdBy, wager });
export const wagerCreated = wager => ({ type: WAGER_CREATED, wager });
export const deleteWager = (poolId, wagerId) => ({ type: DELETE_WAGER, poolId, wagerId });
export const wagerDeleted = wager => ({ type: WAGER_DELETED, wager });
