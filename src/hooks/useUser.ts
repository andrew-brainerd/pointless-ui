import { useAuth0 } from '@auth0/auth0-react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../selectors/user';

interface PointlessUser {
  userEmail: string,
  userId: string,
  userPicture: string
}

const useUser = (): PointlessUser => {
  const { user } = useAuth0();
  const userId: string = useSelector(getCurrentUser)?._id;

  return {
    userEmail: user?.email || '',
    userId,
    userPicture: user?.picture || ''
  };
};

export default useUser;
