import { SET_CURRENT_USER } from '../actions/user';
import reducer, { initialState as defaultState } from './user';

describe('User Reducer', () => {
  it('should return the default state', () => {
    const action = { type: 'NONEXISTENT' };

    const newState = reducer(undefined, action);

    expect(newState).toEqual(defaultState);
  });

  it('should return the provided state', () => {
    const initialState = {};

    const action = { type: 'NONEXISTENT' };

    const newState = reducer(initialState, action);

    expect(newState).toEqual({});
  });

  describe('SET_CURRENT_USER', () => {
    it('should set isLoadingUser to false and currentUser to given object', () => {
      const initialState = {
        isLoadingUser: true,
        currentUser: {}
      };

      const user = {
        _id: '12345',
        name: 'Test User'
      };

      const expectedState = {
        isLoadingUser: false,
        currentUser: user
      };

      const action = { type: SET_CURRENT_USER, user };

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });
});
