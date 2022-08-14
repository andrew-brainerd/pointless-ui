import { AnyAction } from 'redux';
import { CONNECTING_CLIENT, SET_IS_CONNECTED } from '../actions/pusher';

export interface PusherState {
  isConnecting: boolean,
  isConnected: boolean
}

export const initialState: PusherState = {
  isConnecting: false,
  isConnected: false
};

const pusher = (state = initialState, action: AnyAction): PusherState => {
  switch (action.type) {
    case CONNECTING_CLIENT:
      return {
        ...state,
        isConnecting: true
      };
    case SET_IS_CONNECTED:
      return {
        ...state,
        isConnecting: false,
        isConnected: action.isConnected
      };
    default:
      return state;
  }
};

export default pusher;
