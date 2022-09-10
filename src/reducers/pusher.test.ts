import { CONNECTING_CLIENT, setIsConnected } from '../actions/pusher';
import reducer, { initialState } from './pusher';

describe('Pusher Reducer', () => {
  it('should return the default state', () => {
    const action = { type: 'NONEXISTENT' };

    const newState = reducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it('should return the provided state', () => {
    const action = { type: 'NONEXISTENT' };

    const newState = reducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  describe('CONNECTING_CLIENT', () => {
    it('should set isConnecting to true', () => {

      const expectedState = {
        ...initialState,
        isConnecting: true
      };

      const action = { type: CONNECTING_CLIENT };

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('SET_IS_CONNECTED', () => {
    it('should set isConnected to given boolean', () => {
      const initialState = {
        isConnecting: true,
        isConnected: false
      };

      const expectedState = {
        isConnecting: false,
        isConnected: true
      };

      const action = setIsConnected(true);

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });
});
