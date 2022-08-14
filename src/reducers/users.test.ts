import { SET_CURRENT_USER } from '../actions/users';
import reducer, { initialState } from './users';

describe('User Reducer', () => {
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

  describe('SET_CURRENT_USER', () => {
    it('should set isLoadingUser to false and currentUser to given object', () => {
      const user = {
        _id: '12345',
        name: 'Test User'
      };

      const expectedState = {
        ...initialState,
        isLoadingUser: false,
        currentUser: user
      };

      const action = { type: SET_CURRENT_USER, user };

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });
});
