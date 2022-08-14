import { Dispatch } from '../store/configureStore';
import { ConnectData } from '../types/api';
import { getChannel } from '../utils/pusher';

const PREFIX = 'PUSHER';

export const CONNECTING_CLIENT = `${PREFIX}/CONNECTING_CLIENT`;
export const SET_IS_CONNECTED = `${PREFIX}/SET_IS_CONNECTED`;

export const setIsConnected = (isConnected: boolean) => ({ type: SET_IS_CONNECTED, isConnected });

export const connectClient = (channel: string, event: string, action: (data: ConnectData) => void) => async (dispatch: Dispatch) => {
  getChannel(channel).bind(event, action);
  dispatch(setIsConnected(true));
};
