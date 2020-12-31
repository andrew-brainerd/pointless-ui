import { SHOW_SUB_HEADER, HIDE_SUB_HEADER } from '../actions/config';

const initialState = {
  isSubHeaderOpen: true
};

export default function notify (state = initialState, action) {
  switch (action.type) {
    case SHOW_SUB_HEADER:
      return {
        ...state,
        isSubHeaderOpen: true
      };
    case HIDE_SUB_HEADER:
      return {
        ...state,
        isSubHeaderOpen: false
      };
    default:
      return state;
  }
};
