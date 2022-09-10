import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { EMPTY_POOL } from '../../constants/pools';
import { POOL_ROUTE } from '../../constants/routes';
import { PoolSettingsProps } from './container';
import usePoolUrl from '../../hooks/usePoolUrl';
import usePrevious from '../../hooks/usePrevious';
import useUser from '../../hooks/useUser';
import Button from '@mui/material/Button';
import TextInput from '../common/TextInput/TextInput';
import styles from './PoolSettings.module.scss';
import Loading from '../common/Loading/Loading';

const PoolSettings = ({
  isCreatingPool,
  isLoadingPool,
  selectedPool,
  loadPool,
  createPool,
  updatePool
}: PoolSettingsProps) => {
  const [pool, setPool] = useState(EMPTY_POOL);
  const wasLoadingPool = usePrevious<boolean>(isLoadingPool);
  const wasCreatingPool = usePrevious<boolean>(isCreatingPool);
  const { isNewPool, poolId } = usePoolUrl();
  const { userEmail } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isNewPool) {
      loadPool(poolId);
    }
  }, []);

  useEffect(() => {
    console.log({ wasLoadingPool, isLoadingPool, selectedPool });
    if (wasLoadingPool && !isLoadingPool) {
      setPool(selectedPool);
    }
  }, [wasLoadingPool, setPool]);

  useEffect(() => {
    console.log({ wasCreatingPool, isCreatingPool, id: pool._id });
    if (wasCreatingPool && !isCreatingPool) {
      navigate(POOL_ROUTE.replace(':poolId', selectedPool._id));
    }
  }, [wasCreatingPool, isCreatingPool, selectedPool._id]);

  const onSubmit = () => {
    if (isNewPool && !!pool) {
      console.log('Creating pool', { name: pool.name, userEmail });
      createPool(pool.name, userEmail);
    } else {
      updatePool();
    }
  };

  return !isNewPool && isLoadingPool ? <Loading /> : (
    <div className={styles.poolSettings}>
      <TextInput
        value={pool.name || ''}
        onChange={name => setPool({ ...pool, name })}
      />
      <Button
        type='submit'
        variant='contained'
        onClick={onSubmit}
        style={{ marginTop: '10px' }}
      >
        {isNewPool ? 'Create' : 'Update'}
      </Button>
    </div>
  );
};

export default PoolSettings;
