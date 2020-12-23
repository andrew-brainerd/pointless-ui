const PREFIX = 'POOLS';

export const LOAD_POOLS = `${PREFIX}/LOAD_POOLS`;
export const POOLS_LOADED = `${PREFIX}/POOLS_LOADED`;
export const LOAD_POOL = `${PREFIX}/LOAD_POOL`;
export const POOL_LOADED = `${PREFIX}/POOL_LOADED`;
export const CREATE_POOL = `${PREFIX}/CREATE_POOL`;
export const POOL_CREATED = `${PREFIX}/POOL_CREATED`;

export const loadPools = userEmail => ({ type: LOAD_POOLS, userEmail });
export const poolsLoaded = pools => ({ type: POOLS_LOADED, pools });
export const loadPool = poolId => ({ type: LOAD_POOL, poolId });
export const poolLoaded = pool => ({ type: POOL_LOADED, pool });
export const createPool = (name, createdBy) => ({ type: CREATE_POOL, name, createdBy });
export const poolCreated = pool => ({ type: POOL_CREATED, pool });
