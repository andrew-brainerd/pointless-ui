import { LOADING_USER, SET_CURRENT_USER, CHECKING_USERNAME, USERNAME_CHECKED } from '../actions/user';

export const initialState = {
  isLoadingUser: false,
  currentUser: {},
  isCheckingUsername: false,
  isUsernameAvailable: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        isLoadingUser: true
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isLoadingUser: false,
        currentUser: action.user
      };
    case CHECKING_USERNAME:
      return {
        ...state,
        isCheckingUsername: true
      };
    case USERNAME_CHECKED:
      return {
        ...state,
        isCheckingUsername: false,
        isUsernameAvailable: action.isValid
      };
    default:
      return state;
  }
};

export default user;
