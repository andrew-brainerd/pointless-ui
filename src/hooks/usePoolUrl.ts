import { useLocation } from 'react-router';
import { NEW_POOL_SETTINGS_ROUTE } from '../constants/routes';

interface PoolUrl {
  poolId: string,
  isNewPool: boolean,
  wagerId: string
}

const usePoolUrl = (): PoolUrl => {
  const { pathname } = useLocation();

  return {
    poolId: pathname.split('/')[2],
    isNewPool: pathname === NEW_POOL_SETTINGS_ROUTE,
    wagerId: pathname.split('/')[4]
  };
};

export default usePoolUrl;
