import { compose, path, prop } from 'ramda';
import { NEW_POOL_SETTINGS_ROUTE } from '../constants/routes';

export const getLocation = path(['router', 'location']);

export const getPathname = compose(prop('pathname'), getLocation);

export const getQuery = compose(prop('query'), getLocation);

export const getPoolId = compose(pathname => (pathname || '').split('/')[2], getPathname);

export const getWagerId = compose(pathname => (pathname || '').split('/')[4], getPathname);

export const getIsNewPool = compose(pathname => pathname === NEW_POOL_SETTINGS_ROUTE, getPathname);
