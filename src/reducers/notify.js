import { SHOW_NOTIFICATION, HIDE_NOTIFICATION, LOAD_NOTIFICATIONS, NOTIFICATIONS_LOADED } from '../actions/notify';

const initialState = {
  hidden: true,
  category: 'default',
  title: 'New Notification',
  message: 'The platypus is only found in eastern Australia in small rivers and streams within the states of Queensland, New South Wales, Victoria and Tasmania.',
  isLoadingNotifications: true,
  notifications: []
};

export default function notify (state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return {
        ...state,
        hidden: false,
        category: action.category,
        title: action.title,
        message: action.message
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        hidden: true
      };
    case LOAD_NOTIFICATIONS:
      return {
        ...state,
        isLoadingNotifications: true
      };
    case NOTIFICATIONS_LOADED:
      return {
        ...state,
        isLoadingNotifications: false,
        notifications: action.notifications
      };
    default:
      return state;
  }
};
