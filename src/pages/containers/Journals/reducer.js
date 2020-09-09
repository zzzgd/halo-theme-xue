import { JOURNAL_LIST, MENU_LIST, OPTIONS, SETTINGS, USER_PROFILE } from './constants';

const initialState = {
  options: [],
  settings: {},
  journalList: {},
  userProfile: {},
  menus: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPTIONS:
      return {
        ...state,
        options: action.payload,
      };
    case SETTINGS:
      return {
        ...state,
        settings: action.payload,
      };
    case JOURNAL_LIST:
      return {
        ...state,
        journalList: action.payload,
      };
    case USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case MENU_LIST:
      return {
        ...state,
        menus: action.payload,
      };
    default:
      return state;
  }
};
