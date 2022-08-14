import {
  showNotification,
  hideNotification
} from '../actions/notify';
import reducer, { initialState } from './notify';

describe('Notify Reducer', () => {
  it('should return the default state', () => {
    const action = { type: 'NONEXISTENT' };
    const newState = reducer(initialState, action);

    expect(typeof newState).toEqual('object');
  });

  describe('SHOW_NOTIFICATION', () => {
    it('should set hidden to false and message to the given string', () => {
      const category = 'success';
      const title = 'New Notification';
      const message = 'notification';

      const expectedState = {
        ...initialState,
        hidden: false,
        category,
        title,
        message
      };

      const action = showNotification(category, title, message);

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });

  describe('HIDE_NOTIFICATION', () => {
    it('should set hidden to true', () => {
      const expectedState = {
        ...initialState,
        hidden: true
      };

      const action = hideNotification();

      const newState = reducer(initialState, action);

      expect(newState).toEqual(expectedState);
    });
  });
});
