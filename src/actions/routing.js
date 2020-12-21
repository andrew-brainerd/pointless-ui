import { push } from 'connected-react-router';

export const navTo = path => async dispatch => {
  console.log('Navigating to', path);
  dispatch(push(path));
};
