import { AnyAction } from 'redux';
import { SHOW_SUB_HEADER, HIDE_SUB_HEADER } from '../actions/config';

export interface ConfigurationState {
  isSubHeaderOpen: boolean
}

const initialState: ConfigurationState = {
  isSubHeaderOpen: false
};

const config = (state = initialState, action: AnyAction): ConfigurationState => {
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

export default config;
